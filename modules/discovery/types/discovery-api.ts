import { DiscoveryItem } from '@/modules/discovery/types/discovery-entity';

export interface DiscoveryResponse {
  data: DiscoveryItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
