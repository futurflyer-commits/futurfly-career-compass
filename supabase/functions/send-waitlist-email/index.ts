import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email } = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    // You will need to replace this logo URL once your app is deployed,
    // or if you host the logo in Supabase Storage.
    const logoUrl = "https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/logo.png"; // Placeholder

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #111111; color: #ffffff; padding: 40px; border-radius: 16px; border: 1px solid #333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <!-- Make sure to replace this URL with the live URL of your logo.png once deployed -->
          <h1 style="color: #4ade80; font-size: 28px; font-weight: bold; font-family: sans-serif;">FuturFly</h1>
        </div>
        <h2 style="color: #ffffff; text-align: center; margin-bottom: 24px; font-size: 22px;">Welcome to the Waitlist!</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #e2e8f0;">Hi ${name || 'there'},</p>
        <p style="font-size: 16px; line-height: 1.5; color: #e2e8f0;">
          You're officially on the waitlist for <strong>FuturFly Career Compass</strong>! 
          We're thrilled to have you join us on this journey.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #e2e8f0;">
          We are working hard to build the ultimate platform for charting your career path. 
          We'll notify you the moment we have updates to share or when you gain early access.
        </p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333333; text-align: center; font-size: 14px; color: #94a3b8;">
          <p>&copy; ${new Date().getFullYear()} FuturFly. All rights reserved.</p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "FuturFly <onboarding@resend.dev>", // Replace with your verified domain in Resend later
        to: [email],
        subject: "Welcome to the FuturFly Waitlist!",
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend API error:", errorText);
      throw new Error("Failed to send email");
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
