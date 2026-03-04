import { CreateCategorySchema } from '@/modules/category/schemas/create-skill-schema';
import z from 'zod';

export type CreateCategoryForm = z.infer<typeof CreateCategorySchema>;
