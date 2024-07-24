'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function NavMenu() {
  const [position, setPosition] = React.useState('bottom');
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <ChevronsUpDown className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuLabel>Hotel</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuItem
            className="cursor-pointer p-1"
            onClick={() => router.push('/hotel/new')}
          >
            Add Hotel
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer p-1"
            onClick={() => router.push('/hotels')}
          >
            My Hotels
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer p-1"
            onClick={() => router.push('/bookings')}
          >
            My Bookings
          </DropdownMenuItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
