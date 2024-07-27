'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { HotelTypeDb } from '@/lib/types';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { DeleteIcon, EditIcon } from 'lucide-react';
import { action_deleteHotel } from '@/actions/hotel/delete-hotel';
import { useToast } from '../ui/use-toast';
import { DatePickerWithRange } from './DateRangePicker';
import { DateRange } from 'react-day-picker';
import { addDays, differenceInCalendarDays } from 'date-fns';

type Props = {
  hotel: HotelTypeDb;
};
function HotelCard({ hotel }: Props) {
  const [isPending, startTransition] = useTransition();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 0),
  });
  const [days, setDays] = useState(0);
  const { toast } = useToast();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from);
      setDays(dayCount);
      setTotalPrice(dayCount * 70);
    }
  }, [date]);

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
      <CardFooter>
        <DatePickerWithRange date={date} setDate={setDate} />
      </CardFooter>
      <CardFooter>
        <h1>
          Total Price is ${totalPrice} for {days} days
        </h1>
      </CardFooter>
    </Card>
  );
}

export default HotelCard;
