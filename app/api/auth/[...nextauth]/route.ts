import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { compare } from 'bcryptjs';

const ADMIN_EMAIL = 'admin@hepsihikaye.com';
const ADMIN_PASSWORD = '$2a$10$zZ3.K8jXU/ZHqpX4Ny3yeuXZ.ZX1MPLsRqJEG1dQJvtMcgpckHg8q'; // hepsihikaye123

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email ve şifre gerekli');
        }

        if (credentials.email !== ADMIN_EMAIL) {
          throw new Error('Geçersiz email');
        }

        const isValid = await compare(credentials.password, ADMIN_PASSWORD);
        if (!isValid) {
          throw new Error('Geçersiz şifre');
        }

        return {
          id: '1',
          email: ADMIN_EMAIL,
          name: 'Admin',
          role: 'admin'
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
