import NextAuth from 'next-auth';
import PostgresAdapter from '@auth/pg-adapter';
import { pool } from './lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  providers: [],
});
