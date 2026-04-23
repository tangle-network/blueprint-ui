import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { cn } from '../../utils';

type Action = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: React.ComponentProps<typeof Button>['variant'];
  disabled?: boolean;
};

export type BlueprintHostHeroProps = {
  title: string;
  tagline?: string;
  description?: string;
  badges?: string[];
  actions?: Action[];
  children?: React.ReactNode;
  className?: string;
};

export function BlueprintHostHero({
  title,
  tagline,
  description,
  badges = [],
  actions = [],
  children,
  className,
}: BlueprintHostHeroProps) {
  return (
    <Card className={cn('rounded-3xl border-bp-elements-borderColor/70 bg-bp-elements-background-depth-2', className)}>
      <CardHeader className="space-y-4">
        {badges.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
        ) : null}
        <div className="space-y-2">
          <CardTitle className="text-3xl">{title}</CardTitle>
          {tagline ? (
            <CardDescription className="text-base text-bp-elements-textPrimary/80">
              {tagline}
            </CardDescription>
          ) : null}
        </div>
        {description ? (
          <p className="max-w-3xl text-sm leading-6 text-bp-elements-textSecondary">
            {description}
          </p>
        ) : null}
      </CardHeader>
      {(actions.length > 0 || children) && (
        <CardContent className="space-y-4">
          {actions.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {actions.map((action) => {
                const button = (
                  <Button
                    key={action.label}
                    variant={action.variant ?? 'default'}
                    onClick={action.onClick}
                    disabled={action.disabled}
                  >
                    {action.label}
                  </Button>
                );

                return action.href ? (
                  <a key={action.label} href={action.href}>
                    {button}
                  </a>
                ) : (
                  button
                );
              })}
            </div>
          ) : null}
          {children}
        </CardContent>
      )}
    </Card>
  );
}
