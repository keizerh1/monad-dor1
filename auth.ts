// auth.ts
import NextAuth from "next-auth"
import { getServerSession } from "next-auth"
import type { NextAuthOptions } from "next-auth"
import Discord from "next-auth/providers/discord"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
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

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// Ajouter cette fonction pour la compatibilité
export const auth = () => getServerSession(authOptions)