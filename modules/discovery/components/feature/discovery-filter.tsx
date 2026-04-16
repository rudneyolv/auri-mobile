import { Button } from '@/common/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';
import { Icon } from '@/common/components/ui/icon';
import { Separator } from '@/common/components/ui/separator';
import { Text } from '@/common/components/ui/text';
import { FilterCategories } from '@/modules/discovery/components/feature/filter-categories';
import { FilterCollab } from '@/modules/discovery/components/feature/filter-collab';
import { FilterGenres } from '@/modules/discovery/components/feature/filter-genres';
import { FilterSkills } from '@/modules/discovery/components/feature/filter-skills';
import { ResolvedDiscoveryFilters } from '@/modules/discovery/types/discovery-filters';
import {
  deserializeFilters,
  serializeFilters,
} from '@/modules/discovery/utils/discovery-filters-serializer';
import { router, useLocalSearchParams } from 'expo-router';
import { SlidersHorizontal } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

const CLEAR_PARAMS = {
  category_filters: '',
  skill_filters: '',
  genre_ids: '',
  min_price: '',
  max_price: '',
};

export function DiscoveryFilter() {
  const params = useLocalSearchParams<Record<string, string>>();

  const filters = useMemo(() => deserializeFilters({ params }), [params]);

  function handleFiltersChange({ patch }: { patch: Partial<ResolvedDiscoveryFilters> }) {
    const next: ResolvedDiscoveryFilters = {
      ...filters,
      ...patch,
    };

    router.setParams({ ...CLEAR_PARAMS, ...serializeFilters({ filters: next }) });
  }

  function handleClearAll() {
    router.setParams(CLEAR_PARAMS);
  }

  const activeCount =
    filters.categories.length +
    filters.skills.length +
    filters.genres.length +
    (filters.collab.min !== undefined || filters.collab.max !== undefined ? 1 : 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Icon as={SlidersHorizontal} className="size-4" />
          <Text>Filtros{activeCount > 0 ? ` (${activeCount})` : ''}</Text>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[85%]">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>

        <ScrollView contentContainerClassName="gap-4 pb-4">
          <FilterCategories activeCategories={filters.categories} onChange={handleFiltersChange} />
          <Separator />

          <FilterSkills activeSkills={filters.skills} onChange={handleFiltersChange} />
          <Separator />

          <FilterGenres activeGenres={filters.genres} onChange={handleFiltersChange} />
          <Separator />

          <FilterCollab activeCollab={filters.collab} onChange={handleFiltersChange} />
        </ScrollView>

        <View className="flex-row gap-2">
          <Button variant="outline" className="flex-1" onPress={handleClearAll}>
            <Text>Limpar tudo</Text>
          </Button>
          <DialogClose asChild>
            <Button className="flex-1">
              <Text>Fechar</Text>
            </Button>
          </DialogClose>
        </View>
      </DialogContent>
    </Dialog>
  );
}
