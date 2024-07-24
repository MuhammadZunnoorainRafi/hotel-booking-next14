'use server';

import { signOut } from '@/auth';

export const action_logout = async () => {
  await signOut();
};
