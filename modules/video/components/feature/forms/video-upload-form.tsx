import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Alert, Platform, Pressable, View } from 'react-native';
import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Text } from '@/common/components/ui/text';
import { Textarea } from '@/common/components/ui/textarea';
import { VIDEO_CONSTRAINTS } from '@/modules/video/constants/video';
import { VideoPlayer } from '@/modules/video/components/feature/video-player';
import { VideoUploadSchema } from '@/modules/video/schemas/video-upload-schema';
import { VideoUploadFormValues } from '@/modules/video/types/video-form';
import { VIDEO_MIME_TYPE_OPTIONS, VideoMimeType } from '@/modules/video/types/video-enums';
import { formatFileSize, formatVideoTime } from '@/modules/video/utils/video-format';
import { useUploadVideo } from '@/modules/video/hooks/api/use-video-api';
import {
  createSelectedVideoAsset,
  normalizeDurationToSeconds,
  normalizeMimeType,
  resolvePreviewAspectRatio,
  revokePreviewUri,
} from '@/modules/video/utils/video-utils';

interface VideoUploadFormProps {
  currentVideoCount: number;
  onSuccess: () => void;
}

function resolveVideoValidationMessage({
  asset,
  currentVideoCount,
}: {
  asset: ImagePicker.ImagePickerAsset;
  currentVideoCount: number;
}) {
  if (currentVideoCount >= VIDEO_CONSTRAINTS.MAX_VIDEOS_PER_USER) {
    return `Voce ja atingiu o limite de ${VIDEO_CONSTRAINTS.MAX_VIDEOS_PER_USER} videos.`;
  }

  const durationInSeconds = normalizeDurationToSeconds({
    duration: asset.duration,
  });

  if (durationInSeconds !== null) {
    if (
      durationInSeconds < VIDEO_CONSTRAINTS.MIN_DURATION ||
      durationInSeconds > VIDEO_CONSTRAINTS.MAX_DURATION
    ) {
      return `Video deve ter entre ${VIDEO_CONSTRAINTS.MIN_DURATION}s e ${VIDEO_CONSTRAINTS.MAX_DURATION}s.`;
    }
  }

  if (typeof asset.fileSize === 'number' && asset.fileSize > 0) {
    if (asset.fileSize > VIDEO_CONSTRAINTS.MAX_FILE_SIZE) {
      return `Video nao pode exceder ${formatFileSize({ bytes: VIDEO_CONSTRAINTS.MAX_FILE_SIZE })}.`;
    }
  }

  const normalizedMimeType = normalizeMimeType({ mimeType: asset.mimeType });
  const isAllowedMimeType = VIDEO_MIME_TYPE_OPTIONS.some(
    (mimeTypeOption: VideoMimeType) => mimeTypeOption === normalizedMimeType
  );

  if (normalizedMimeType && !isAllowedMimeType) {
    return 'Formato de video invalido.';
  }

  return null;
}

async function pickFromLibrary() {
  if (Platform.OS !== 'web') {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      throw new Error('Permissao da galeria negada.');
    }
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['videos'],
    quality: 1,
    allowsEditing: false,
  });

  if (result.canceled) {
    return null;
  }

  return result.assets[0] ?? null;
}

async function pickFromCamera() {
  if (Platform.OS !== 'web') {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      throw new Error('Permissao da camera negada.');
    }
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ['videos'],
    quality: 1,
    allowsEditing: false,
  });

  if (result.canceled) {
    return null;
  }

  return result.assets[0] ?? null;
}

