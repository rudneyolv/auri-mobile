import { ApiError } from '@/api';
import {
  addCategory,
  getCategories,
  getUserCategory,
  removeCategory,
  updateCategory,
} from '@/modules/category/api/category-api';
import { CreateCategoryDto, UpdateCategoryDto } from '@/modules/category/types/category-api';
import { Category } from '@/modules/category/types/category-entity';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}

export function useGetUserCategory(categoryId: string) {
  return useQuery({
    queryKey: ['user-category', categoryId],
    queryFn: () => getUserCategory(categoryId),
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();

  return useMutation<Category, ApiError, CreateCategoryDto>({
    mutationFn: addCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();

  return useMutation<Category, ApiError, { categoryId: string; dto: UpdateCategoryDto }>({
    mutationFn: updateCategory,
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['my-profile'] });
      qc.invalidateQueries({ queryKey: ['user-category', variables.categoryId] });
    },
  });
}

export function useRemoveCategory() {
  const qc = useQueryClient();

  return useMutation<Category, ApiError, string>({
    mutationFn: removeCategory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}
