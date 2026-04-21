import { ApiError } from '@/api';
import { discoveryUsers } from '@/modules/discovery/api/discovery-api';
import { DiscoveryCursor, DiscoveryResponse } from '@/modules/discovery/types/discovery-api';
import { ResolvedDiscoveryFilters } from '@/modules/discovery/types/discovery-filters';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useDiscovery({ filters }: { filters?: ResolvedDiscoveryFilters } = {}) {
  return useInfiniteQuery<
    DiscoveryResponse,
    ApiError,
    { pages: DiscoveryResponse[]; pageParams: (DiscoveryCursor | null)[] },
    readonly ['discovery-users', ResolvedDiscoveryFilters | undefined],
    DiscoveryCursor | null
  >({
    queryKey: ['discovery-users', filters] as const,
    queryFn: ({ pageParam }) => discoveryUsers({ filters, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta.nextCursor ?? undefined,
    refetchOnWindowFocus: false,
  });
}
