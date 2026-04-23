import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';

declare const buttonVariants: (props?: ({
    variant?: "default" | "link" | "success" | "secondary" | "destructive" | "outline" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Button({ className, variant, size, asChild, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;

type Action = {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: React.ComponentProps<typeof Button>['variant'];
    disabled?: boolean;
};
type BlueprintHostHeroProps = {
    title: string;
    tagline?: string;
    description?: string;
    badges?: string[];
    actions?: Action[];
    children?: React.ReactNode;
    className?: string;
};
declare function BlueprintHostHero({ title, tagline, description, badges, actions, children, className, }: BlueprintHostHeroProps): react_jsx_runtime.JSX.Element;

type BlueprintHostPanelProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
};
declare function BlueprintHostPanel({ title, children, className, }: BlueprintHostPanelProps): react_jsx_runtime.JSX.Element;

export { BlueprintHostHero as B, type BlueprintHostHeroProps as a, BlueprintHostPanel as b, type BlueprintHostPanelProps as c, Button as d, buttonVariants as e };
