import { apiRequest } from '@/api';
import { DiscoveryResponse } from '@/modules/discovery/types/discovery-api';

export async function discoveryUsers() {
  return await apiRequest<DiscoveryResponse>({
    endpoint: 'discovery',
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}
