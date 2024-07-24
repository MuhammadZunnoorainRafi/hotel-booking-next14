'use client';
import React, { useState, useTransition } from 'react';
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
import { action_register } from '@/actions/auth/register-user';
import ErrorMessage from '../shared/ErrorMessage';

function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegType>({
    resolver: zodResolver(RegSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const formSubmit = (formData: RegType) => {
    setErrorMessage('');
    startTransition(async () => {
      const res = await action_register(formData);
      if (res.error) {
        setErrorMessage(res.error);
      }
    });
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
            disabled={isPending}
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
            disabled={isPending}
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
            disabled={isPending}
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
          <Button disabled={isPending} className="w-full" type="submit">
            Submit
          </Button>
        </form>
        <ErrorMessage message={errorMessage} />
      </Form>
    </CardWrapper>
  );
}

export default RegisterForm;
