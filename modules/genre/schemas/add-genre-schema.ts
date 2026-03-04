import z from 'zod';

export const AddGenreSchema = z.object({
  genre: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    'O gênero é obrigatório'
  ),
  is_primary: z.boolean(),
});
