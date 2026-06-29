export function configuredAdminEmails() {
  return (process.env.BETTER_SEARCH_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isConfiguredAdmin(email: string | null | undefined) {
  if (!email) return false;

  const allowedEmails = configuredAdminEmails();
  return allowedEmails.length > 0 && allowedEmails.includes(email.toLowerCase());
}
