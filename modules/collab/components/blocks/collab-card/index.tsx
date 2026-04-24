import { CardContent } from '@/common/components/ui/card';
import { cn } from '@/common/utils/ui/cn';
import { CollabCardActions } from './collab-card-actions';
import { CollabCardAvatar } from './collab-card-avatar';
import { CollabCardCategory } from './collab-card-category';
import { CollabCardHeader } from './collab-card-header';
import { CollabCardMetaRoot, CollabCardMetaText } from './collab-card-meta';
import { CollabCardRoot } from './collab-card-root';
import { CollabCardStatus } from './collab-card-status';

function CollabCardContent({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <CardContent className={cn('gap-4', className)}>{children}</CardContent>;
}

CollabCardContent.displayName = 'CollabCardContent';

export const CollabCard = {
  Root: CollabCardRoot,
  Header: CollabCardHeader,
  Content: CollabCardContent,
  Avatar: CollabCardAvatar,
  Category: CollabCardCategory,
  Meta: {
    Root: CollabCardMetaRoot,
    Text: CollabCardMetaText,
  },
  Status: CollabCardStatus,
  Actions: CollabCardActions,
};
