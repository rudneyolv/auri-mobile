import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Text } from '@/common/components/ui/text';
import { Textarea } from '@/common/components/ui/textarea';
import { VideoUpdateSchema } from '@/modules/video/schemas/video-update-schema';
import { VideoEditFormValues } from '@/modules/video/types/video-form';

interface VideoEditFormProps {
  defaultTitle?: string | null;
  defaultDescription?: string | null;
  isLoading?: boolean;
  onSubmit: (values: VideoEditFormValues) => void;
}

export function VideoEditForm({
  defaultTitle,
  defaultDescription,
  isLoading,
  onSubmit,
}: VideoEditFormProps) {
  const form = useForm<VideoEditFormValues>({
    resolver: zodResolver(VideoUpdateSchema),
    defaultValues: {
      title: defaultTitle ?? '',
      description: defaultDescription ?? '',
    },
    mode: 'onChange',
  });

  const watchedTitle = useWatch({ control: form.control, name: 'title' });
  const watchedDescription = useWatch({ control: form.control, name: 'description' });

  return (
    <View className="gap-3">
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Input
              placeholder="Titulo"
              editable={!isLoading}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
            />
            <Text className="text-xs text-muted-foreground">{watchedTitle.length}/100</Text>
            {fieldState.error && (
              <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Textarea
              placeholder="Descricao"
              editable={!isLoading}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              className="min-h-24"
            />
            <Text className="text-xs text-muted-foreground">{watchedDescription.length}/500</Text>
            {fieldState.error && (
              <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />

      <Button disabled={isLoading || !form.formState.isValid} onPress={form.handleSubmit(onSubmit)}>
        <Text>{isLoading ? 'Salvando...' : 'Salvar alteracoes'}</Text>
      </Button>
    </View>
  );
}
