import { DiscoveryItem } from '@/modules/discovery/types/discovery-entity';

export interface DiscoveryCursor {
  created_at: string;
  id: string;
}

export interface DiscoveryResponse {
  data: DiscoveryItem[];
  meta: {
    nextCursor: DiscoveryCursor | null;
  };
}
