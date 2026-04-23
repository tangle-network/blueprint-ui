import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../utils';

export type BlueprintHostPanelProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function BlueprintHostPanel({
  title,
  children,
  className,
}: BlueprintHostPanelProps) {
  return (
    <Card className={cn('rounded-3xl border-bp-elements-borderColor/70 bg-bp-elements-background-depth-2', className)}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
