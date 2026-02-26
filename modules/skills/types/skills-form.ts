import { CreateSkillSchema } from '@/modules/skills/schemas/create-skill-schema';
import z from 'zod';

export type CreateSkillForm = z.infer<typeof CreateSkillSchema>;
