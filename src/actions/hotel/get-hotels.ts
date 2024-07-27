'use server';

import { pool } from '@/lib/db';
import { HotelTypeDb } from '@/lib/types';

export const action_getHotels = async () => {
  const db = await pool.connect();
  const { rows } = await db.query<HotelTypeDb>(`SELECT * FROM hotels`);
  db.release();
  return rows;
};

export const action_getHotelById = async (hotelId: string) => {
  const db = await pool.connect();
  const { rows } = await db.query<HotelTypeDb>(
    `SELECT * FROM hotels WHERE id = $1`,
    [hotelId]
  );
  db.release();
  return rows[0];
};
