import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';
import { CardTitle } from '@/common/components/ui/card';
import { Text } from '@/common/components/ui/text';
import { View } from 'react-native';

interface DiscoveryCardAvatarProps {
  name: string;
  imageUrl: string | null;
}

export function DiscoveryCardAvatar({ name, imageUrl }: DiscoveryCardAvatarProps) {
  return (
    <View className="flex-row items-center gap-4">
      <Avatar className="size-16" alt={name}>
        <AvatarImage src={imageUrl ?? undefined} />
        <AvatarFallback>
          <Text className="text-lg font-semibold">{name.charAt(0).toUpperCase()}</Text>
        </AvatarFallback>
      </Avatar>

      <CardTitle>{name}</CardTitle>
    </View>
  );
}

DiscoveryCardAvatar.displayName = 'DiscoveryCardAvatar';
