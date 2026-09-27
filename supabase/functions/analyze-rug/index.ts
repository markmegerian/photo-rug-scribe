const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_IMAGES = 3;
const MAX_IMAGE_CHARS = 8_000_000; // ~6MB base64 per image

const systemPrompt = `You are a master rug inspector and estimator for a professional rug cleaning and repair company in the United States.
Given photos of a rug, produce a realistic inspection and itemized repair estimate that a real shop would send a client.

Identify the rug as specifically as the photos allow: construction (hand-knotted, hand-tufted, flatweave, machine-made), origin or style (e.g. Persian Tabriz, Turkish Oushak, Moroccan, Indo-Kashan), primary fibers (wool, silk, cotton, viscose, polypropylene), estimated age range, and approximate size in feet.

Findings must be concrete and located: name the specific issue and where on the rug it appears (e.g. "Fringe unraveling, both ends", "Moth grazing, lower-left corner", "Urine staining, center medallion", "Pile wear, main traffic path", "Color bleed, red border"). Use severity Minor / Moderate / Severe honestly — do not invent damage that is not visible.

Price services with realistic US trade rates. Use these reference ranges and compute each price from the rug's estimated size:
- Full immersion wash (hand-knotted wool): $4–7 per sq ft
- Machine-made / synthetic wash: $2.50–4 per sq ft
- Pet urine decontamination treatment: +$1.50–3 per sq ft on affected area or whole rug
- Moth treatment: $1–2 per sq ft
- Fringe repair / re-securing: $8–15 per linear foot of fringe
- Fringe replacement (new fringe): $15–25 per linear foot
- Side binding / serging repair: $6–12 per linear foot
- Reweaving holes or worn areas: $20–60 per square inch depending on knot density and fiber
- Stain / spot treatment: $50–150 flat per area
- Blocking and shearing (uneven pile): $1–2 per sq ft
- Rug pad (cut to size): $1.50–3 per sq ft
Only recommend services justified by the findings and rug type. A clean rug may only need a wash. Silk and antique pieces price at the top of each range; synthetics at the bottom.

For each service, put the quantity math in "detail" (e.g. "80 sq ft × $5.00/sq ft" or "16 linear ft × $10/ft") and the computed dollar amount in "price". Round prices to whole dollars.
If the photo is not a rug, set "isRug" to false and leave the other fields empty.`;

const tool = {
  type: "function",
  function: {
    name: "submit_report",
    description: "Submit the rug inspection report",
    parameters: {
      type: "object",
      properties: {
        isRug: { type: "boolean" },
        type: { type: "string", description: "Rug type / construction, e.g. Hand-knotted Persian Tabriz" },
        age: { type: "string", description: "Estimated age range" },
        size: { type: "string", description: "Estimated size, e.g. 8' x 10'" },
        material: { type: "string", description: "Primary fiber(s)" },
        condition: { type: "string", description: "One-sentence overall condition summary" },
        findings: {
          type: "array",
          items: {
            type: "object",
            properties: {
              issue: { type: "string" },
              location: { type: "string", description: "Where on the rug, e.g. lower-left corner" },
              severity: { type: "string", enum: ["Minor", "Moderate", "Severe"] },
            },
            required: ["issue", "location", "severity"],
            additionalProperties: false,
          },
        },
        services: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              detail: { type: "string", description: "Quantity math, e.g. 80 sq ft × $5.00/sq ft" },
              price: { type: "number", description: "Computed price in USD, whole dollars" },
            },
            required: ["name", "detail", "price"],
            additionalProperties: false,
          },
        },
      },
      required: ["isRug", "type", "age", "size", "material", "condition", "findings", "services"],
      additionalProperties: false,
    },
  },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("AI is not configured");

    const { images } = await req.json();

    if (!Array.isArray(images) || images.length === 0) {
      return new Response(JSON.stringify({ error: "Please add at least one photo." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (images.length > MAX_IMAGES) {
      return new Response(JSON.stringify({ error: `Please add at most ${MAX_IMAGES} photos.` }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    for (const img of images) {
      if (typeof img !== "string" || !img.startsWith("data:image/") || img.length > MAX_IMAGE_CHARS) {
        return new Response(JSON.stringify({ error: "Invalid or oversized image." }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: "Inspect this rug and submit the report." },
              ...images.map((url: string) => ({ type: "image_url", image_url: { url } })),
            ],
          },
        ],
        tools: [tool],
        tool_choice: { type: "function", function: { name: "submit_report" } },
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Too many requests right now. Please try again shortly." }), {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "The live demo is temporarily unavailable." }), {
        status: 402,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!response.ok) {
      const detail = await response.text();
      console.error("AI gateway error", response.status, detail);
      throw new Error("Analysis failed");
    }

    const data = await response.json();
    const call = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) throw new Error("No report returned");

    const report = JSON.parse(call.function.arguments);

    return new Response(JSON.stringify({ report }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("analyze-rug error:", error);
    return new Response(JSON.stringify({ error: "Could not analyze the photos. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
