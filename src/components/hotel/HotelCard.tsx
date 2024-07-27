import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { HotelTypeDb } from '@/lib/types';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { EditIcon } from 'lucide-react';

type Props = {
  hotel: HotelTypeDb;
};
function HotelCard({ hotel }: Props) {
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
          <Button asChild size="icon" variant="ghost">
            <Link href={`/hotels/edit/${hotel.id}`}>
              <EditIcon />
            </Link>
          </Button>
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
