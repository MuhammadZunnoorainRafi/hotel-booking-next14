'use server';

import { pool } from '@/lib/db';
import { HotelTypeDb } from '@/lib/types';

export const action_getHotels = async () => {
  const db = await pool.connect();
  const { rows } = await db.query<HotelTypeDb>(`SELECT * FROM hotels`);
  db.release();
  return rows;
};
