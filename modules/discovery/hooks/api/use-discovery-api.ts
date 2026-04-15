import { ApiError } from '@/api';
import { discoveryUsers } from '@/modules/discovery/api/discovery-api';
import { DiscoveryResponse } from '@/modules/discovery/types/discovery-api';
import { useQuery } from '@tanstack/react-query';

export function useDiscovery() {
  return useQuery<DiscoveryResponse, ApiError>({
    queryFn: () => discoveryUsers(),
    queryKey: ['discovery-users'],
  });
}
