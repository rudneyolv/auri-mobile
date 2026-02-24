import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/common/components/ui/button';
import { Text } from '@/common/components/ui/text';
import { Textarea } from '@/common/components/ui/textarea';
import { View } from 'react-native';
import z from 'zod';

const BioSchema = z.object({
  bio: z.string().min(5, 'A bio deve ter pelo menos 5 caracteres'),
});

export function BioForm({
  currentBio,
  onSubmit,
  isLoading,
}: {
  currentBio: string;
  onSubmit: (bio: string) => void;
  isLoading?: boolean;
}) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ bio: string }>({
    defaultValues: { bio: currentBio },
    resolver: zodResolver(BioSchema),
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
              editable={!isLoading}
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

      <Button onPress={handleSubmit(({ bio }) => onSubmit(bio))} disabled={isLoading || !isValid}>
        <Text>{isLoading ? 'Salvando...' : 'Salvar'}</Text>
      </Button>
    </View>
  );
}
