import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/common/components/ui/button';
import { Text } from '@/common/components/ui/text';
import { Textarea } from '@/common/components/ui/textarea';
import { View } from 'react-native';
import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { useUpdateBio } from '@/modules/profiles/hooks/api/use-profile-api';
import { UpdateBioSchema } from '@/modules/profiles/schemas/update-bio';
import { UpdateBioFormData } from '@/modules/profiles/types/profile-forms';

export function UpdateBio({ currentBio }: { currentBio?: string }) {
  const { mutate: updateBio, isPending, error } = useUpdateBio();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UpdateBioFormData>({
    defaultValues: { bio: currentBio ?? undefined },
    resolver: zodResolver(UpdateBioSchema),
    mode: 'onChange',
  });

  return (
    <View className="gap-2">
      <Text className="font-semibold">Sobre</Text>

      <Controller
        control={control}
        name="bio"
        render={({ field, fieldState }) => (
          <View className="gap-1.5" data-invalid={fieldState.invalid}>
            <Textarea
              editable={!isPending}
              placeholder="Insira aqui sua biografia, suas habilidades, experiências etc..."
              className="min-h-28"
              {...field}
            />
            {fieldState.error && (
              <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />

      <ApiErrorMessages messages={error?.messages} />

      <Button onPress={handleSubmit(({ bio }) => updateBio(bio))} disabled={isPending || !isValid}>
        <Text>{isPending ? 'Salvando...' : 'Salvar'}</Text>
      </Button>
    </View>
  );
}
