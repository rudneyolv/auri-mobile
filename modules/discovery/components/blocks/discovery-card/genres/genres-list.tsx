import { Children } from 'react';
import { View } from 'react-native';

export function DiscoveryCardGenresList({ children }: React.PropsWithChildren) {
  if (Children.count(children) === 0) {
    return null;
  }

  return <View className="flex-row flex-wrap gap-2">{children}</View>;
}

DiscoveryCardGenresList.displayName = 'DiscoveryCardGenresList';
