import { Button } from '@/common/components/ui/button';
import { Text } from '@/common/components/ui/text';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export function ConversationsEmptyState() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4 px-8">
      <Text className="text-center text-lg font-semibold">Nenhuma conversa ainda</Text>
      <Text className="text-center text-sm text-muted-foreground">
        Aceite um collab para começar a conversar com outros artistas.
      </Text>
      <Button onPress={() => router.push('/(tabs)')}>
        <Text>Encontrar pessoas</Text>
      </Button>
    </View>
  );
}
