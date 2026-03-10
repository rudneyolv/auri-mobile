export interface UserVideo {
  id: string;
  user_id: string;
  storage_key: string;
  video_url: string;
  thumbnail_url: string | null;
  title: string | null;
  description: string | null;
  duration: number;
  file_size: number;
  mime_type: string;
  view_count: number;
  order_position: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}