export function VideoUploadForm({ currentVideoCount, onSuccess }: VideoUploadFormProps) {
  const form = useForm<VideoUploadFormValues>({
    resolver: zodResolver(VideoUploadSchema),
    defaultValues: {
      title: '',
      description: '',
      asset: null,
    },
    mode: 'onChange',
  });

  const { mutate: uploadVideo, isPending, error } = useUploadVideo();
  const selectedAsset = useWatch({ control: form.control, name: 'asset' });
  const watchedTitle = useWatch({ control: form.control, name: 'title' });
  const watchedDescription = useWatch({ control: form.control, name: 'description' });

  const handleValidationFeedback = ({ message }: { message: string }) => {
    if (Platform.OS === 'web') {
      form.setError('asset', { message });
      return;
    }

    Alert.alert('Video invalido', message);
  };

  const handleSelectFromLibrary = async () => {
    try {
      const asset = await pickFromLibrary();
      if (!asset) {
        return;
      }

      const validationMessage = resolveVideoValidationMessage({
        asset,
        currentVideoCount,
      });

      if (validationMessage) {
        handleValidationFeedback({ message: validationMessage });
        return;
      }

      const currentPreviewUri = form.getValues('asset')?.previewUri;
      revokePreviewUri({ previewUri: currentPreviewUri });

      const selectedVideoAsset = createSelectedVideoAsset({ asset });
      form.clearErrors('asset');
      form.setValue('asset', selectedVideoAsset, { shouldValidate: true });
    } catch (selectionError) {
      const message =
        selectionError instanceof Error ? selectionError.message : 'Falha ao abrir a galeria.';
      Alert.alert('Erro', message);
    }
  };

  const handleSelectFromCamera = async () => {
    try {
      const asset = await pickFromCamera();
      if (!asset) {
        return;
      }

      const validationMessage = resolveVideoValidationMessage({
        asset,
        currentVideoCount,
      });
      if (validationMessage) {
        handleValidationFeedback({ message: validationMessage });
        return;
      }

      const currentPreviewUri = form.getValues('asset')?.previewUri;
      revokePreviewUri({ previewUri: currentPreviewUri });

      const selectedVideoAsset = createSelectedVideoAsset({ asset });
      form.clearErrors('asset');
      form.setValue('asset', selectedVideoAsset, { shouldValidate: true });
    } catch (selectionError) {
      const message =
        selectionError instanceof Error ? selectionError.message : 'Falha ao abrir a camera.';
      Alert.alert('Erro', message);
    }
  };

  const handleOpenSourcePicker = () => {
    if (Platform.OS === 'web') {
      void handleSelectFromLibrary();
      return;
    }

    Alert.alert('Selecionar video', 'Escolha a origem do video', [
      { text: 'Galeria', onPress: () => void handleSelectFromLibrary() },
      { text: 'Camera', onPress: () => void handleSelectFromCamera() },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleUpload = (values: VideoUploadFormValues) => {
    if (!values.asset) {
      return;
    }

    uploadVideo(
      {
        asset: {
          uri: values.asset.uri,
          fileName: values.asset.fileName ?? null,
          mimeType: values.asset.mimeType ?? null,
          file: values.asset.file ?? null,
        },
        dto: {
          title: values.title.trim() || undefined,
          description: values.description.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          revokePreviewUri({ previewUri: values.asset?.previewUri });
          form.reset();
          onSuccess();
        },
      }
    );
  };

  const hasAsset = !!selectedAsset;
  const previewAspectRatio = resolvePreviewAspectRatio({ asset: selectedAsset });
  const selectedDurationSeconds =
    normalizeDurationToSeconds({
      duration: selectedAsset?.duration,
    }) ?? 0;

  return (
    <View className="gap-4">
      {!hasAsset ? (
        <Pressable
          onPress={handleOpenSourcePicker}
          className="h-52 items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted/20">
          <Text className="text-sm text-muted-foreground">Toque para selecionar um video</Text>
        </Pressable>
      ) : (
        <View className="gap-3 overflow-hidden rounded-xl border border-border bg-muted/20 p-3">
          <VideoPlayer
            sourceUri={selectedAsset.previewUri}
            aspectRatio={previewAspectRatio}
            resizeMode="contain"
          />
          <Button variant="outline" onPress={handleOpenSourcePicker}>
            <Text>Trocar video</Text>
          </Button>
        </View>
      )}

      {form.formState.errors.asset?.message && (
        <Text className="text-sm text-destructive">{form.formState.errors.asset.message}</Text>
      )}

      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <View className="gap-1.5">
            <Input
              placeholder="Titulo (opcional)"
              editable={!isPending}
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
              placeholder="Descricao (opcional)"
              editable={!isPending}
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

      {hasAsset && (
        <View className="rounded-lg border border-border bg-card p-3">
          <Text className="text-sm text-muted-foreground">
            Duracao: {formatVideoTime({ totalSeconds: selectedDurationSeconds })}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Tamanho: {formatFileSize({ bytes: selectedAsset.fileSize ?? 0 })}
          </Text>
          <Text className="text-sm text-muted-foreground">
            Videos: {currentVideoCount}/{VIDEO_CONSTRAINTS.MAX_VIDEOS_PER_USER}
          </Text>
        </View>
      )}

      <ApiErrorMessages messages={error?.messages} />

      <Button
        disabled={isPending || !form.formState.isValid}
        onPress={form.handleSubmit(handleUpload)}>
        <Text>{isPending ? 'Enviando...' : 'Fazer upload'}</Text>
      </Button>
    </View>
  );
}
