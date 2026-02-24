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

interface RemoveSkillProps {
  id: string;
  name?: string;
  onRemove: (id: string) => void;
  isLoading?: boolean;
}

export function RemoveSkill({ id, name, onRemove, isLoading }: RemoveSkillProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="size-7">
          <Icon as={X} className="size-4 text-destructive" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Remover habilidade</DialogTitle>
        </DialogHeader>

        <View className="gap-4">
          <Text>
            Tem certeza que deseja remover a habilidade{' '}
            <Text className="font-semibold">{name ?? 'esta habilidade'}</Text>?
          </Text>
        </View>

        <DialogFooter className="mt-4 flex-row gap-2">
          <DialogClose asChild>
            <Button className="flex-1" disabled={isLoading} variant="secondary">
              <Text>Não</Text>
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            className="flex-1"
            disabled={isLoading}
            onPress={() => onRemove(id)}>
            <Text>Sim</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
