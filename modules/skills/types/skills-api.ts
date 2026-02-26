import { ProficiencyLevel, YearsOfExperience } from '@/common/types/common-enums';

export interface CreateSkillDto {
  skill_id: string;
  proficiency_level: ProficiencyLevel;
  years_experience: number;
}

export type UpdateSkillDto = Omit<CreateSkillDto, 'skill_id'>;
