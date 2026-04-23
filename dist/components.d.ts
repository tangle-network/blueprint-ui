import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React$1 from 'react';
import { ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';
export { B as BlueprintHostHero, b as BlueprintHostPanel, d as Button, e as buttonVariants } from './BlueprintHostPanel-6iVEh-f1.js';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { Address } from 'viem';
import { Config } from 'wagmi';
import { b as JobFieldDef, J as JobDefinition } from './registry-JhwB9BPD.js';

declare const badgeVariants: (props?: ({
    variant?: "default" | "success" | "secondary" | "destructive" | "outline" | "accent" | "amber" | "running" | "stopped" | "cold" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Badge({ className, variant, asChild, ...props }: React$1.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;

declare function Card({ className, ...props }: React$1.ComponentProps<'div'>): react_jsx_runtime.JSX.Element;
declare function CardHeader({ className, ...props }: React$1.ComponentProps<'div'>): react_jsx_runtime.JSX.Element;
declare function CardTitle({ className, ...props }: React$1.ComponentProps<'div'>): react_jsx_runtime.JSX.Element;
declare function CardDescription({ className, ...props }: React$1.ComponentProps<'div'>): react_jsx_runtime.JSX.Element;
declare function CardContent({ className, ...props }: React$1.ComponentProps<'div'>): react_jsx_runtime.JSX.Element;
declare function CardFooter({ className, ...props }: React$1.ComponentProps<'div'>): react_jsx_runtime.JSX.Element;

declare function Dialog({ ...props }: React$1.ComponentProps<typeof DialogPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function DialogTrigger({ ...props }: React$1.ComponentProps<typeof DialogPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function DialogContent({ className, children, ...props }: React$1.ComponentProps<typeof DialogPrimitive.Content>): react_jsx_runtime.JSX.Element;
declare function DialogHeader({ className, ...props }: React$1.ComponentProps<'div'>): react_jsx_runtime.JSX.Element;
declare function DialogFooter({ className, ...props }: React$1.ComponentProps<'div'>): react_jsx_runtime.JSX.Element;
declare function DialogTitle({ className, ...props }: React$1.ComponentProps<typeof DialogPrimitive.Title>): react_jsx_runtime.JSX.Element;
declare function DialogDescription({ className, ...props }: React$1.ComponentProps<typeof DialogPrimitive.Description>): react_jsx_runtime.JSX.Element;

declare function Input({ className, type, ...props }: React$1.ComponentProps<'input'>): react_jsx_runtime.JSX.Element;

interface SelectOption {
    label: string;
    value: string;
}
interface SelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}
declare function Select({ value, onValueChange, options, placeholder, className, disabled }: SelectProps): react_jsx_runtime.JSX.Element;

declare function Separator({ className, orientation, decorative, ...props }: React$1.ComponentProps<typeof SeparatorPrimitive.Root>): react_jsx_runtime.JSX.Element;

declare function Skeleton({ className, ...props }: React.ComponentProps<'div'>): react_jsx_runtime.JSX.Element;

declare function Table({ className, ...props }: React$1.ComponentProps<'table'>): react_jsx_runtime.JSX.Element;
declare function TableHeader({ className, ...props }: React$1.ComponentProps<'thead'>): react_jsx_runtime.JSX.Element;
declare function TableBody({ className, ...props }: React$1.ComponentProps<'tbody'>): react_jsx_runtime.JSX.Element;
declare function TableRow({ className, ...props }: React$1.ComponentProps<'tr'>): react_jsx_runtime.JSX.Element;
declare function TableHead({ className, ...props }: React$1.ComponentProps<'th'>): react_jsx_runtime.JSX.Element;
declare function TableCell({ className, ...props }: React$1.ComponentProps<'td'>): react_jsx_runtime.JSX.Element;

declare function Tabs({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function TabsList({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.List>): react_jsx_runtime.JSX.Element;
declare function TabsTrigger({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function TabsContent({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.Content>): react_jsx_runtime.JSX.Element;

declare function Textarea({ className, ...props }: React$1.ComponentProps<'textarea'>): react_jsx_runtime.JSX.Element;

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}
declare function Toggle({ checked, onChange, disabled, className }: ToggleProps): react_jsx_runtime.JSX.Element;

declare function AnimatedPage({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function StaggerContainer({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function StaggerItem({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;

interface IdenticonProps {
    address: Address;
    size?: number;
    className?: string;
}
declare function Identicon({ address, size, className }: IdenticonProps): react_jsx_runtime.JSX.Element;

interface TangleLogoProps {
    label?: string;
}
declare function TangleLogo({ label }: TangleLogoProps): react_jsx_runtime.JSX.Element;

interface AppDocumentProps {
    children: ReactNode;
    description: string;
    themeStorageKeys: [string, string];
}
declare function AppDocument({ children, description, themeStorageKeys }: AppDocumentProps): react_jsx_runtime.JSX.Element;

interface AppFooterProps {
    brandText: string;
    tone: 'cloud' | 'arena';
    githubUrl?: string;
    docsUrl?: string;
}
declare function AppFooter({ brandText, tone, githubUrl, docsUrl, }: AppFooterProps): react_jsx_runtime.JSX.Element;

interface AppToasterProps {
    tone: 'cloud' | 'arena';
}
declare function AppToaster({ tone }: AppToasterProps): react_jsx_runtime.JSX.Element;

interface Web3ShellProps {
    config: Config;
    reconnectOnMount?: boolean;
    children: ReactNode;
}
declare function Web3Shell({ config, reconnectOnMount, children, }: Web3ShellProps): react_jsx_runtime.JSX.Element;

declare function ChainSwitcher(): react_jsx_runtime.JSX.Element;

declare function ThemeToggle(): react_jsx_runtime.JSX.Element;

interface ConnectWalletCtaProps {
    onClick?: () => void;
    isReconnecting?: boolean;
}
declare function ConnectWalletCta({ onClick, isReconnecting }: ConnectWalletCtaProps): react_jsx_runtime.JSX.Element;

interface FormFieldProps {
    field: JobFieldDef;
    value: unknown;
    onChange: (name: string, value: unknown) => void;
    error?: string;
}
declare function FormField({ field, value, onChange, error }: FormFieldProps): react_jsx_runtime.JSX.Element | null;

interface FormSection {
    label: string;
    fields: string[];
    collapsed?: boolean;
}
interface BlueprintJobFormProps {
    job: JobDefinition;
    values: Record<string, unknown>;
    onChange: (name: string, value: unknown) => void;
    errors?: Record<string, string>;
    sections?: FormSection[];
}
declare function BlueprintJobForm({ job, values, onChange, errors, sections }: BlueprintJobFormProps): react_jsx_runtime.JSX.Element;

interface FormSummaryProps {
    job: JobDefinition;
    values: Record<string, unknown>;
    context?: Record<string, unknown>;
}
declare function FormSummary({ job, values, context }: FormSummaryProps): react_jsx_runtime.JSX.Element;

interface JobExecutionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    job: JobDefinition;
    serviceId: bigint;
    context?: Record<string, unknown>;
    onSuccess?: () => void;
}
declare function JobExecutionDialog({ open, onOpenChange, job, serviceId, context, onSuccess, }: JobExecutionDialogProps): react_jsx_runtime.JSX.Element;

export { AnimatedPage, AppDocument, AppFooter, AppToaster, Badge, BlueprintJobForm, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ChainSwitcher, ConnectWalletCta, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, FormField, type FormSection, FormSummary, Identicon, Input, JobExecutionDialog, Select, type SelectOption, Separator, Skeleton, StaggerContainer, StaggerItem, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, TangleLogo, Textarea, ThemeToggle, Toggle, Web3Shell, badgeVariants };
