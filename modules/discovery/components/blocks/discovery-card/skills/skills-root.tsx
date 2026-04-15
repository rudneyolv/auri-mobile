import { Text } from '@/common/components/ui/text';
import { Children, isValidElement, type ReactElement, useMemo, useState } from 'react';
import { View } from 'react-native';
import { SkillsContext } from './skills-context';
import { DiscoveryCardSkillsList } from './skills-list';

interface DiscoveryCardSkillsRootProps extends React.PropsWithChildren {
  defaultVisible?: number;
}

function isSkillsListElement(child: unknown): child is ReactElement<React.PropsWithChildren> {
  return isValidElement(child) && child.type === DiscoveryCardSkillsList;
}

export function DiscoveryCardSkillsRoot({
  children,
  defaultVisible = 3,
}: DiscoveryCardSkillsRootProps) {
  const [expanded, setExpanded] = useState(false);
  const childrenArray = Children.toArray(children);

  const totalCount = useMemo(() => {
    const listChild = childrenArray.find(isSkillsListElement);

    if (!listChild) {
      return 0;
    }

    return Children.count(listChild.props.children);
  }, [childrenArray]);

  return (
    <SkillsContext.Provider
      value={{
        expanded,
        toggle: () => setExpanded((currentState) => !currentState),
        defaultVisible,
        totalCount,
      }}>
      <View className="gap-2">
        <Text className="text-sm font-semibold">Skills</Text>
        {children}
      </View>
    </SkillsContext.Provider>
  );
}

DiscoveryCardSkillsRoot.displayName = 'DiscoveryCardSkillsRoot';
