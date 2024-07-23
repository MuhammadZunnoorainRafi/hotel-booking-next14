'use client';
import { logout } from '@/actions/auth/logout';
import { Button } from '@/components/ui/button';
import { useGetUserClient } from '@/hooks/getUserClient';

export default function Home() {
  const user = useGetUserClient();
  return (
    <div>
      {JSON.stringify(user)}
      <Button onClick={async () => await logout()} variant={'destructive'}>
        Logout
      </Button>
    </div>
  );
}
