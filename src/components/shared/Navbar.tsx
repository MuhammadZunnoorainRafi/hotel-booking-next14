import React from 'react';
import SearchBar from './SearchBar';
import UserButton from '../auth/UserButton';
import { useGetUserServer } from '@/hooks/getUserServert';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { NavMenu } from './NavMenu';

async function Navbar() {
  const user = await useGetUserServer();
  return (
    <div className="px-10 shadow-md py-5 flex items-center justify-between">
      <h1 className="font-bold text-2xl">🏠 Hotel</h1>
      <div>
        <SearchBar />
      </div>
      <div className="flex items-center justify-center gap-1">
        <ThemeToggle />
        <NavMenu />
        <div>
          {user ? (
            <UserButton user={user} />
          ) : (
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
