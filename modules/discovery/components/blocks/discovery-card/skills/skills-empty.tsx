import { Text } from '@/common/components/ui/text';
import { useSkillsContext } from './skills-context';

export function DiscoveryCardSkillsEmpty() {
  const { totalCount } = useSkillsContext();

  if (totalCount > 0) {
    return null;
  }

  return <Text className="text-sm text-muted-foreground">Nenhuma skill informada</Text>;
}

DiscoveryCardSkillsEmpty.displayName = 'DiscoveryCardSkillsEmpty';
