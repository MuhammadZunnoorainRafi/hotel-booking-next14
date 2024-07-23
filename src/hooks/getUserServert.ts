import { auth } from '@/auth';

export const useGetUserServer = async () => {
  const session = await auth();
  return session?.user;
};
