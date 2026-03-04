import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Button } from '@/common/components/ui/button';
import { Checkbox } from '@/common/components/ui/checkbox';
import { Label } from '@/common/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Text } from '@/common/components/ui/text';
import { useCreateGenre, useGetGenres } from '@/modules/genre/hooks/api/use-genre-api';
import { AddGenreSchema } from '@/modules/genre/schemas/add-genre-schema';
import { AddGenreForm } from '@/modules/genre/types/genre-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, DefaultValues, useForm, useWatch } from 'react-hook-form';
import { View } from 'react-native';

const defaultValues: DefaultValues<AddGenreForm> = {
  genre: undefined,
  is_primary: false,
};

export function AddGenre() {
  const { data: genres, isLoading: isLoadingGenres } = useGetGenres();
  const { mutate: addGenre, isPending: isAddingGenre, error: addGenreError } = useCreateGenre();

  const form = useForm<AddGenreForm>({
    mode: 'onChange',
    resolver: zodResolver(AddGenreSchema),
    defaultValues: defaultValues,
  });

  const isPrimaryChecked = useWatch({
    control: form.control,
    name: 'is_primary',
  });

  const handleSubmit = (values: AddGenreForm) => {
    addGenre(
      {
        genre_id: values.genre.value,
        is_primary: values.is_primary,
      },
      {
        onSuccess: () => {
          form.reset(defaultValues);
        },
      }
    );
  };

  if (isLoadingGenres || !genres) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View className="gap-4">
      <Controller
        control={form.control}
        name="genre"
        render={({ field, fieldState }) => (
          <View className="gap-2">
            <Label>Genero</Label>

            <Select value={field.value} onValueChange={field.onChange} disabled={isAddingGenre}>
              <SelectTrigger className={`w-full ${fieldState.error ? 'border-destructive' : ''}`}>
                <SelectValue placeholder="Selecione o genero" />
              </SelectTrigger>

              <SelectContent>
                {genres.map((option) => (
                  <SelectItem key={option.id} label={option.slug} value={option.id} />
                ))}
              </SelectContent>
            </Select>

            {fieldState.error && (
              <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
            )}

            {addGenreError && <ApiErrorMessages messages={addGenreError.messages} />}
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
                disabled={isAddingGenre}
              />
              <Label onPress={() => field.onChange(!field.value)}>
                Definir como genero principal
              </Label>
            </View>

            {isPrimaryChecked && (
              <View className="rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
                <Text className="text-sm text-amber-800 dark:text-amber-200">
                  Ao marcar como principal, o genero primario atual sera automaticamente desmarcado.
                </Text>
              </View>
            )}
          </View>
        )}
      />

      <Button disabled={isAddingGenre} onPress={form.handleSubmit(handleSubmit)}>
        <Text>Adicionar</Text>
      </Button>
    </View>
  );
}
