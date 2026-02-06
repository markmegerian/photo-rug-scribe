import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RegistrationRequest {
  accessToken: string;
  email: string;
  password: string;
}

// Rate limiting: 5 registration attempts per IP per 5 minutes
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [key, value] of rateLimits.entries()) {
    if (now > value.resetAt) {
      rateLimits.delete(key);
    }
  }
}

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetIn: number } {
  cleanupRateLimits();
  const now = Date.now();
  const limit = rateLimits.get(identifier);

  if (!limit || now > limit.resetAt) {
    rateLimits.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (limit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetIn: limit.resetAt - now };
  }

  limit.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - limit.count, resetIn: limit.resetAt - now };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get client identifier from IP or forwarded header
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    // Check rate limit
    const rateCheck = checkRateLimit(`registration:${clientIp}`);
    if (!rateCheck.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'Too many registration attempts. Please try again later.' }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(rateCheck.resetIn / 1000).toString(),
          } 
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create admin client
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { accessToken, email, password } = await req.json() as RegistrationRequest;

    if (!accessToken || !email || !password) {
      return new Response(
        JSON.stringify({ error: 'Access token, email, and password are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 8 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (!/[A-Z]/.test(password)) {
      return new Response(
        JSON.stringify({ error: 'Password must contain an uppercase letter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (!/[a-z]/.test(password)) {
      return new Response(
        JSON.stringify({ error: 'Password must contain a lowercase letter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    if (!/[0-9]/.test(password)) {
      return new Response(
        JSON.stringify({ error: 'Password must contain a number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const requestId = crypto.randomUUID().slice(0, 8);
    
    console.log(`[${requestId}] Registration request from IP: ${clientIp.substring(0, 10)}*** for: ${normalizedEmail.substring(0, 3)}***`);
    console.log(`[${requestId}] Rate limit status - Remaining: ${rateCheck.remaining}, Reset in: ${Math.ceil(rateCheck.resetIn / 1000)}s`);

    // Validate the access token and get the auth_user_id
    const { data: tokenData, error: tokenError } = await supabaseAdmin
      .rpc('validate_access_token', { _token: accessToken });

    if (tokenError || !tokenData || tokenData.length === 0) {
      console.error(`[${requestId}] Token validation error:`, tokenError?.message || 'No token data');
      return new Response(
        JSON.stringify({ error: 'Invalid or expired access link. Please request a new link from the business.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const accessInfo = tokenData[0];
    const authUserId = accessInfo.auth_user_id;
    
    // CRITICAL: Check if auth_user_id exists on the invite
    // If not, this is a legacy invite that cannot be processed safely
    if (!authUserId) {
      console.error(`[${requestId}] Legacy invite without auth_user_id - cannot process`);
      return new Response(
        JSON.stringify({ error: 'This access link is invalid or expired. Please request a new link from the business.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // SECURITY: Verify the email matches the invited email
    const invitedEmail = accessInfo.invited_email?.toLowerCase().trim();
    if (invitedEmail && invitedEmail !== normalizedEmail) {
      console.error(`[${requestId}] Email mismatch - invited: ${invitedEmail.substring(0, 3)}***, provided: ${normalizedEmail.substring(0, 3)}***`);
      return new Response(
        JSON.stringify({ error: 'Email does not match the invitation' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[${requestId}] Using auth_user_id from invite: ${authUserId.substring(0, 8)}***`);

    // Update the user's password using the stored auth_user_id
    // No listUsers() call needed - we have the definitive user ID
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      authUserId,
      {
        password: password,
        user_metadata: {
          needs_password_setup: false,
        },
      }
    );

    if (updateError) {
      console.error(`[${requestId}] Error updating user password:`, updateError.message);
      throw updateError;
    }
    console.log(`[${requestId}] Password updated successfully`);

    // Ensure client account exists and is linked
    const { data: existingClient } = await supabaseAdmin
      .from('client_accounts')
      .select('id')
      .eq('user_id', authUserId)
      .maybeSingle();

    let clientId = existingClient?.id;

    if (!clientId) {
      const { data: newClient, error: clientError } = await supabaseAdmin
        .from('client_accounts')
        .insert({
          user_id: authUserId,
          email: normalizedEmail,
          full_name: accessInfo.client_name || '',
        })
        .select('id')
        .single();

      if (!clientError && newClient) {
        clientId = newClient.id;
        console.log(`[${requestId}] Created client account: ${clientId.substring(0, 8)}***`);
      } else if (clientError && clientError.code !== '23505') {
        console.error(`[${requestId}] Error creating client account:`, clientError.message);
      }
    }

    // Link to job access if not already linked
    if (clientId) {
      await supabaseAdmin
        .from('client_job_access')
        .update({ client_id: clientId })
        .eq('access_token', accessToken)
        .is('client_id', null);
    }

    // Ensure client role exists - ONLY 'client' role, never 'staff'
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({ user_id: authUserId, role: 'client' });

    if (roleError && roleError.code !== '23505') {
      console.error(`[${requestId}] Error adding client role:`, roleError.message);
    } else {
      console.log(`[${requestId}] Client role ensured`);
    }

    // Mark password as set on the access record
    await supabaseAdmin
      .from('client_job_access')
      .update({ password_set_at: new Date().toISOString() })
      .eq('access_token', accessToken);

    console.log(`[${requestId}] Registration completed successfully`);
    return new Response(
      JSON.stringify({ success: true, userId: authUserId, isNewUser: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Registration error:', error instanceof Error ? error.message : 'Unknown error');
    const errorMessage = error instanceof Error ? error.message : 'Failed to complete registration';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
