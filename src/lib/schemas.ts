import { z } from 'zod';

export const LogSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
