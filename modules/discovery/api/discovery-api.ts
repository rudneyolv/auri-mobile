import { apiRequest } from '@/api';
import { ResolvedDiscoveryFilters } from '@/modules/discovery/types/discovery-filters';
import { DiscoveryCursor, DiscoveryResponse } from '@/modules/discovery/types/discovery-api';
import { buildQueryString } from '@/modules/discovery/utils/build-query-string';
import { serializeFilters } from '@/modules/discovery/utils/discovery-filters-serializer';

interface DiscoveryUsersParams {
  filters?: ResolvedDiscoveryFilters;
  cursor?: DiscoveryCursor | null;
}

export async function discoveryUsers({ filters, cursor }: DiscoveryUsersParams = {}) {
  const serialized = filters ? serializeFilters({ filters }) : {};

  if (cursor) {
    serialized.cursor = JSON.stringify(cursor);
  }

  const qs = buildQueryString(serialized);

  return await apiRequest<DiscoveryResponse>({
    endpoint: qs ? `discovery?${qs}` : 'discovery',
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}
