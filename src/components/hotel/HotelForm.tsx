'use client';
import { HotelSchema } from '@/lib/schemas';
import { HotelType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { hotelFacilities } from '@/lib/constants';
import FacilityCheckbox from './FacilityCheckbox';
import { UploadButton } from '@/lib/uploadthing';
import { useToast } from '../ui/use-toast';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useLocation } from '@/hooks/getLocation';
import { ICity, IState } from 'country-state-city';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Props = {
  hotel?: HotelType;
};

function HotelForm({ hotel }: Props) {
  const [image, setImage] = useState('');
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { getAllCountries, getCountryStates, getStateCities } = useLocation();
  const countries = getAllCountries;
  const form = useForm<HotelType>({
    resolver: zodResolver(HotelSchema),
    defaultValues: {
      title: '',
      description: '',
      country: '',
      city: '',
      state: '',
      facilities: [],
      image: '',
    },
  });

  useEffect(() => {
    const seletedCountry = form.watch('country');
    const countryStates = getCountryStates(seletedCountry);
    if (countryStates) {
      setStates(countryStates);
    }
  }, [form.watch('country')]);

  useEffect(() => {
    const seletedCountry = form.watch('country');
    const selectedState = form.watch('state');
    const stateCities = getStateCities(seletedCountry, selectedState);
    if (stateCities) {
      setCities(stateCities);
    }
  }, [form.watch('country'), form.watch('state')]);

  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf('/') + 1);
    fetch('/api/uploadthing/delete', {
      method: 'DELETE',
      body: JSON.stringify({ imageKey }),
    }).then((res) => {
      if (res.ok) {
        toast({ variant: 'success', description: 'Image removed' });
      } else {
        toast({ variant: 'destructive', description: 'something went wrong' });
      }
    });
    setImageIsDeleting(false);
  };

  const formSubmit = (formData: HotelType) => {
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formSubmit)}
        className="w-[500px] mx-auto space-y-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select
                  disabled={isLoading}
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue
                      placeholder="Select a Country"
                      defaultValue={field.value}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Select
                  disabled={isLoading || states.length < 1}
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue
                      placeholder="Select a State"
                      defaultValue={field.value}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Select
                  disabled={isLoading || cities.length < 1}
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue
                      placeholder="Select a City"
                      defaultValue={field.value}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facilities"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 gap-1">
                {hotelFacilities.map((facility, ind) => (
                  <FacilityCheckbox
                    key={ind}
                    facility={facility}
                    field={field}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl className="flex flex-col items-center justify-between p-24">
                {image ? (
                  <div className="w-[300px] h-[300px] relative mt-4">
                    <Image
                      fill
                      src={image}
                      alt="Image Error"
                      className="object-contain"
                    />
                    <Button
                      variant="ghost"
                      className="absolute righ-[-12px] top-0"
                      onClick={() => handleImageDelete(image)}
                    >
                      {imageIsDeleting ? <Loader2 /> : <Cross1Icon />}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-6 border-2 border-dashed w-full border-primary/50 rounded mt-4">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        console.log('Files: ', res);
                        setImage(res[0].url);
                        toast({
                          variant: 'success',
                          description: 'Image uploaded successfully',
                        });
                      }}
                      onUploadError={(error: Error) => {
                        toast({
                          variant: 'destructive',
                          description: `Error: ${error.message}`,
                        });
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{hotel ? 'Edit' : 'Submit'}</Button>
      </form>
    </Form>
  );
}

export default HotelForm;
