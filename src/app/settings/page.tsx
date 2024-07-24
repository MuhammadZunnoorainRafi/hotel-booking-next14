import LogoutButton from '@/components/auth/LogoutButton';
import { useGetUserServer } from '@/hooks/getUserServert';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await useGetUserServer();
  if (!user) redirect('/auth/login');
  return (
    <div>
      {JSON.stringify(user)}
      <LogoutButton />
    </div>
  );
}
