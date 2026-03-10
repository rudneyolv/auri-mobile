import { ImagePickerAsset } from 'expo-image-picker';

export interface SelectedVideoAsset extends ImagePickerAsset {
  previewUri: string;
}

export interface VideoUploadFormValues {
  title: string;
  description: string;
  asset: SelectedVideoAsset | null;
}

export interface VideoEditFormValues {
  title: string;
  description: string;
}
