import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Icon } from '@/common/components/ui/icon';
import { Label } from '@/common/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Text } from '@/common/components/ui/text';
import { proficiencyLevelOptions } from '@/common/form-options/form-options';
import { useLookup } from '@/common/hooks/use-lookup';
import { ProficiencyLevel } from '@/common/types/common-enums';
import { useGetCategories } from '@/modules/category/hooks/api/use-category-api';
import { ResolvedDiscoveryFilters } from '@/modules/discovery/types/discovery-filters';
import { X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

interface FilterCategoriesProps {
  activeCategories: ResolvedDiscoveryFilters['categories'];
  onChange: (payload: { patch: Partial<ResolvedDiscoveryFilters> }) => void;
}

interface Draft {
  categoryId?: string;
  proficiency?: ProficiencyLevel;
}

export function FilterCategories({ activeCategories, onChange }: FilterCategoriesProps) {
  const { data: categories } = useGetCategories();
  const [draft, setDraft] = useState<Draft>({});
  // Força remount dos Selects após commit: @rn-primitives/select não reseta o label exibido quando value volta a undefined.
  const [resetKey, setResetKey] = useState(0);

  const activeIds = useMemo(
    () => activeCategories.map((category) => category.id),
    [activeCategories]
  );
  const { findById, getNameById, isActive, getAvailable } = useLookup({
    items: categories,
    activeIds,
  });

  function handleAdd() {
    if (!draft.categoryId || isActive(draft.categoryId)) return;

    onChange({
      patch: {
        categories: [
          ...activeCategories,
          {
            id: draft.categoryId,
            proficiency_level: draft.proficiency,
          },
        ],
      },
    });

    setDraft({});
    setResetKey((value) => value + 1);
  }

  function handleRemove(categoryId: string) {
    onChange({
      patch: {
        categories: activeCategories.filter((category) => category.id !== categoryId),
      },
    });
  }

  const selectedCategory = draft.categoryId ? findById(draft.categoryId) : null;

  const selectedProficiency = draft.proficiency
    ? proficiencyLevelOptions.find((option) => option.value === draft.proficiency)
    : undefined;

  return (
    <View className="gap-2">
      <Label>Categorias</Label>

      {activeCategories.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {activeCategories.map((category) => (
            <Badge key={category.id} variant="secondary" className="pr-1">
              <Text>
                {getNameById(category.id)}
                {category.proficiency_level ? ` · ${category.proficiency_level}` : ''}
              </Text>
              <Pressable onPress={() => handleRemove(category.id)} hitSlop={8}>
                <Icon as={X} className="size-3 text-secondary-foreground" />
              </Pressable>
            </Badge>
          ))}
        </View>
      )}

      <View className="flex-row gap-2">
        <View className="flex-1">
          <Select
            key={`category-${resetKey}`}
            value={
              selectedCategory
                ? { value: selectedCategory.id, label: selectedCategory.name }
                : undefined
            }
            onValueChange={(option) =>
              setDraft((prev) => ({ ...prev, categoryId: option?.value }))
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {getAvailable().map((category) => (
                <SelectItem key={category.id} label={category.name} value={category.id} />
              ))}
            </SelectContent>
          </Select>
        </View>

        <View className="flex-1">
          <Select
            key={`prof-${resetKey}`}
            value={selectedProficiency}
            onValueChange={(option) =>
              setDraft((prev) => ({
                ...prev,
                proficiency: option?.value as ProficiencyLevel | undefined,
              }))
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              {proficiencyLevelOptions.map((option) => (
                <SelectItem key={option.value} label={option.label} value={option.value} />
              ))}
            </SelectContent>
          </Select>
        </View>
      </View>

      <Button variant="outline" size="sm" disabled={!draft.categoryId} onPress={handleAdd}>
        <Text>Adicionar categoria</Text>
      </Button>
    </View>
  );
}
