import { Card } from '@/common/components/ui/card';

export function DiscoveryCardRoot({ children }: React.PropsWithChildren) {
  return <Card className="gap-0">{children}</Card>;
}

DiscoveryCardRoot.displayName = 'DiscoveryCardRoot';
