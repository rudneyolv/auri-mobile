/** @format */
import { z } from 'zod';
import { ApiErrorSchema } from '../schemas/api-error-schema';

export type ApiError = z.infer<typeof ApiErrorSchema>;
