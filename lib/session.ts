import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getAuthSecret } from "@/lib/auth-secret";

function canReadServerSession() {
  return Boolean(getAuthSecret());
}

export async function getSession() {
  if (!canReadServerSession()) {
    return null;
  }

  try {
    return await getServerSession(authOptions);
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const session = await getSession();
  return session?.user ?? null;
}
