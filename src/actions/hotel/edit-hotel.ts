'use server';

import { getUserServer } from '@/hooks/getUserServert';
import { pool } from '@/lib/db';
import { HotelSchema } from '@/lib/schemas';
import { HotelType } from '@/lib/types';
import { UUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const action_editHotel = async (hotelId: UUID, formData: HotelType) => {
  const db = await pool.connect();
  try {
    const user = await getUserServer();
    if (!user) {
      return { error: 'Not Authorized!' };
    }
    const validation = HotelSchema.safeParse(formData);
    if (!validation.success) {
      return {
        error: 'Invalid Fields',
      };
    }
    const { city, country, description, facilities, image, state, title } =
      validation.data;
    const values = {
      city,
      country,
      description,
      facilities,
      image,
      state,
      title,
      userId: user.id,
      hotelId,
    };
    const { rows } = await db.query(
      `UPDATE hotels SET city = $1, country = $2, description = $3, facilities = $4, image = $5, state = $6, title = $7 WHERE "userId" = $8 AND id = $9 RETURNING id`,
      Object.values(values)
    );
    if (!rows[0]) {
      return { error: 'Hotel not updated' };
    }
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  } finally {
    db.release();
  }
  revalidatePath('/hotels');
  redirect('/hotels');
  return { success: 'Hotel updated successfully' };
};
