import { ProficiencyLevel } from '@/common/types/common-enums';
import { ResolvedDiscoveryFilters } from '@/modules/discovery/types/discovery-filters';

function parseJsonArray<T>(raw: unknown): T[] {
  if (typeof raw !== 'string' || !raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function parseOptionalNumber(raw: unknown): number | undefined {
  if (raw === undefined || raw === null || raw === '') return undefined;
  const num = Number(raw);
  return Number.isNaN(num) ? undefined : num;
}

export function deserializeFilters({
  params,
}: {
  params: Record<string, string | string[] | undefined>;
}): ResolvedDiscoveryFilters {
  const pickString = (key: string): string | undefined => {
    const value = params[key];
    if (Array.isArray(value)) return value[0];
    return value;
  };

  return {
    categories: parseJsonArray<{ id: string; proficiency_level?: ProficiencyLevel }>(
      pickString('category_filters')
    ),
    skills: parseJsonArray<{ id: string; proficiency_level?: ProficiencyLevel }>(
      pickString('skill_filters')
    ),
    genres: parseJsonArray<string>(pickString('genre_ids')),
    collab: {
      min: parseOptionalNumber(pickString('min_price')),
      max: parseOptionalNumber(pickString('max_price')),
    },
  };
}

export function serializeFilters({
  filters,
}: {
  filters: ResolvedDiscoveryFilters;
}): Record<string, string> {
  const out: Record<string, string> = {};

  if (filters.categories.length > 0) {
    out.category_filters = JSON.stringify(filters.categories);
  }

  if (filters.skills.length > 0) {
    out.skill_filters = JSON.stringify(filters.skills);
  }

  if (filters.genres.length > 0) {
    out.genre_ids = JSON.stringify(filters.genres);
  }

  if (filters.collab.min !== undefined) {
    out.min_price = String(filters.collab.min);
  }

  if (filters.collab.max !== undefined) {
    out.max_price = String(filters.collab.max);
  }

  return out;
}
