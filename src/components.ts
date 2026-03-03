/**
 * @tangle/blueprint-ui — shared UI components.
 *
 * Separated from index.ts so tree-shaking works cleanly for
 * consumers that only need hooks/stores/contracts.
 */

// ── UI Primitives ──
export { Badge, badgeVariants } from './components/ui/badge';
export { Button, buttonVariants } from './components/ui/button';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card';
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/ui/dialog';
export { Input } from './components/ui/input';
export type { SelectOption } from './components/ui/select';
export { Select } from './components/ui/select';
export { Separator } from './components/ui/separator';
export { Skeleton } from './components/ui/skeleton';
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './components/ui/table';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
export { Textarea } from './components/ui/textarea';
export { Toggle } from './components/ui/toggle';

// ── Motion ──
export { AnimatedPage, StaggerContainer, StaggerItem } from './components/motion/AnimatedPage';

// ── Shared ──
export { Identicon } from './components/shared/Identicon';
export { TangleLogo } from './components/shared/TangleLogo';

// ── Layout ──
export { AppDocument } from './components/layout/AppDocument';
export { AppFooter } from './components/layout/AppFooter';
export { AppToaster } from './components/layout/AppToaster';
export { Web3Shell } from './components/layout/Web3Shell';
export { ChainSwitcher } from './components/layout/ChainSwitcher';
export { ThemeToggle } from './components/layout/ThemeToggle';

// ── Forms ──
export { FormField } from './components/forms/FormField';
export type { FormSection } from './components/forms/BlueprintJobForm';
export { BlueprintJobForm } from './components/forms/BlueprintJobForm';
export { FormSummary } from './components/forms/FormSummary';
export { JobExecutionDialog } from './components/forms/JobExecutionDialog';
