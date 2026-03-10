import { z } from 'zod';

export const VideoUpdateSchema = z.object({
  title: z.string().max(100, 'Titulo deve ter no maximo 100 caracteres'),
  description: z.string().max(500, 'Descricao deve ter no maximo 500 caracteres'),
});
