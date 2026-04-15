import { ProficiencyLevel } from '@/common/types/common-enums';

export interface DiscoveryItem {
  user_id: string;
  name: string;
  profile_picture_url: string | null;
  primary_category: {
    name: string;
    proficiency_level: ProficiencyLevel;
    years_experience: number;
  };
  genres: Array<{
    name: string;
  }>;
  skills: Array<{
    name: string;
    proficiency_level: ProficiencyLevel;
    years_experience: number | null;
  }>;
  collab_price_min: number | null;
  collab_price_max: number | null;
  collab_request_status: null;
}
