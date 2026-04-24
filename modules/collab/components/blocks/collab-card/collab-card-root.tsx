import { Card } from '@/common/components/ui/card';
import { cn } from '@/common/utils/ui/cn';

interface CollabCardRootProps extends React.PropsWithChildren {
  className?: string;
}

export function CollabCardRoot({ children, className }: CollabCardRootProps) {
  return <Card className={cn('gap-0', className)}>{children}</Card>;
}

CollabCardRoot.displayName = 'CollabCardRoot';
