export interface Genre {
  id: string;
  name: string;
  slug: string;
  category: string | null; // 'main', 'sub', 'fusion', 'niche'
  search_tags: string[] | null;
  icon_url: string | null;
  color: string | null;
  created_at: string;
}

export interface UserGenre extends Genre {
  is_primary: boolean;
}
