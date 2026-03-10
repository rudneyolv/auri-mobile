import { UserVideo } from './video-entity';

export interface UploadVideoDto {
  title?: string;
  description?: string;
}

export interface UpdateVideoDto {
  title?: string;
  description?: string;
}

export interface ReorderVideosDto {
  video_ids: string[];
}

export interface ReorderVideosPayload {
  videoIds: string[];
}

export interface UpdateVideoPayload {
  videoId: string;
  dto: UpdateVideoDto;
}

export interface DeleteVideoPayload {
  videoId: string;
}

export interface UploadVideoPayload {
  asset: UploadableVideoAsset;
  dto: UploadVideoDto;
}

export interface UploadableVideoAsset {
  uri: string;
  fileName: string | null;
  mimeType: string | null;
  file: File | null;
}

export interface UploadVideoFile {
  uri: string;
  type: string;
  name: string;
}

export interface VideoDeleteResponse {
  success: boolean;
  message: string;
}

export type ReorderVideosResponse = UserVideo[];
