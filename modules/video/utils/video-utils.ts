import { VIDEO_MIME_TYPE_OPTIONS } from '@/modules/video/array-enums/vidoe-enums';
import { UploadVideoDto } from '@/modules/video/types/video-api';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SelectedVideoAsset } from '@/modules/video/types/video-form';

export function resolveMimeType({ mimeType }: { mimeType: string | null }) {
  if (!mimeType) {
    return VIDEO_MIME_TYPE_OPTIONS[0];
  }

  if (mimeType === 'video/quicktime') {
    return 'video/mov';
  }

  return mimeType;
}

export function resolveFileName({ fileName }: { fileName: string | null }) {
  if (fileName && fileName.trim().length > 0) {
    return fileName;
  }

  return `video-${Date.now()}.mp4`;
}

export function appendOptionalFieldToFormData({
  formData,
  fieldName,
  value,
}: {
  formData: FormData;
  fieldName: keyof UploadVideoDto;
  value: string | undefined;
}) {
  if (!value || value.trim().length === 0) {
    return;
  }

  formData.append(fieldName, value.trim());
}

export function normalizeDurationToSeconds({ duration }: { duration: number | null | undefined }) {
  if (typeof duration !== 'number' || duration <= 0) {
    return null;
  }

  // Alguns ambientes retornam milissegundos, outros segundos.
  const isMilliseconds = duration > 1000;
  const seconds = isMilliseconds ? duration / 1000 : duration;

  return Math.floor(seconds);
}

export function normalizeMimeType({ mimeType }: { mimeType: string | null | undefined }) {
  if (mimeType === 'video/quicktime') {
    return 'video/mov';
  }

  return mimeType ?? null;
}

export function isBlobPreviewUri({ previewUri }: { previewUri: string }) {
  return previewUri.startsWith('blob:');
}

export function revokePreviewUri({ previewUri }: { previewUri: string | null | undefined }) {
  if (Platform.OS !== 'web' || !previewUri || !isBlobPreviewUri({ previewUri })) {
    return;
  }

  URL.revokeObjectURL(previewUri);
}

export function createSelectedVideoAsset({
  asset,
}: {
  asset: ImagePicker.ImagePickerAsset;
}): SelectedVideoAsset {
  const previewUri =
    Platform.OS === 'web' && asset.file ? URL.createObjectURL(asset.file) : asset.uri;

  return {
    ...asset,
    previewUri,
  };
}

export function resolvePreviewAspectRatio({ asset }: { asset: SelectedVideoAsset | null }) {
  if (!asset) {
    return undefined;
  }

  if (asset.width > 0 && asset.height > 0) {
    return asset.width / asset.height;
  }

  return undefined;
}
