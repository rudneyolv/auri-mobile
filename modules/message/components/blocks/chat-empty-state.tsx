import { Text } from '@/common/components/ui/text';
import { View } from 'react-native';

interface ChatEmptyStateProps {
  partnerName: string;
}

export function ChatEmptyState({ partnerName }: ChatEmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-2 px-8">
      <Text className="text-center text-lg font-semibold">
        Comece a conversar com {partnerName}
      </Text>
      <Text className="text-center text-sm text-muted-foreground">
        Envie a primeira mensagem para iniciar o chat.
      </Text>
    </View>
  );
}
