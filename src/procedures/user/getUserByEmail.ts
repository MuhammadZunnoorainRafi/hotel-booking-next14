import { UserType } from '@/lib/types';
import { PoolClient } from 'pg';

export const getUserByEmail = async (email: string, db: PoolClient) => {
  const { rows } = await db.query<UserType>(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return rows[0];
};
