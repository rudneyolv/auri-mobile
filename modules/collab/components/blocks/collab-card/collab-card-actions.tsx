import { Separator } from '@/common/components/ui/separator';
import { cn } from '@/common/utils/ui/cn';
import { View } from 'react-native';

interface CollabCardActionsProps extends React.PropsWithChildren {
  className?: string;
}

export function CollabCardActions({ children, className }: CollabCardActionsProps) {
  if (!children) {
    return null;
  }

  return (
    <View className="gap-3">
      <Separator />
      <View className={cn('flex-row flex-wrap gap-2', className)}>{children}</View>
    </View>
  );
}

CollabCardActions.displayName = 'CollabCardActions';
