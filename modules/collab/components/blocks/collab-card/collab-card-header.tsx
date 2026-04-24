import { CardHeader } from '@/common/components/ui/card';
import { cn } from '@/common/utils/ui/cn';

interface CollabCardHeaderProps extends React.PropsWithChildren {
  className?: string;
}

export function CollabCardHeader({ children, className }: CollabCardHeaderProps) {
  return <CardHeader className={cn('gap-3 pb-4', className)}>{children}</CardHeader>;
}

CollabCardHeader.displayName = 'CollabCardHeader';
