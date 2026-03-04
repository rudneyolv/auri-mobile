import { UserCategory } from '@/modules/category/types/category-entity';
import { UserGenre } from '@/modules/genre/types/genre-entity';
import { UserSkill } from '@/modules/skills/types/skills-entity';

export interface UserProfile {
  user_id: string;
  name: string;
  bio: string | null;
  profile_picture_url: string | null;
  accept_messages_from_non_matches: boolean;
  categories: UserCategory[];
  skills: UserSkill[];
  genres: UserGenre[];
}
