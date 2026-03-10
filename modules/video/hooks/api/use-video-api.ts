import { ApiError } from '@/api';
import {
  getVideoById,
  getVideosByUserId,
  removeVideo,
  reorderVideos,
  updateVideo,
  uploadVideo,
} from '@/modules/video/api/video-api';
import {
  DeleteVideoPayload,
  ReorderVideosPayload,
  UpdateVideoPayload,
  UploadVideoPayload,
  VideoDeleteResponse,
} from '@/modules/video/types/video-api';
import { UserVideo } from '@/modules/video/types/video-entity';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetVideosByUserId({ userId }: { userId: string }) {
  return useQuery<UserVideo[], ApiError>({
    queryKey: ['videos', 'user', userId],
    queryFn: () => getVideosByUserId({ userId }),
    enabled: userId.length > 0,
  });
}

export function useGetVideoById({ videoId }: { videoId: string }) {
  return useQuery<UserVideo, ApiError>({
    queryKey: ['video', videoId],
    queryFn: () => getVideoById({ videoId }),
    enabled: videoId.length > 0,
  });
}

export function useUploadVideo() {
  const qc = useQueryClient();

  return useMutation<UserVideo, ApiError, UploadVideoPayload>({
    mutationFn: uploadVideo,
    onSuccess: (video) => {
      qc.invalidateQueries({ queryKey: ['videos', 'user', video.user_id] });
      qc.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}

export function useUpdateVideo() {
  const qc = useQueryClient();

  return useMutation<UserVideo, ApiError, UpdateVideoPayload>({
    mutationFn: updateVideo,
    onSuccess: (video) => {
      qc.invalidateQueries({ queryKey: ['videos', 'user', video.user_id] });
      qc.invalidateQueries({ queryKey: ['video', video.id] });
      qc.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}

export function useDeleteVideo() {
  const qc = useQueryClient();

  return useMutation<VideoDeleteResponse, ApiError, DeleteVideoPayload>({
    mutationFn: removeVideo,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['videos'] });
      qc.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}

export function useReorderVideos() {
  const qc = useQueryClient();

  return useMutation<UserVideo[], ApiError, ReorderVideosPayload>({
    mutationFn: reorderVideos,
    onSuccess: (videos) => {
      if (videos.length > 0) {
        qc.invalidateQueries({ queryKey: ['videos', 'user', videos[0].user_id] });
      } else {
        qc.invalidateQueries({ queryKey: ['videos'] });
      }
      qc.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}
