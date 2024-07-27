'use server';

import { pool } from '@/lib/db';
import { HotelTypeDb } from '@/lib/types';

export const action_getHotels = async (query?: string) => {
  const db = await pool.connect();
  let res;
  if (query) {
    res = await db.query<HotelTypeDb>(
      `SELECT * FROM hotels WHERE title ILIKE $1 ORDER BY "createdAt" desc`,
      [`%${query}%`]
    );
  } else {
    res = await db.query<HotelTypeDb>(
      `SELECT * FROM hotels ORDER BY "createdAt" desc`
    );
  }
  db.release();
  return res.rows;
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
