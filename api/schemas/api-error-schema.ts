/** @format */

// schemas/api-error-schema.ts
import { z } from 'zod';

export const ApiErrorSchema = z.object({
  statusCode: z.number().optional(),
  error: z.string(),
  messages: z.array(z.string()),
});
