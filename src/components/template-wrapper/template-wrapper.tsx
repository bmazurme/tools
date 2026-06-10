import type { ReactNode } from 'react';
import { Skeleton } from '@gravity-ui/uikit';

interface Props {
  isLoading: boolean;
  children: () => ReactNode;
}

export default function TemplateWrapper({ isLoading, children }: Props) {
  if (isLoading) return <Skeleton className="layout-loader" />;
  return <>{children()}</>;
}
