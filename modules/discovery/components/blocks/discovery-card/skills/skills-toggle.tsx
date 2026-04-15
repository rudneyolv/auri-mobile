import { Button } from '@/common/components/ui/button';
import { Text } from '@/common/components/ui/text';
import { useSkillsContext } from './skills-context';

export function DiscoveryCardSkillsToggle() {
  const { expanded, toggle, defaultVisible, totalCount } = useSkillsContext();

  if (totalCount <= defaultVisible) {
    return null;
  }

  return (
    <Button variant="link" size="sm" className="h-auto self-start px-0 py-0" onPress={toggle}>
      <Text>{expanded ? 'Ver menos' : `Ver mais ${totalCount - defaultVisible} skills`}</Text>
    </Button>
  );
}

DiscoveryCardSkillsToggle.displayName = 'DiscoveryCardSkillsToggle';
