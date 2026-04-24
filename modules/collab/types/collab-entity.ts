export type CollabRequestStatus = 'pending' | 'accepted' | 'declined';
export type DiscoveryCollabStatus = Extract<CollabRequestStatus, 'pending' | 'accepted'> | null;
export type CollabTab = 'received' | 'sent';

export interface CollabProfilePreview {
  user_id: string;
  name: string;
  profile_picture_url: string | null;
  primary_category_name: string | null;
  proficiency_level: string | null;
  years_experience: number | null;
}
