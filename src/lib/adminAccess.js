const adminEmails = [
  import.meta.env.VITE_ADMIN_EMAIL_1,
  import.meta.env.VITE_ADMIN_EMAIL_2,
]
  .filter(Boolean)
  .map((email) => email.trim().toLowerCase());

export const isAdminEmail = (email) =>
  Boolean(email) && adminEmails.includes(email.trim().toLowerCase());
