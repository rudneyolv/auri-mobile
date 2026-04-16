import { ApiError } from '@/api';
import { discoveryUsers } from '@/modules/discovery/api/discovery-api';
import { DiscoveryResponse } from '@/modules/discovery/types/discovery-api';
import { ResolvedDiscoveryFilters } from '@/modules/discovery/types/discovery-filters';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useDiscovery({ filters }: { filters?: ResolvedDiscoveryFilters } = {}) {
  return useQuery<DiscoveryResponse, ApiError>({
    queryFn: () => discoveryUsers(filters),
    queryKey: ['discovery-users', filters],
    placeholderData: keepPreviousData,
  });
}
