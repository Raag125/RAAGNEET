import { Resend } from "resend";
import WelcomeEmail from "@/emails/WelcomeEmail";

const resend = new Resend("re_YTs2KnQS_Kt4wwbFSHScdU1tXyLkRLoEt");

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, service } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and email are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const serviceDisplay = {
      website: "Premium Website",
      crm: "CRM System",
      erp: "ERP System",
      custom: "Custom Tool"
    }[service] || "Project";

    const data = await resend.emails.send({
      from: "RAAGNEET <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for connecting with RAAGNEET! We'll contact you soon.",
      react: WelcomeEmail({ name, service: serviceDisplay }),
    });

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
