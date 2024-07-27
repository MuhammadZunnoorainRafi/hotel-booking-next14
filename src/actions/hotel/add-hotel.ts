'use server';

import { getUserServer } from '@/hooks/getUserServert';
import { pool } from '@/lib/db';
import { HotelSchema } from '@/lib/schemas';
import { HotelType } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const action_addHotel = async (formData: HotelType) => {
  const db = await pool.connect();
  try {
    const validations = HotelSchema.safeParse(formData);
    if (!validations.success) {
      return { error: 'Invalid Fields' };
    }

    const user = await getUserServer();
    if (!user) {
      return { error: 'User not found' };
    }
    const { rows } = await db.query(
      `INSERT INTO hotels("userId",title,description,image,country,state,city,facilities) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      Object.values({ userId: user.id, ...formData })
    );

    if (!rows[0]) {
      return { error: 'Hotel not created' };
    }
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  } finally {
    db.release();
  }
  revalidatePath('/hotels');
  redirect('/hotels');
  return { success: 'Hotel Created' };
};
