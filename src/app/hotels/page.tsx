import { action_getHotels } from '@/actions/hotel/get-hotels';
import HotelCard from '@/components/hotel/HotelCard';
import React from 'react';

async function Hotels() {
  const hotels = await action_getHotels();
  if (!hotels) return <p>Hotels not found</p>;
  return (
    <div className="grid grid-cols-3 py-10 place-items-center">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

export default Hotels;
