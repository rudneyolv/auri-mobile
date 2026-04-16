import { useMemo } from 'react';

export interface Identifiable {
  id: string;
  name: string;
}

export interface UseLookupParams<T extends Identifiable> {
  items: T[] | undefined;
  activeIds?: string[];
}

export interface UseLookupResult<T extends Identifiable> {
  itemsById: Map<string, T>;
  findById: (id: string) => T | null;
  getNameById: (id: string) => string;
  isActive: (id: string) => boolean;
  getAvailable: () => T[];
}

export function useLookup<T extends Identifiable>({
  items,
  activeIds = [],
}: UseLookupParams<T>): UseLookupResult<T> {
  const itemsById = useMemo(() => new Map((items ?? []).map((item) => [item.id, item])), [items]);

  const activeSet = useMemo(() => new Set(activeIds), [activeIds]);

  function findById(id: string) {
    return itemsById.get(id) ?? null;
  }

  function getNameById(id: string) {
    return itemsById.get(id)?.name ?? id;
  }

  function isActive(id: string) {
    return activeSet.has(id);
  }

  function getAvailable() {
    return (items ?? []).filter((item) => !activeSet.has(item.id));
  }

  return {
    itemsById,
    findById,
    getNameById,
    isActive,
    getAvailable,
  };
}
