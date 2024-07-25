import { action_getHotels } from '@/actions/hotel/get-hotels';
import React from 'react';

async function Hotels() {
  const hotels = await action_getHotels();
  if (!hotels) return <p>Hotels not found</p>;
  return (
    <div>
      {hotels.map((val) => (
        <p key={val.id}>{val.title}</p>
      ))}
    </div>
  );
}

export default Hotels;
