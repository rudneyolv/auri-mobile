import { Label } from '@/common/components/ui/label';
import { Text } from '@/common/components/ui/text';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '@/common/components/ui/button';
import { Checkbox } from '@/common/components/ui/checkbox';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { ApiError } from '@/api';
import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import {
  proficiencyLevelOptions,
  YearsOfExperienceOptions,
} from '@/common/form-options/form-options';
import { useGetCategories } from '@/modules/category/hooks/api/use-category-api';
import { CreateCategoryDto } from '@/modules/category/types/category-api';
import { CreateCategoryForm } from '@/modules/category/types/category-form';
import { CreateCategorySchema } from '@/modules/category/schemas/create-skill-schema';
import { Capability } from '@/common/capability/types/capability-types';
import { CapabilityGuidance } from '@/common/capability/components/capability-guidance';

interface CategoryMutationFormProps {
  defaultValues?: Partial<CreateCategoryForm>;
  isLoading?: boolean;
  onSubmit: (values: CreateCategoryDto) => void;
  apiError?: ApiError;
  capabilities?: {
    category?: Capability;
  };
}

export function CategoryMutationForm({
  defaultValues,
  isLoading,
  onSubmit,
  apiError,
  capabilities,
}: CategoryMutationFormProps) {
  const categoryCapability = capabilities?.category;
  const isCategoryCapabilityLocked = categoryCapability?.enabled === false;

  const form = useForm<CreateCategoryForm>({
    mode: 'onChange',
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      category: undefined,
      proficiency_level: undefined,
      years_experience: undefined,
      is_primary: false,
      ...defaultValues,
    },
  });

  const handleSubmit = (values: CreateCategoryForm) => {
    onSubmit({
      category_id: values.category.value,
      proficiency_level: values.proficiency_level.value,
      years_experience: Number(values.years_experience.value),
      is_primary: values.is_primary,
    });
  };

  const formHasErrors = !!Object.keys(form.formState.errors).length;
  const isPrimaryChecked = form.watch('is_primary');

  const { data: categories, isLoading: isLoadingCategories } = useGetCategories();

  if (isLoadingCategories || !categories) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View className="gap-4">
      <Controller
        control={form.control}
        name="category"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Label>Categoria</Label>

            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                disabled={isCategoryCapabilityLocked || isLoading}
                className={`w-full ${fieldState.error ? 'border-destructive' : ''}`}>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((option) => (
                  <SelectItem key={option.id} label={option.slug} value={option.id} />
                ))}
              </SelectContent>
            </Select>

            <CapabilityGuidance.Root capability={categoryCapability}>
              <CapabilityGuidance.Reason>
                {categoryCapability?.guidance?.reason}
              </CapabilityGuidance.Reason>

              <CapabilityGuidance.NextStep nextStep={categoryCapability?.guidance?.nextStep} />
            </CapabilityGuidance.Root>

            {fieldState.error && (
              <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="proficiency_level"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Label>Proficiência</Label>

            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                disabled={isLoading}
                className={`w-full ${fieldState.error ? 'border-destructive' : ''}`}>
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>

              <SelectContent>
                {proficiencyLevelOptions.map((option) => (
                  <SelectItem key={option.value} label={option.label} value={option.value} />
                ))}
              </SelectContent>
            </Select>

            {fieldState.error && (
              <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="years_experience"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Label>Anos de experiência</Label>

            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                disabled={isLoading}
                className={`w-full ${fieldState.error ? 'border-destructive' : ''}`}>
                <SelectValue placeholder="Selecione o tempo" />
              </SelectTrigger>

              <SelectContent>
                {YearsOfExperienceOptions.map((option) => (
                  <SelectItem key={option.value} label={option.label} value={option.value} />
                ))}
              </SelectContent>
            </Select>

            {fieldState.error && (
              <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="is_primary"
        render={({ field }) => (
          <View className="gap-2">
            <View className="flex-row items-center gap-3">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isLoading}
              />
              <Label onPress={() => field.onChange(!field.value)}>
                Definir como categoria principal
              </Label>
            </View>

            {isPrimaryChecked && (
              <View className="rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
                <Text className="text-sm text-amber-800 dark:text-amber-200">
                  ⚠️ Ao marcar como principal, a categoria primária atual será automaticamente
                  desmarcada.
                </Text>
              </View>
            )}
          </View>
        )}
      />

      {apiError && <ApiErrorMessages messages={apiError.messages} />}

      <Button
        className="mt-4 w-full"
        disabled={isLoading}
        onPress={form.handleSubmit(handleSubmit)}>
        <Text>{isLoading ? 'Salvando...' : 'Salvar'}</Text>
      </Button>

      {formHasErrors && (
        <Text className="text-sm text-destructive">Preencha os campos corretamente</Text>
      )}
    </View>
  );
}
