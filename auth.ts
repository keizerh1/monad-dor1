// auth.ts
import NextAuth from "next-auth"
import type { AuthConfig } from "next-auth"
import Discord from "next-auth/providers/discord"
import { SupabaseAdapter } from "@auth/supabase-adapter"

const config: AuthConfig = {
  trustHost: true,                            // ← existe en v5
  secret: process.env.NEXTAUTH_SECRET,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!, // service role (server only)
  }),
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.providerAccountId) token.userId = account.providerAccountId
      return token
    },
    async session({ session, token }) {
      (session.user as any).id = token.userId as string
      return session
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
