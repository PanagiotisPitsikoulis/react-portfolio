"use server";

import { z } from "zod";

import { sendResendEmail } from "@/lib/resend";

const schema = z.object({
  fullName: z.string().min(2, "Name is too short").max(120),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Please add more details").max(5000),
  company: z.string().max(200).optional().or(z.literal("")),
  phone: z.string().max(100).optional().or(z.literal("")),
  country: z.string().max(100).optional().or(z.literal("")),
  companySize: z.string().max(50).optional().or(z.literal("")),
  referral: z.string().max(100).optional().or(z.literal("")),
});

export interface ContactFormResult {
  success: boolean;
  message: string;
  fieldErrors?: Partial<
    Record<
      | "fullName"
      | "email"
      | "message"
      | "company"
      | "phone"
      | "country"
      | "companySize"
      | "referral",
      string
    >
  >;
}

export async function sendContact(
  formData: FormData
): Promise<ContactFormResult> {
  const parsed = schema.safeParse({
    fullName: (formData.get("fullName") || "").toString(),
    email: (formData.get("email") || "").toString(),
    message: (formData.get("message") || "").toString(),
    company: (formData.get("company") || "").toString(),
    phone: (formData.get("phone") || "").toString(),
    country: (formData.get("country") || "").toString(),
    companySize: (formData.get("companySize") || "").toString(),
    referral: (formData.get("referral") || "").toString(),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path?.[0] as string | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      success: false,
      message: "Please fix the errors and try again.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set");
    return { success: false, message: "Email service not configured." };
  }

  const from = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO || process.env.RESEND_FROM;
  if (!to) {
    console.warn("CONTACT_TO or RESEND_FROM must be set");
    return { success: false, message: "Recipient not configured." };
  }

  const subject = `New contact from ${data.fullName}${
    data.company ? ` @ ${data.company}` : ""
  }`;
  const text = `Name: ${data.fullName}\nEmail: ${data.email}\nCompany: ${data.company}\nPhone: ${data.phone}\nCountry: ${data.country}\nCompany Size: ${data.companySize}\nReferral: ${data.referral}\n\nMessage:\n${data.message}`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto;line-height:1.6">
      <h2 style="margin:0 0 12px 0">New contact message</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${
        data.company
          ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>`
          : ""
      }
      ${
        data.phone
          ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>`
          : ""
      }
      ${
        data.country
          ? `<p><strong>Country:</strong> ${escapeHtml(data.country)}</p>`
          : ""
      }
      ${
        data.companySize
          ? `<p><strong>Company size:</strong> ${escapeHtml(
              data.companySize
            )}</p>`
          : ""
      }
      ${
        data.referral
          ? `<p><strong>Referral:</strong> ${escapeHtml(data.referral)}</p>`
          : ""
      }
      <hr style="margin:16px 0" />
      <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
    </div>
  `;

  try {
    await sendResendEmail({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      html,
      replyTo: data.email,
    });
    return { success: true, message: "Message sent. Thanks for reaching out!" };
  } catch (error) {
    console.error("Failed sending contact email:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again.",
    };
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
