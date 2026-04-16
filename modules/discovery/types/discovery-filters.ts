import { ProficiencyLevel } from '@/common/types/common-enums';

export interface ResolvedDiscoveryFilters {
  categories: {
    id: string;
    proficiency_level?: ProficiencyLevel;
  }[];

  skills: {
    id: string;
    proficiency_level?: ProficiencyLevel;
  }[];

  genres: string[];

  collab: {
    min?: number;
    max?: number;
  };
}
