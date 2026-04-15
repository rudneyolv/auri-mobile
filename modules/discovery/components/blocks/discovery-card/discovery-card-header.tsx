import { CardHeader } from '@/common/components/ui/card';

export function DiscoveryCardHeader({ children }: React.PropsWithChildren) {
  return <CardHeader className="gap-3 pb-4">{children}</CardHeader>;
}

DiscoveryCardHeader.displayName = 'DiscoveryCardHeader';
