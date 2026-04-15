import { Children } from 'react';
import { View } from 'react-native';
import { useSkillsContext } from './skills-context';

export function DiscoveryCardSkillsList({ children }: React.PropsWithChildren) {
  const { expanded, defaultVisible } = useSkillsContext();
  const items = Children.toArray(children);
  const visibleItems = expanded ? items : items.slice(0, defaultVisible);

  if (items.length === 0) {
    return null;
  }

  return <View className="gap-2">{visibleItems}</View>;
}

DiscoveryCardSkillsList.displayName = 'DiscoveryCardSkillsList';
