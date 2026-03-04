import React from 'react';
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
import { Icon } from '@/common/components/ui/icon';
import { Text } from '@/common/components/ui/text';
import { useRemoveGenre } from '@/modules/genre/hooks/api/use-genre-api';
import { X } from 'lucide-react-native';
import { View } from 'react-native';

interface RemoveGenreProps {
  id: string;
  name?: string;
}

export function RemoveGenre({ id, name }: RemoveGenreProps) {
  const [open, setOpen] = React.useState(false);

  const { mutate: removeGenre, isPending } = useRemoveGenre();

  const handleRemove = () => {
    removeGenre(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="size-7">
          <Icon as={X} className="size-4 text-destructive" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Remover genero</DialogTitle>
        </DialogHeader>

        <View className="gap-4">
          <Text>
            Tem certeza que deseja remover o genero{' '}
            <Text className="font-semibold">{name ?? 'este genero'}</Text>?
          </Text>
        </View>

        <DialogFooter className="mt-4 flex-row gap-2">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
