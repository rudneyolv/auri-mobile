import { ProficiencyLevel, YearsOfExperience } from '@/common/array-enums/array-enums';
import z from 'zod';

export const CreateCategorySchema = z.object({
  category: z.object({
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
  is_primary: z.boolean(),
});
