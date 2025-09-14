import { Resend } from "resend";

export interface SendEmailArgs {
  from: string;
  to: string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

export async function sendResendEmail(args: SendEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");
  const resend = new Resend(apiKey);

  const { from, to, subject, text, html, replyTo } = args;
  await resend.emails.send({
    from,
    to,
    subject,
    text,
    html,
    reply_to: replyTo,
  } as any);
}
