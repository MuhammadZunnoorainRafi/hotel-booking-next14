import RegisterForm from '@/components/auth/RegisterForm';
import { getUserServer } from '@/hooks/getUserServert';
import { redirect } from 'next/navigation';
import React from 'react';

async function RegisterPage() {
  const user = await getUserServer();
  if (user) redirect('/');
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
