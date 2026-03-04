import { ApiError } from '@/api';
import { addGenre, getGenres, removeGenre } from '@/modules/genre/api/genre-api';
import { CreateGenreDto } from '@/modules/genre/types/genre-api';
import { Genre } from '@/modules/genre/types/genre-entity';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
}

export function useCreateGenre() {
  const qc = useQueryClient();

  return useMutation<Genre, ApiError, CreateGenreDto>({
    mutationFn: addGenre,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}

export function useRemoveGenre() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: removeGenre,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}
