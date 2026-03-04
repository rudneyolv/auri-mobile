export interface CreateGenreDto {
  genre_id: string;
  is_primary: boolean;
}

export type UpdateGenreDto = Omit<CreateGenreDto, 'genre_id'>;
