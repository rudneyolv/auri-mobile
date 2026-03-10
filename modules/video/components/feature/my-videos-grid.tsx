import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Button } from '@/common/components/ui/button';
import { Card } from '@/common/components/ui/card';
import { Text } from '@/common/components/ui/text';
import { VIDEO_CONSTRAINTS } from '@/modules/video/constants/video';
import { useGetVideosByUserId } from '@/modules/video/hooks/api/use-video-api';
import { UserVideo } from '@/modules/video/types/video-entity';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

function VideoTile({ video, onPress }: { video: UserVideo; onPress: () => void }) {
  return (
    <Pressable className="m-1 flex-1 rounded-lg border border-border bg-card p-3" onPress={onPress}>
      <View className="mb-6 h-20 rounded-md bg-black/90" />
      <Text className="text-sm font-semibold">{video.title ?? 'Sem titulo'}</Text>
      <Text className="text-xs text-muted-foreground">{video.duration}s</Text>
    </Pressable>
  );
}

export function MyVideosGrid({ userId }: { userId: string }) {
  const router = useRouter();
  const { data: videos, isLoading, error } = useGetVideosByUserId({ userId });

  const orderedVideos = videos ?? [];

  const handleOpenAddVideo = () => {
    router.push('/my-profile/add-video');
  };

  if (isLoading) {
    return (
      <Card className="p-4">
        <Text>Carregando videos...</Text>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4">
        <Text className="mb-2 font-semibold">Meus videos</Text>
        <ApiErrorMessages messages={error.messages} />
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-semibold">
          Meus videos ({orderedVideos.length}/{VIDEO_CONSTRAINTS.MAX_VIDEOS_PER_USER})
        </Text>
        <Button
          size="sm"
          variant="outline"
          onPress={handleOpenAddVideo}
          disabled={orderedVideos.length >= VIDEO_CONSTRAINTS.MAX_VIDEOS_PER_USER}>
          <Plus size={16} />
          <Text>Adicionar</Text>
        </Button>
      </View>

      {orderedVideos.length === 0 ? (
        <Text className="text-sm text-muted-foreground">Nenhum video cadastrado.</Text>
      ) : (
        <View className="gap-2">
          <View className="flex-row flex-wrap">
            {orderedVideos.map((video) => (
              <View key={video.id} className="w-1/3">
                <VideoTile
                  video={video}
                  onPress={() => router.push(`/my-profile/my-videos/${video.id}`)}
                />
              </View>
            ))}
          </View>

          <Button variant="ghost" onPress={() => router.push('/my-profile/my-videos')}>
            <Text>Ver todos os videos</Text>
          </Button>
        </View>
      )}
    </Card>
  );
}
