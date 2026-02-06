import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const fromEmail = Deno.env.get("FROM_EMAIL") || "noreply@rugboost.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limit configuration
const RATE_LIMIT_WINDOW_MINUTES = 15;
const MAX_REQUESTS_PER_WINDOW = 5;

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // Honeypot field - should always be empty
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message, website }: ContactRequest = await req.json();

    // Honeypot check - if the hidden field has a value, it's likely a bot
    if (website && website.trim() !== "") {
      console.log("Honeypot triggered - potential bot detected");
      // Return success to not reveal detection to bots
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      throw new Error("All fields are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address");
    }

    // Validate field lengths
    if (name.length > 100) throw new Error("Name must be less than 100 characters");
    if (email.length > 255) throw new Error("Email must be less than 255 characters");
    if (subject.length > 200) throw new Error("Subject must be less than 200 characters");
    if (message.length > 5000) throw new Error("Message must be less than 5000 characters");

    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";

    // Initialize Supabase client with service role for rate limiting
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
    
    const { count, error: countError } = await supabase
      .from("contact_form_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", clientIP)
      .gte("created_at", windowStart);

    if (countError) {
      console.error("Error checking rate limit:", countError);
      // Continue anyway - don't block legitimate users due to rate limit check failures
    } else if (count && count >= MAX_REQUESTS_PER_WINDOW) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Record this request for rate limiting
    const { error: insertError } = await supabase
      .from("contact_form_rate_limits")
      .insert({ ip_address: clientIP });

    if (insertError) {
      console.error("Error recording rate limit:", insertError);
      // Continue anyway
    }

    const emailResponse = await resend.emails.send({
      from: `RugBoost Contact <${fromEmail}>`,
      to: ["support@rugboost.com"],
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="padding: 20px 0;">
            <h3 style="color: #1a1a1a; margin-bottom: 10px;">Message:</h3>
            <p style="white-space: pre-wrap; color: #333;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #888; font-size: 12px;">This message was sent from the RugBoost contact form.</p>
        </div>
      `,
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
