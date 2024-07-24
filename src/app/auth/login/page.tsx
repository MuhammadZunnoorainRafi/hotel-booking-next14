import LoginForm from '@/components/auth/LoginForm';
import { useGetUserServer } from '@/hooks/getUserServert';
import { redirect } from 'next/navigation';
import React from 'react';

async function LoginPage() {
  const user = await useGetUserServer();
  if (user) redirect('/');
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
