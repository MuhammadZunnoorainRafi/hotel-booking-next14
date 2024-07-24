import RegisterForm from '@/components/auth/RegisterForm';
import { useGetUserServer } from '@/hooks/getUserServert';
import { redirect } from 'next/navigation';
import React from 'react';

async function RegisterPage() {
  const user = await useGetUserServer();
  if (user) redirect('/');
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
