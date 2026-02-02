import z from 'zod';

const EnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().default('http://localhost:3001'),
  EXPO_PUBLIC_APP_URL: z.string().default('http://localhost:8081'),
  EXPO_PUBLIC_SUPABASE_URL: z.string().default(''),
  EXPO_PUBLIC_SUPABASE_PUBLIC_KEY: z.string().default(''),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().default(''),
});

export const ENV = EnvSchema.parse(process.env);
