import { UpdateBioSchema } from '@/modules/profiles/schemas/update-bio';
import z from 'zod';

export type UpdateBioFormData = z.infer<typeof UpdateBioSchema>;
