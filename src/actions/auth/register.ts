'use server';
import { pool } from '@/lib/db';
import { RegSchema } from '@/lib/schemas';
import { RegType } from '@/lib/types';
import { getUserByEmail } from '@/procedures/user/getUserByEmail';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export const register = async (formData: RegType) => {
  const db = await pool.connect();
  try {
    const validations = RegSchema.safeParse(formData);
    if (!validations.success) {
      return { error: 'Invalid fields' };
    }
    const { name, email, password } = validations.data;

    const userExists = await getUserByEmail(email, db);
    if (userExists) {
      return { error: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await db.query(
      `INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING id`,
      [name, email, hashedPassword]
    );

    if (!rows[0]) {
      return { error: 'User not created' };
    }
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  } finally {
    db.release();
  }
  redirect('/auth/login');
};
