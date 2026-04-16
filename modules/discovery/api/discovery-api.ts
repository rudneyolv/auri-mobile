import { apiRequest } from '@/api';
import { ResolvedDiscoveryFilters } from '@/modules/discovery/types/discovery-filters';
import { DiscoveryResponse } from '@/modules/discovery/types/discovery-api';
import { buildQueryString } from '@/modules/discovery/utils/build-query-string';
import { serializeFilters } from '@/modules/discovery/utils/discovery-filters-serializer';

export async function discoveryUsers(filters?: ResolvedDiscoveryFilters) {
  const qs = filters ? buildQueryString(serializeFilters({ filters })) : '';

  return await apiRequest<DiscoveryResponse>({
    endpoint: qs ? `discovery?${qs}` : 'discovery',
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}
