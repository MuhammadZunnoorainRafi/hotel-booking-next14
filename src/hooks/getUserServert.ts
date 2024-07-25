import { auth } from '@/auth';

export const getUserServer = async () => {
  const session = await auth();
  return session?.user;
};
