'use client';
import React from 'react';
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
import { useForm } from 'react-hook-form';
import { RegType } from '@/lib/types';
import { RegSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import CardWrapper from './CardWrapper';

function RegisterForm() {
  const form = useForm<RegType>({
    resolver: zodResolver(RegSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const formSubmit = (formData: RegType) => {
    console.log(formData);
  };

  return (
    <CardWrapper
      headerLabel="Welcome to Register screen"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default RegisterForm;
