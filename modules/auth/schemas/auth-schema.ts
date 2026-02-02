import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.email('Insira um email válido'),
  password: z.string(),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  email: z.email('Insira um email válido'),
  password: z
    .string()
    .min(1, 'A senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  name: z.string().min(2, 'Insira um nome válido'),
});

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
