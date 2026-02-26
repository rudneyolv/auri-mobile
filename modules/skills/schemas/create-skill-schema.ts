import { ProficiencyLevel, YearsOfExperience } from '@/common/array-enums/array-enums';
import z from 'zod';

export const CreateSkillSchema = z.object({
  skill: z.object({
    label: z.string(),
    value: z.string(),
  }),
  proficiency_level: z.object({
    label: z.string(),
    value: z.enum(ProficiencyLevel),
  }),
  years_experience: z.object({
    label: z.string(),
    value: z.enum(YearsOfExperience),
  }),
});
