import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Text } from '@/common/components/ui/text';
import { Textarea } from '@/common/components/ui/textarea';
import { VideoPlayer } from '@/modules/video/components/feature/video-player';
import {
  useDeleteVideo,
  useGetVideoById,
  useUpdateVideo,
} from '@/modules/video/hooks/api/use-video-api';
import { VideoUpdateSchema } from '@/modules/video/schemas/video-update-schema';
import { VideoEditFormValues } from '@/modules/video/types/video-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Pressable, ScrollView, View } from 'react-native';

export default function MyVideoDetailsRoute() {
  const router = useRouter();
  const { videoId } = useLocalSearchParams<{ videoId?: string }>();
  const safeVideoId = videoId ?? '';

  const { data: video, isLoading, error } = useGetVideoById({ videoId: safeVideoId });
  const { mutate: updateVideo, isPending: isUpdating, error: updateError } = useUpdateVideo();
  const { mutate: deleteVideo, isPending: isDeleting, error: deleteError } = useDeleteVideo();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const form = useForm<VideoEditFormValues>({
    resolver: zodResolver(VideoUpdateSchema),
    defaultValues: {
      title: video?.title ?? '',
      description: video?.description ?? '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (!video) {
      return;
    }

    form.reset({
      title: video.title ?? '',
      description: video.description ?? '',
    });
  }, [form, video]);

  const watchedTitle = useWatch({ control: form.control, name: 'title' });
  const watchedDescription = useWatch({ control: form.control, name: 'description' });

  const handleSubmitEdit = ({ title, description }: { title: string; description: string }) => {
    if (!video) {
      return;
    }

    updateVideo(
      {
        videoId: video.id,
        dto: {
          title: title.trim() || undefined,
          description: description.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          form.reset({
            title: title.trim() || '',
            description: description.trim() || '',
          });
        },
      }
    );
  };

  if (isLoading) {
    return <Text>Carregando video...</Text>;
  }

  if (error || !video) {
    return <ApiErrorMessages messages={error?.messages ?? ['Video nao encontrado.']} />;
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between border-b border-border px-4 py-3">
        <Text className="font-semibold">Video</Text>
        <Button variant="ghost" size="sm" onPress={() => router.back()}>
          <Text>Voltar</Text>
        </Button>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <VideoPlayer sourceUri={video.video_url} />

        <View className="mt-4 gap-3">
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <View className="gap-1.5">
                <Text className="text-sm font-semibold">Titulo</Text>
                <Input
                  placeholder="Titulo"
                  editable={!isUpdating}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                <Text className="text-xs text-muted-foreground">
                  {(watchedTitle ?? '').length}/100
                </Text>
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
                <Text className="text-sm font-semibold">Descricao</Text>
                <Textarea
                  placeholder="Descricao"
                  editable={!isUpdating}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  className="min-h-24"
                />
                <Text className="text-xs text-muted-foreground">
                  {(watchedDescription ?? '').length}/500
                </Text>
                {fieldState.error && (
                  <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
                )}
              </View>
            )}
          />

          <Button
            disabled={isUpdating || !form.formState.isValid}
            onPress={form.handleSubmit(handleSubmitEdit)}>
            <Text>{isUpdating ? 'Salvando...' : 'Salvar alteracoes'}</Text>
          </Button>

          <Button variant="destructive" onPress={() => setIsDeleteOpen(true)}>
            <Text>Deletar video</Text>
          </Button>
        </View>

        <View className="mt-4">
          <ApiErrorMessages messages={updateError?.messages ?? deleteError?.messages} />
        </View>
      </ScrollView>

      {isDeleteOpen && (
        <View className="absolute inset-0 z-50 items-center justify-center bg-black/60 px-4">
          <Pressable
            onPress={() => setIsDeleteOpen(false)}
            className="absolute inset-0"
            accessibilityRole="button"
            accessibilityLabel="Fechar confirmacao"
          />
          <View className="w-full max-w-md rounded-xl border border-border bg-background p-4">
            <Text className="text-lg font-semibold">Remover video</Text>
            <Text className="mt-2 text-sm text-muted-foreground">Deseja remover este video?</Text>
            <View className="mt-4 flex-row gap-2">
              <Button variant="outline" className="flex-1" onPress={() => setIsDeleteOpen(false)}>
                <Text>Cancelar</Text>
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onPress={() => {
                  deleteVideo(
                    { videoId: video.id },
                    {
                      onSuccess: () => {
                        setIsDeleteOpen(false);
                        router.back();
                      },
                    }
                  );
                }}>
                <Text>Remover</Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
