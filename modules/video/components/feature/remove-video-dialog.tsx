import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Button } from '@/common/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common/components/ui/dialog';
import { Text } from '@/common/components/ui/text';
import { useDeleteVideo } from '@/modules/video/hooks/api/use-video-api';
import React from 'react';
import { View } from 'react-native';

interface RemoveVideoDialogProps {
  videoId: string;
  videoTitle?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function RemoveVideoDialog({
  videoId,
  videoTitle,
  open,
  onOpenChange,
  onSuccess,
}: RemoveVideoDialogProps) {
  const { mutate: deleteVideo, isPending, error } = useDeleteVideo();

  const handleRemove = () => {
    deleteVideo(
      { videoId },
      {
        onSuccess: () => {
          onOpenChange(false);
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Remover video</DialogTitle>
        </DialogHeader>

        <View className="gap-4">
          <Text>
            Tem certeza que deseja remover o video{' '}
            <Text className="font-semibold">{videoTitle ?? 'este video'}</Text>?
          </Text>
        </View>

        <ApiErrorMessages messages={error?.messages} />

        <DialogFooter>
          <View className="flex-row gap-2">
            <DialogClose asChild>
              <Button className="flex-1" disabled={isPending} variant="secondary">
                <Text>Nao</Text>
              </Button>
            </DialogClose>

            <Button
              variant="destructive"
              className="flex-1"
              disabled={isPending}
              onPress={handleRemove}>
              <Text>{isPending ? 'Removendo...' : 'Sim'}</Text>
            </Button>
          </View>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
