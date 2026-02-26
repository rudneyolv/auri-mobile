import { apiRequest } from '@/api';
import { UserProfile } from '@/modules/profiles/types/profile-types';

export async function updateBio(bio: string): Promise<void> {
  return await apiRequest({
    endpoint: 'profiles/me/bio',
    requiresAuth: true,
    requestConfig: {
      method: 'PATCH',
      body: JSON.stringify({ bio: bio }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
}

export async function getMyProfile() {
  return await apiRequest<UserProfile>({
    endpoint: 'profiles/me',
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}
