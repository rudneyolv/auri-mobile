import { CardContent } from '@/common/components/ui/card';

export function DiscoveryCardContent({ children }: React.PropsWithChildren) {
  return <CardContent className="gap-4">{children}</CardContent>;
}

DiscoveryCardContent.displayName = 'DiscoveryCardContent';
