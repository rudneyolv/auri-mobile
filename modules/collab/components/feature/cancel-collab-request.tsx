import React from 'react';
import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Button } from '@/common/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';
import { Text } from '@/common/components/ui/text';
import { useCancelCollabRequest } from '@/modules/collab/hooks/api/use-collab-api';
import { View } from 'react-native';

interface CancelCollabRequestProps {
  requestId: string;
}

export function CancelCollabRequest({ requestId }: CancelCollabRequestProps) {
  const [open, setOpen] = React.useState(false);
  const { mutate: cancelRequest, isPending, error } = useCancelCollabRequest();

  const handleCancelRequest = () => {
    cancelRequest(requestId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <View className="gap-2">
        <DialogTrigger asChild>
          <Button variant="secondary" disabled={isPending} className="flex-1">
            <Text>{isPending ? 'Cancelando...' : 'Cancelar'}</Text>
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Cancelar solicitação</DialogTitle>
          </DialogHeader>

          <View className="gap-4">
            <Text>Tem certeza que deseja cancelar esta solicitação de collab?</Text>
          </View>

          <ApiErrorMessages messages={error?.messages} />

          <DialogFooter>
            <View className="flex-row gap-2">
              <DialogClose asChild>
                <Button className="flex-1" disabled={isPending} variant="secondary">
                  <Text>Voltar</Text>
                </Button>
              </DialogClose>

              <Button
                variant="destructive"
                className="flex-1"
                disabled={isPending}
                onPress={handleCancelRequest}>
                <Text>{isPending ? 'Cancelando...' : 'Confirmar'}</Text>
              </Button>
            </View>
          </DialogFooter>
        </DialogContent>
      </View>
    </Dialog>
  );
}
