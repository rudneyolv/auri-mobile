import { ProficiencyLevel } from '@/common/types/common-enums';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_url: string | null;
  created_at: string;
}

export interface UserCategory extends Category {
  proficiency_level: ProficiencyLevel;
  years_experience: number;
  is_primary: boolean;
}
