import LogoutButton from '@/components/auth/LogoutButton';
import { getUserServer } from '@/hooks/getUserServert';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getUserServer();
  if (!user) redirect('/auth/login');
  return (
    <div>
      {JSON.stringify(user)}
      <LogoutButton>Logout</LogoutButton>
    </div>
  );
}
