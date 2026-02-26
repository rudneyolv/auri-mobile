import { ApiError } from '@/api';
import { getMyProfile, updateBio } from '@/modules/profiles/api/profile-api';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useUpdateBio() {
  return useMutation<void, ApiError, string>({
    mutationFn: updateBio,
  });
}

export function useGetMyprofile() {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: () => getMyProfile(),
  });
}
