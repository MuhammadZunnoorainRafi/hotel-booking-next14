import { z } from 'zod';
import { HotelSchema, LogSchema, RegSchema } from './schemas';
import { UUID } from 'crypto';

export type LogType = z.infer<typeof LogSchema>;
export type RegType = z.infer<typeof RegSchema>;

export type UserType = RegType & {
  id: string;
};

export type HotelType = z.infer<typeof HotelSchema>;

export type HotelTypeDb = {
  id: UUID;
} & HotelType;
