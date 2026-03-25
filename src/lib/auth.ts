import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.login = profile.login as string;
        token.avatar = profile.avatar_url as string;
        token.name = profile.name as string ?? profile.login as string;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as unknown as Record<string, unknown>).login = token.login;
        (session.user as unknown as Record<string, unknown>).avatar = token.avatar;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
