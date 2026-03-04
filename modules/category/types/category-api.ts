import { ProficiencyLevel, YearsOfExperience } from '@/common/types/common-enums';

export interface CreateCategoryDto {
  category_id: string;
  proficiency_level: ProficiencyLevel;
  years_experience: number;
  is_primary: boolean;
}

export type UpdateCategoryDto = Omit<CreateCategoryDto, 'category_id'>;
