import { CreateSkillSchema } from '@/modules/skill/schemas/create-skill-schema';
import z from 'zod';

export type CreateSkillForm = z.infer<typeof CreateSkillSchema>;
