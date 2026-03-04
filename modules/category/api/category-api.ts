import { apiRequest } from '@/api';
import { CreateCategoryDto, UpdateCategoryDto } from '@/modules/category/types/category-api';
import { Category, UserCategory } from '@/modules/category/types/category-entity';

export async function getCategories() {
  return await apiRequest<Category[]>({
    endpoint: 'categories',
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function getUserCategory(categoryId: string) {
  return await apiRequest<UserCategory>({
    endpoint: `profiles/me/categories/${categoryId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function addCategory(dto: CreateCategoryDto) {
  return await apiRequest<Category>({
    endpoint: 'profiles/me/categories',
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

export async function updateCategory({
  categoryId,
  dto,
}: {
  categoryId: string;
  dto: UpdateCategoryDto;
}) {
  console.log(dto);

  return await apiRequest<Category>({
    endpoint: `profiles/me/categories/${categoryId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'PATCH',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
}

export async function removeCategory(categoryId: string) {
  return await apiRequest<Category>({
    endpoint: `profiles/me/categories/${categoryId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'DELETE',
    },
  });
}
