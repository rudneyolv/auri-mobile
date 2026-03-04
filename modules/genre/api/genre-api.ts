import { apiRequest } from '@/api';
import { CreateGenreDto } from '@/modules/genre/types/genre-api';
import { Genre } from '@/modules/genre/types/genre-entity';

export async function getGenres() {
  return await apiRequest<Genre[]>({
    endpoint: 'genres',
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function addGenre(dto: CreateGenreDto) {
  return await apiRequest<Genre>({
    endpoint: 'profiles/me/genres',
    requiresAuth: true,
    requestConfig: {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
}

export async function removeGenre(genreId: string) {
  return await apiRequest<Genre>({
    endpoint: `profiles/me/genres/${genreId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'DELETE',
    },
  });
}
