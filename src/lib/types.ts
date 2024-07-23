import { z } from 'zod';
import { LogSchema, RegSchema } from './schemas';

export type LogType = z.infer<typeof LogSchema>;
export type RegType = z.infer<typeof RegSchema>;
