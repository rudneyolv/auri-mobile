import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Text } from '@/common/components/ui/text';
import { Controller, useForm } from 'react-hook-form';
import { View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '@/common/components/ui/button';
import React from 'react';

export const SkillSchema = z.object({
  name: z.string().min(1, 'O nome da skill é obrigatório'),
  proficiencyLevel: z.string().optional(),
  yearsOfExperience: z.string().regex(/^\d*$/, 'Informe apenas números').optional(),
});

export type SkillFormValues = z.infer<typeof SkillSchema>;

interface SkillMutationFormProps {
  defaultValues?: Partial<SkillFormValues>;
  isLoading?: boolean;
  onSubmit: (values: SkillFormValues) => void;
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
export function SkillMutationForm({ defaultValues, isLoading, onSubmit }: SkillMutationFormProps) {
  const form = useForm<SkillFormValues>({
    mode: 'onChange',
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      name: '',
      proficiencyLevel: '',
      yearsOfExperience: '',
      ...defaultValues,
    },
  });

  const { refs, getRef } = useSyncedRef<TextInput>();

  const handleSubmit = (values: SkillFormValues) => {
    onSubmit(values);
    form.reset();
  };

  const formHasErrors = !!Object.keys(form.formState.errors).length;

  return (
    <View className="gap-4">
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Label>Nome da skill</Label>
            <Input
              placeholder="Ex: Mixagem"
              onChangeText={field.onChange}
              editable={!isLoading}
              returnKeyType="next"
              onSubmitEditing={() => refs.current['proficiencyLevel']?.focus()}
              className={fieldState.error ? 'border-destructive' : ''}
              {...field}
              ref={getRef('name', field.ref)}
            />
            {fieldState.error && (
              <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="proficiencyLevel"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Label>Proficiência</Label>
            <Input
              placeholder="Ex: Avançado"
              onChangeText={field.onChange}
              editable={!isLoading}
              returnKeyType="next"
              onSubmitEditing={() => refs.current['yearsOfExperience']?.focus()}
              className={fieldState.error ? 'border-destructive' : ''}
              {...field}
              ref={getRef('proficiencyLevel', field.ref)}
            />
            {fieldState.error && (
              <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="yearsOfExperience"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Label>Anos de experiência</Label>
            <Input
              placeholder="Ex: 3"
              keyboardType="numeric"
              onChangeText={field.onChange}
              editable={!isLoading}
              returnKeyType="done"
              onSubmitEditing={form.handleSubmit(handleSubmit)}
              className={fieldState.error ? 'border-destructive' : ''}
              {...field}
              ref={getRef('yearsOfExperience', field.ref)}
            />
            {fieldState.error && (
              <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />

      <Button
        className="mt-4 w-full"
        disabled={!form.formState.isValid || isLoading}
        onPress={form.handleSubmit(handleSubmit)}>
        <Text>{isLoading ? 'Salvando...' : 'Salvar'}</Text>
      </Button>

      {formHasErrors && (
        <Text className="text-sm text-destructive">Preencha os campos corretamente</Text>
      )}
    </View>
  );
}
