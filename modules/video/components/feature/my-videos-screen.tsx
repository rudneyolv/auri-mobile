import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Card } from '@/common/components/ui/card';
import { Text } from '@/common/components/ui/text';
import { useGetVideosByUserId } from '@/modules/video/hooks/api/use-video-api';
import { formatVideoTime } from '@/modules/video/utils/video-format';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';

interface MyVideosScreenProps {
  userId: string;
}

const THUMBNAIL_ASPECT_RATIO = 9 / 16;

export function MyVideosScreen({ userId }: MyVideosScreenProps) {
  const router = useRouter();
  const { data: videos, isLoading, error } = useGetVideosByUserId({ userId });

  const orderedVideos = videos ?? [];

  if (isLoading) {
    return <Text>Carregando videos...</Text>;
  }

  if (error) {
    return <ApiErrorMessages messages={error.messages} />;
  }

  return (
    <View className="flex-1">
      <FlatList
        data={orderedVideos}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        ListEmptyComponent={
          <Card className="p-4">
            <Text className="text-sm text-muted-foreground">Nenhum video cadastrado.</Text>
          </Card>
        }
        renderItem={({ item }) => (
          <View className="flex-1">
            <Pressable
              onPress={() => {
                router.push(`/my-profile/my-videos/${item.id}`);
              }}
              className="overflow-hidden rounded-2xl border border-border bg-card">
              <View className="bg-muted" style={{ aspectRatio: THUMBNAIL_ASPECT_RATIO }}>
                {item.thumbnail_url ? (
                  <Image
                    source={{ uri: item.thumbnail_url }}
                    resizeMode="cover"
                    className="h-full w-full"
                  />
                ) : (
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-xs text-muted-foreground">Sem thumbnail</Text>
                  </View>
                )}
                <View className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5">
                  <Text className="text-[10px] font-semibold text-white">
                    {formatVideoTime({ totalSeconds: item.duration })}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        )}
      />

    </View>
  );
}
