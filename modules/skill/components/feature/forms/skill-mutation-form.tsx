import { Label } from '@/common/components/ui/label';
import { Text } from '@/common/components/ui/text';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/common/components/ui/button';
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
import { CreateSkillForm } from '@/modules/skill/types/skill-form';
import { CreateSkillDto } from '@/modules/skill/types/skill-api';
import { CreateSkillSchema } from '@/modules/skill/schemas/create-skill-schema';
import { useGetSkills } from '@/modules/skill/hooks/api/use-skill-api';

interface SkillMutationFormProps {
  defaultValues?: Partial<CreateSkillForm>;
  isLoading?: boolean;
  onSubmit: (values: CreateSkillDto) => void;
  apiError?: ApiError;
}

// --- UTILITÁRIO ---
// --- UTILITÁRIO ---
function useSyncedRef<T>() {
  const refs = React.useRef<Record<string, T | null>>({});

  const getRef = (name: string, fieldRef: React.Ref<T>) => (el: T | null) => {
    // conecta com o RHF
    if (typeof fieldRef === 'function') fieldRef(el);
    else if (fieldRef && 'current' in fieldRef) fieldRef.current = el;

    // guarda no mapa
    refs.current[name] = el;
  };

  return { refs, getRef };
}

// --- FORMULÁRIO ---
export function SkillMutationForm({
  defaultValues,
  isLoading,
  onSubmit,
  apiError,
}: SkillMutationFormProps) {
  const form = useForm<CreateSkillForm>({
    mode: 'onChange',
    resolver: zodResolver(CreateSkillSchema),
    defaultValues: {
      skill: undefined,
      proficiency_level: undefined,
      years_experience: undefined,
      ...defaultValues,
    },
  });

  const handleSubmit = (values: CreateSkillForm) => {
    onSubmit({
      skill_id: values.skill.value,
      proficiency_level: values.proficiency_level.value,
      years_experience: Number(values.years_experience.value),
    });
  };

  const formHasErrors = !!Object.keys(form.formState.errors).length;

  const { data: skills, isLoading: isLoadingSkills } = useGetSkills();

  if (isLoadingSkills || !skills) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View className="gap-4">
      {/* <Text>{JSON.stringify(form.watch(), null, 2)}</Text> */}

      <Controller
        control={form.control}
        name="skill"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Label>Habilidade</Label>

            <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
              <SelectTrigger className={`w-full ${fieldState.error ? 'border-destructive' : ''}`}>
                <SelectValue placeholder="Selecione a habilidade" />
              </SelectTrigger>

              <SelectContent>
                {skills.map((option) => (
                  <SelectItem key={option.id} label={option.slug} value={option.id} />
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
        name="proficiency_level"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Label>Proficiência</Label>

            <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
              <SelectTrigger className={`w-full ${fieldState.error ? 'border-destructive' : ''}`}>
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

            <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
              <SelectTrigger className={`w-full ${fieldState.error ? 'border-destructive' : ''}`}>
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

      <ApiErrorMessages messages={apiError?.messages} />

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
