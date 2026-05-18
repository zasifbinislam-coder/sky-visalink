/**
 * Transactional email via Resend. Graceful: if RESEND_API_KEY is unset
 * we log to console and return ok so the request still succeeds in dev
 * and on day one.
 *
 * Env:
 *   RESEND_API_KEY        required to actually send
 *   EMAIL_FROM            defaults to onboarding@resend.dev (sandbox)
 *   EMAIL_FROM_NAME       display name on the From header
 *   INQUIRY_ADMIN_EMAIL   gets the admin alert; defaults to zasifbinislam@gmail.com
 */

type SendArgs = {
  to: string;
  subject: string;
  html: string;
};

const FROM_DEFAULT = process.env.EMAIL_FROM || "onboarding@resend.dev";
const FROM_NAME = process.env.EMAIL_FROM_NAME || "SKY VISALink";

export async function sendEmail({ to, subject, html }: SendArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[email] (no RESEND_API_KEY) would send:", { to, subject });
    return true;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_DEFAULT}>`,
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[email] resend error", res.status, text);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] unexpected", err);
    return false;
  }
}

const wrap = (inner: string) => `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a1a;line-height:1.6">
  <div style="border-bottom:2px solid #0a4d8c;padding-bottom:12px;margin-bottom:20px">
    <strong style="font-size:18px;color:#0a4d8c">✈️ SKY VISALink</strong>
  </div>
  ${inner}
  <hr style="border:none;border-top:1px solid #eee;margin:28px 0 16px"/>
  <p style="font-size:12px;color:#888">
    Manage inquiries in <a href="https://sky-visalink.vercel.app/admin/inquiries" style="color:#0a4d8c">/admin/inquiries</a>.
  </p>
</div>`;

function escapeHtml(s: unknown): string {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const LABELS: Record<string, string> = {
  tourist: "Tourist visa",
  student: "Student visa",
  business: "Business visa",
  work: "Work permit",
  general: "General inquiry",
  "quick-inquiry": "Quick inquiry form",
  "contact-form": "Contact form",
  "country-detail": "Country detail page",
  "book-consultant": "Book a consultation",
};

export function inquiryAdminEmail(inquiry: {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  visaType: string;
  source: string;
  country?: string | null;
  passport?: string | null;
  travellers?: number | null;
  travelDate?: string | null;
  travelClass?: string | null;
  purpose?: string | null;
  message?: string | null;
}): string {
  const visaLabel = LABELS[inquiry.visaType] ?? inquiry.visaType;
  const sourceLabel = LABELS[inquiry.source] ?? inquiry.source;
  const rows: string[] = [];
  const add = (label: string, value: unknown) => {
    if (value == null || value === "") return;
    rows.push(`<tr>
      <td style="padding:4px 8px;color:#666;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:4px 8px;color:#1a1a1a">${escapeHtml(value)}</td>
    </tr>`);
  };
  add("Name", inquiry.name);
  add("Phone", inquiry.phone);
  add("Email", inquiry.email);
  add("Visa type", visaLabel);
  add("Source", sourceLabel);
  add("Country", inquiry.country);
  add("Passport", inquiry.passport);
  add("Travellers", inquiry.travellers);
  add("Travel date", inquiry.travelDate);
  add("Class", inquiry.travelClass);
  add("Purpose", inquiry.purpose);
  if (inquiry.message) {
    rows.push(`<tr>
      <td style="padding:4px 8px;color:#666;vertical-align:top">Message</td>
      <td style="padding:4px 8px;color:#1a1a1a;white-space:pre-wrap">${escapeHtml(inquiry.message)}</td>
    </tr>`);
  }

  return wrap(`
    <h2 style="margin:0 0 10px;font-size:18px">🆕 New ${escapeHtml(visaLabel)} inquiry — ${escapeHtml(inquiry.id)}</h2>
    <p style="margin:0 0 14px;color:#555">
      <a href="tel:${escapeHtml(inquiry.phone)}" style="color:#0a4d8c;text-decoration:none">📞 ${escapeHtml(inquiry.phone)}</a>
      ${inquiry.email ? ` · <a href="mailto:${escapeHtml(inquiry.email)}" style="color:#0a4d8c;text-decoration:none">✉️ ${escapeHtml(inquiry.email)}</a>` : ""}
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:13.5px;border:1px solid #eee;border-radius:8px;overflow:hidden">
      ${rows.join("")}
    </table>
  `);
}
