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
import { X } from 'lucide-react-native';
import { View } from 'react-native';
import { useRemoveCategory } from '@/modules/category/hooks/api/use-category-api';
import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';

interface RemoveCategoryProps {
  id: string;
  name?: string;
}

export function RemoveCategory({ id, name }: RemoveCategoryProps) {
  const [open, setOpen] = React.useState(false);

  const { mutate: removeCategory, isPending, error } = useRemoveCategory();

  const handleRemove = () => {
    removeCategory(id, {
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
          <DialogTitle>Remover categoria</DialogTitle>
        </DialogHeader>

        <View className="gap-4">
          <Text>
            Tem certeza que deseja remover a categoria{' '}
            <Text className="font-semibold">{name ?? 'esta categoria'}</Text>?
          </Text>
        </View>

        {error && <ApiErrorMessages messages={error.messages} />}

        <DialogFooter>
          <View className="flex-row gap-2">
            <DialogClose asChild>
              <Button className="flex-1" disabled={isPending} variant="secondary">
                <Text>Não</Text>
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
