import { useSession } from 'next-auth/react';

export const useGetUserClient = () => {
  const session = useSession();
  return session.data?.user;
};
