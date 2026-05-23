const developmentAuthSecret = "nova-development-auth-secret";
const isProduction = process.env.NODE_ENV === "production";

export const authSessionCookieName = isProduction ? "__Secure-nova.session-token" : "nova.session-token";

export function getAuthSecret() {
  return process.env.NEXTAUTH_SECRET ?? (isProduction ? null : developmentAuthSecret);
}
