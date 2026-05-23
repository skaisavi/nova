import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authSessionCookieName, getAuthSecret } from "@/lib/auth-secret";
import { hasDatabaseUrl, prisma } from "@/lib/db";
import { signInSchema } from "@/lib/validations/auth";

const demoUser = {
  id: "demo-user",
  name: "Skaiste",
  email: "skaiste@nova.dev"
};

export const authOptions: NextAuthOptions = {
  secret: getAuthSecret() ?? undefined,
  session: {
    strategy: "jwt"
  },
  cookies: {
    sessionToken: {
      name: authSessionCookieName,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  pages: {
    signIn: "/sign-in"
  },
  providers: [
    CredentialsProvider({
      name: "NOVA credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        if (!hasDatabaseUrl()) {
          const isDemoLogin = parsed.data.email === demoUser.email && parsed.data.password === "nova-demo";
          return isDemoLogin ? demoUser : null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: parsed.data.email
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            passwordHash: true
          }
        });

        if (!user?.passwordHash) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(parsed.data.password, user.passwordHash);

        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }

      return session;
    }
  }
};
