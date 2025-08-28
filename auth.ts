import NextAuth from "next-auth";
import type { AuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import { SupabaseAdapter } from "@auth/supabase-adapter";

// Votre configuration d'authentification
const config: AuthConfig = {
  // Nécessaire pour certains déploiements, notamment derrière un proxy
  trustHost: true,
  
  // Le secret pour signer les tokens JWT
  secret: process.env.NEXTAUTH_SECRET,
  
  // L'adaptateur pour connecter NextAuth à votre base de données Supabase
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),

  // La liste des fournisseurs d'authentification (ici, Discord uniquement)
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],

  // On choisit la stratégie de session "jwt" (JSON Web Tokens)
  session: { strategy: "jwt" },

  // Callbacks pour personnaliser le token et la session
  callbacks: {
    // Ce callback est appelé à la création du JWT
    async jwt({ token, account }) {
      // Si on se connecte, on ajoute l'ID du fournisseur (ex: ID Discord) au token
      if (account?.providerAccountId) {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    // Ce callback est appelé quand la session est lue
    async session({ session, token }) {
      // On ajoute l'ID utilisateur du token à l'objet session.user
      // pour le rendre accessible côté client
      if (session.user) {
        (session.user as any).id = token.userId as string;
      }
      return session;
    },
  },
};

// Initialisation de NextAuth avec la configuration
// et exportation des outils nécessaires (handlers, auth, signIn, signOut)
export const { handlers, auth, signIn, signOut } = NextAuth(config);