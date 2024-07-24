'use client';
import { LogSchema } from '@/lib/schemas';
import { LogType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react';
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
import CardWrapper from './CardWrapper';
import { action_login } from '@/actions/auth/login-user';
import ErrorMessage from '../shared/ErrorMessage';

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<LogType>({
    resolver: zodResolver(LogSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formSubmit = (formData: LogType) => {
    setErrorMessage('');
    startTransition(async () => {
      const res = await action_login(formData);
      if (res?.error) {
        setErrorMessage(res.error);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome to login screen!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-4">
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

export default LoginForm;
