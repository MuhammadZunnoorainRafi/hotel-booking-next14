'use client';
import React from 'react';
import { Button } from '../ui/button';
import { logout } from '@/actions/auth/logout';

function LogoutButton() {
  return (
    <Button onClick={async () => await logout()} variant={'destructive'}>
      Logout
    </Button>
  );
}

export default LogoutButton;
