import { Button } from '@/common/components/ui/button';
import { Text } from '@/common/components/ui/text';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Video from 'react-native-video';

interface VideoPlayerProps {
  sourceUri: string;
  aspectRatio?: number;
  resizeMode?: 'contain' | 'cover';
  shouldAutoPlay?: boolean;
}

export function VideoPlayer({
  sourceUri,
  aspectRatio,
  resizeMode = 'contain',
  shouldAutoPlay = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(shouldAutoPlay);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View
      className="overflow-hidden rounded-xl border border-border bg-black"
      style={aspectRatio ? { aspectRatio } : { minHeight: 360 }}>
      <Video
        source={{ uri: sourceUri }}
        paused={!isPlaying}
        controls
        resizeMode={resizeMode}
        onLoad={() => setIsLoading(false)}
        onBuffer={({ isBuffering }) => setIsLoading(isBuffering)}
        onEnd={() => setIsPlaying(false)}
        style={{ width: '100%', height: '100%' }}
      />

      {isLoading && (
        <View className="absolute inset-0 items-center justify-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}

      {!isPlaying && !isLoading && (
        <View className="absolute inset-0 items-center justify-center bg-black/35">
          <Button size="sm" variant="secondary" onPress={() => setIsPlaying(true)}>
            <Text>Reproduzir</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
