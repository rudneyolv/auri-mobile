import { ProficiencyLevel } from '@/common/types/common-enums';

export interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_url: string | null;
  created_at: string;
}

export interface Skill {
  id: string;
  category_id: string;
  category: SkillCategory | null;
  name: string;
  slug: string;
  description: string;
  icon_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSkill extends Skill {
  proficiency_level: ProficiencyLevel;
  years_experience: number;
}
