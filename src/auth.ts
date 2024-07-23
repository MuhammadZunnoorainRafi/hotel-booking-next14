import NextAuth from 'next-auth';
import PostgresAdapter from '@auth/pg-adapter';
import { pool } from './lib/db';
import Credentials from 'next-auth/providers/credentials';
import { LogSchema } from './lib/schemas';
import { getUserByEmail } from './procedures/user/getUserByEmail';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: '/auth/login' },
  callbacks: {
    session: async ({ session, token }) => {
      return session;
    },
    jwt: async ({ token }) => {
      return token;
    },
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validations = LogSchema.safeParse(credentials);
        if (validations.success) {
          const { email, password } = validations.data;
          const db = await pool.connect();
          const user = await getUserByEmail(email, db);
          db.release();
          if (!user) return null;
          const matchedPassword = await bcrypt.compare(password, user.password);
          if (matchedPassword) return user;
        }
        return null;
      },
    }),
  ],
});
