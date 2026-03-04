import z from 'zod';

export const UpdateBioSchema = z.object({
  bio: z.string().min(5, 'A bio deve ter pelo menos 5 caracteres'),
});
