'use client';
import React from 'react';
import { action_logout } from '@/actions/auth/logout-user';

function LogoutButton({ children }: { children: React.ReactNode }) {
  return <span onClick={async () => await action_logout()}>{children}</span>;
}

export default LogoutButton;
