import { UserSkill } from '@/modules/skills/types/skills-api';

export interface UserProfile {
  user_id: string;
  name: string;
  bio: string | null;
  profile_picture_url: string | null;
  accept_messages_from_non_matches: boolean;
  // categories: UserProfileCategory[];
  skills: UserSkill[];
  // genres: UserGenre[];
}
