import { Text } from '@/common/components/ui/text';
import { View } from 'react-native';

export function DiscoveryCardGenresRoot({ children }: React.PropsWithChildren) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-semibold">Gêneros</Text>
      {children}
    </View>
  );
}

DiscoveryCardGenresRoot.displayName = 'DiscoveryCardGenresRoot';
