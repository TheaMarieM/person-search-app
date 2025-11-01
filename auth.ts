import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // Optional: restrict to admin emails
      const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
      if (adminEmails.length > 0 && !adminEmails.includes(user.email || '')) {
        return false;
      }
      return true;
    },
  },
}
