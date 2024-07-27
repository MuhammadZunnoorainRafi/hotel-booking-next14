import { action_getHotelById } from '@/actions/hotel/get-hotels';
import HotelForm from '@/components/hotel/HotelForm';
import React from 'react';
type Props = {
  params: {
    hotelId: string;
  };
};
async function EditHotelPage({ params }: Props) {
  const hotel = await action_getHotelById(params.hotelId);
  return (
    <div>
      <h1 className="text-center font-bold text-3xl">Edit Hotel</h1>
      <HotelForm hotel={hotel} />
    </div>
  );
}

export default EditHotelPage;
