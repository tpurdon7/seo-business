import "server-only";

type SendRecoveryEmailInput = {
  email: string;
  recoveryUrl: string;
};

type ResendResponse = {
  id?: string;
  message?: string;
  name?: string;
};

function requiredEnv(name: "RESEND_API_KEY" | "AUTH_EMAIL_FROM") {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

export async function sendRecoveryEmail({ email, recoveryUrl }: SendRecoveryEmailInput) {
  const apiKey = requiredEnv("RESEND_API_KEY");
  const from = requiredEnv("AUTH_EMAIL_FROM");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Reset your Better Search password",
      text: [
        "A password reset was requested for your Better Search account.",
        "",
        `Choose a new password: ${recoveryUrl}`,
        "",
        "This link expires and can only be used once. If you did not request it, you can ignore this email.",
      ].join("\n"),
      html: `
        <div style="background:#f7f9fc;padding:32px 16px;font-family:Arial,sans-serif;color:#0f172a">
          <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:32px">
            <p style="margin:0 0 12px;color:#c2410c;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Better Search</p>
            <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2">Reset your password</h1>
            <p style="margin:0 0 24px;color:#475569;line-height:1.6">A password reset was requested for your Better Search account.</p>
            <a href="${recoveryUrl}" style="display:inline-block;background:#ea580c;color:#fff;text-decoration:none;font-weight:700;padding:13px 20px;border-radius:8px">Choose a new password</a>
            <p style="margin:24px 0 0;color:#64748b;font-size:13px;line-height:1.6">This link expires and can only be used once. If you did not request it, you can ignore this email.</p>
          </div>
        </div>
      `,
    }),
  });
  const result = (await response.json().catch(() => ({}))) as ResendResponse;

  if (!response.ok || !result.id) {
    throw new Error(result.message || result.name || `Email provider returned ${response.status}.`);
  }

  return result.id;
}
