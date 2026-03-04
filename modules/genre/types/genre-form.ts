import { AddGenreSchema } from '@/modules/genre/schemas/add-genre-schema';
import z from 'zod';

export type AddGenreForm = z.infer<typeof AddGenreSchema>;
