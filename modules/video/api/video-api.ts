import { apiRequest } from '@/api';
import {
  DeleteVideoPayload,
  ReorderVideosDto,
  ReorderVideosPayload,
  ReorderVideosResponse,
  UpdateVideoPayload,
  UploadVideoFile,
  UploadVideoPayload,
  VideoDeleteResponse,
} from '@/modules/video/types/video-api';
import { UserVideo } from '@/modules/video/types/video-entity';
import {
  appendOptionalFieldToFormData,
  resolveFileName,
  resolveMimeType,
} from '@/modules/video/utils/video-utils';

export async function getVideosByUserId({ userId }: { userId: string }) {
  return apiRequest<UserVideo[]>({
    endpoint: `profiles/${userId}/videos`,
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function getVideoById({ videoId }: { videoId: string }) {
  return apiRequest<UserVideo>({
    endpoint: `videos/${videoId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function uploadVideo({ asset, dto }: UploadVideoPayload) {
  const formData = new FormData();

  if (asset.file) {
    formData.append('file', asset.file, resolveFileName({ fileName: asset.fileName }));
  } else {
    const uploadFile: UploadVideoFile = {
      uri: asset.uri,
      type: resolveMimeType({ mimeType: asset.mimeType }),
      name: resolveFileName({ fileName: asset.fileName }),
    };

    formData.append('file', uploadFile as unknown as Blob);
  }
  appendOptionalFieldToFormData({
    formData,
    fieldName: 'title',
    value: dto.title,
  });
  appendOptionalFieldToFormData({
    formData,
    fieldName: 'description',
    value: dto.description,
  });

  return apiRequest<UserVideo>({
    endpoint: 'videos/upload',
    requiresAuth: true,
    requestConfig: {
      method: 'POST',
      body: formData,
    },
  });
}

export async function updateVideo({ videoId, dto }: UpdateVideoPayload) {
  return apiRequest<UserVideo>({
    endpoint: `videos/${videoId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'PATCH',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
}

export async function removeVideo({ videoId }: DeleteVideoPayload) {
  return apiRequest<VideoDeleteResponse>({
    endpoint: `videos/${videoId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'DELETE',
    },
  });
}

export async function reorderVideos({ videoIds }: ReorderVideosPayload) {
  const dto: ReorderVideosDto = {
    video_ids: videoIds,
  };

  return apiRequest<ReorderVideosResponse>({
    endpoint: 'videos/reorder',
    requiresAuth: true,
    requestConfig: {
      method: 'PATCH',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
}
