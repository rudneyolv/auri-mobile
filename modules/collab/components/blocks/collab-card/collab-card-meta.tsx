import { Separator } from '@/common/components/ui/separator';
import { Text } from '@/common/components/ui/text';
import { cn } from '@/common/utils/ui/cn';
import { View } from 'react-native';

interface CollabCardMetaRootProps extends React.PropsWithChildren {
  className?: string;
}

interface CollabCardMetaTextProps extends React.PropsWithChildren {
  className?: string;
}

export function CollabCardMetaRoot({ children, className }: CollabCardMetaRootProps) {
  if (!children) {
    return null;
  }

  return (
    <View className={cn('gap-3', className)}>
      <Separator />
      <View className="gap-1">{children}</View>
    </View>
  );
}

export function CollabCardMetaText({ children, className }: CollabCardMetaTextProps) {
  return <Text className={cn('text-sm text-muted-foreground', className)}>{children}</Text>;
}

CollabCardMetaRoot.displayName = 'CollabCardMetaRoot';
CollabCardMetaText.displayName = 'CollabCardMetaText';
