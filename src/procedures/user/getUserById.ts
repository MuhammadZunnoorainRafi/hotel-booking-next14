import { UserType } from '@/lib/types';
import { Pool } from 'pg';

export const getUserById = async (id: string, db: Pool) => {
  const { rows } = await db.query<UserType>(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return rows[0];
};
