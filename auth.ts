// auth.ts
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth" // ← Changé ici
import Discord from "next-auth/providers/discord"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const authOptions: NextAuthOptions = { // ← Changé ici
  // ⚠️ SupabaseAdapter avec URL + SERVICE ROLE KEY (server-only)
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,     // ex: https://xxxx.supabase.co
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!, // service role key (ne JAMAIS exposer côté client)
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
      // expose l'ID provider (Discord) pour l'utiliser dans tes API
      if (account?.providerAccountId) token.userId = account.providerAccountId
      return token
    },
    async session({ session, token }) {
      // injecte l'ID dans session.user.id
      (session.user as any).id = token.userId as string
      return session
    },
  },
}

const handler = NextAuth(authOptions) // ← Changé ici
export { handler as GET, handler as POST }