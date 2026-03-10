import { z } from 'zod';
import { SelectedVideoAsset } from '@/modules/video/types/video-form';

export const VideoUploadSchema = z.object({
  title: z.string().max(100, 'Titulo deve ter no maximo 100 caracteres'),
  description: z.string().max(500, 'Descricao deve ter no maximo 500 caracteres'),
  asset: z
    .custom<SelectedVideoAsset>()
    .nullable()
    .refine((value) => value !== null, 'Selecione um video'),
});
