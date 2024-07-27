'use server';
import { getUserServer } from '@/hooks/getUserServert';
import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const action_deleteHotel = async (hotelId: string) => {
  const db = await pool.connect();
  const user = await getUserServer();
  if (!user) {
    return { error: 'Unauthorized' };
  }
  try {
    await db.query(`DELETE FROM hotels WHERE "userId" = $1 AND id = $2`, [
      user.id,
      hotelId,
    ]);
  } catch (error) {
    console.log(error);
    return { error: 'Error While Deleting!' };
  } finally {
    db.release();
  }
  revalidatePath('/hotels');
  return { success: 'Hotel Deleted' };
};
