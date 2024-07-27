'use client';
import React, { useTransition } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { HotelTypeDb } from '@/lib/types';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { DeleteIcon, EditIcon } from 'lucide-react';
import { action_deleteHotel } from '@/actions/hotel/delete-hotel';
import { useToast } from '../ui/use-toast';

type Props = {
  hotel: HotelTypeDb;
};
function HotelCard({ hotel }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await action_deleteHotel(hotel.id);
      if (res?.error) {
        toast({
          variant: 'destructive',
          description: res.error,
        });
      }

      if (res?.success) {
        toast({
          variant: 'success',
          description: res.success,
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="relative w-[400px] h-[300px]">
          <Image
            src={hotel.image}
            alt="Error edit image"
            fill
            className="rounded-md absolute object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">{hotel.title}</h1>
          <div className="flex items-center justify-center gap-1">
            <Button asChild size="icon" variant="ghost">
              <Link href={`/hotels/edit/${hotel.id}`}>
                <EditIcon />
              </Link>
            </Button>
            <Button
              disabled={isPending}
              size="icon"
              variant="destructive"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
        <p>{hotel.description}</p>
        <div>
          <span>{hotel.country},</span>
          <span>{hotel.state},</span>
          <span>{hotel.city}</span>
        </div>
        <div>
          {hotel.facilities.map((val, ind) => (
            <span key={ind}>{val},</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default HotelCard;
