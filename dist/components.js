import {
  encodeJobArgs,
  formatCost,
  getNetworks,
  infraStore,
  selectedChainIdStore,
  toggleTheme,
  useJobForm,
  useJobPrice,
  useSubmitJob,
  useThemeValue
} from "./chunk-A6PJT5YQ.js";
import {
  Badge,
  BlueprintHostHero,
  BlueprintHostPanel,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  badgeVariants,
  buttonVariants,
  cn
} from "./chunk-GD3AZEJL.js";

// src/components/ui/dialog.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { jsx, jsxs } from "react/jsx-runtime";
function Dialog({ ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { "data-slot": "dialog-overlay", className: cn("fixed inset-0 z-50 bg-black/50", className), ...props });
}
function DialogContent({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border border-border p-6 shadow-2xl duration-200 outline-none sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none", children: [
            /* @__PURE__ */ jsx("div", { className: "i-ph:x size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "dialog-header", className: cn("flex flex-col gap-2 text-center sm:text-left", className), ...props });
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "dialog-footer", className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className), ...props });
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Title, { "data-slot": "dialog-title", className: cn("text-lg leading-none font-semibold", className), ...props });
}
function DialogDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Description, { "data-slot": "dialog-description", className: cn("text-muted-foreground text-sm", className), ...props });
}

// src/components/ui/input.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx2(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "h-11 w-full min-w-0 rounded-lg px-3.5 py-2.5 text-base font-body",
        "bg-bp-elements-background-depth-3 dark:bg-bp-elements-background-depth-4 border border-bp-elements-borderColor text-bp-elements-textPrimary",
        "placeholder:text-bp-elements-textTertiary",
        "transition-all duration-200 outline-none",
        "hover:border-bp-elements-borderColorActive/40",
        "focus-visible:border-violet-500/40 focus-visible:ring-2 focus-visible:ring-violet-500/10",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/select.tsx
import * as SelectPrimitive from "@radix-ui/react-select";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Select({ value, onValueChange, options, placeholder, className, disabled }) {
  return /* @__PURE__ */ jsxs2(SelectPrimitive.Root, { value, onValueChange, disabled, children: [
    /* @__PURE__ */ jsxs2(
      SelectPrimitive.Trigger,
      {
        className: cn(
          "group flex h-11 w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-base font-body",
          "bg-bp-elements-background-depth-3 dark:bg-bp-elements-background-depth-4 border border-bp-elements-borderColor text-bp-elements-textPrimary",
          "transition-all duration-200 outline-none",
          "hover:border-bp-elements-borderColorActive/40",
          "focus-visible:border-violet-500/40 focus-visible:ring-2 focus-visible:ring-violet-500/10",
          "disabled:pointer-events-none disabled:opacity-40",
          "data-[placeholder]:text-bp-elements-textTertiary",
          className
        ),
        children: [
          /* @__PURE__ */ jsx3(SelectPrimitive.Value, { placeholder: placeholder ?? "Select..." }),
          /* @__PURE__ */ jsx3(SelectPrimitive.Icon, { className: "ml-2 shrink-0 text-bp-elements-textTertiary transition-transform duration-200 group-data-[state=open]:rotate-180", children: /* @__PURE__ */ jsx3("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx3("path", { d: "M3 4.5L6 7.5L9 4.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx3(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx3(
      SelectPrimitive.Content,
      {
        position: "popper",
        sideOffset: 4,
        className: cn(
          "relative z-50 max-h-[min(var(--radix-select-content-available-height),280px)] min-w-[var(--radix-select-trigger-width)] overflow-hidden",
          "rounded-xl border border-white/[0.06] bg-neutral-900/95 backdrop-blur-xl shadow-2xl shadow-black/40",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98] data-[state=open]:slide-in-from-top-1",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.98] data-[state=closed]:slide-out-to-top-1"
        ),
        children: /* @__PURE__ */ jsx3(SelectPrimitive.Viewport, { className: "p-1.5", children: options.map((opt) => /* @__PURE__ */ jsxs2(
          SelectPrimitive.Item,
          {
            value: opt.value,
            className: cn(
              "relative flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm font-body outline-none select-none",
              "text-neutral-300 transition-colors duration-100",
              "data-[highlighted]:bg-white/[0.06] data-[highlighted]:text-white",
              "data-[state=checked]:text-violet-300"
            ),
            children: [
              /* @__PURE__ */ jsx3(SelectPrimitive.ItemText, { children: opt.label }),
              /* @__PURE__ */ jsx3(SelectPrimitive.ItemIndicator, { className: "ml-auto pl-3", children: /* @__PURE__ */ jsx3("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ jsx3("path", { d: "M3 7.5L5.5 10L11 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
            ]
          },
          opt.value
        )) })
      }
    ) })
  ] });
}

// src/components/ui/separator.tsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsx as jsx4 } from "react/jsx-runtime";
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/skeleton.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}

// src/components/ui/table.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx6("div", { "data-slot": "table-container", className: "glass-card rounded-xl overflow-hidden", children: /* @__PURE__ */ jsx6("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx6("table", { "data-slot": "table", className: cn("w-full caption-bottom text-sm", className), ...props }) }) });
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx6("thead", { "data-slot": "table-header", className: cn("border-b border-bp-elements-borderColor", className), ...props });
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx6("tbody", { "data-slot": "table-body", className: cn("[&_tr:last-child]:border-0", className), ...props });
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx6(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "border-b border-bp-elements-dividerColor transition-colors duration-150 hover:bg-bp-elements-item-backgroundHover data-[state=selected]:bg-bp-elements-item-backgroundActive",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx6(
    "th",
    {
      "data-slot": "table-head",
      className: cn("h-11 px-4 text-left align-middle font-data text-xs font-semibold uppercase tracking-wider text-bp-elements-textSecondary", className),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx6("td", { "data-slot": "table-cell", className: cn("px-4 py-3 align-middle", className), ...props });
}

// src/components/ui/tabs.tsx
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { jsx as jsx7 } from "react/jsx-runtime";
function Tabs({ className, ...props }) {
  return /* @__PURE__ */ jsx7(TabsPrimitive.Root, { "data-slot": "tabs", className: cn("flex flex-col gap-2", className), ...props });
}
function TabsList({ className, ...props }) {
  return /* @__PURE__ */ jsx7(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      className: cn("glass-card inline-flex h-10 w-fit items-center justify-center rounded-xl p-1 gap-0.5", className),
      ...props
    }
  );
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ jsx7(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium font-display whitespace-nowrap transition-all duration-200",
        "text-bp-elements-textTertiary hover:text-bp-elements-textSecondary",
        "data-[state=active]:text-violet-700 dark:data-[state=active]:text-violet-400 data-[state=active]:bg-violet-500/10 data-[state=active]:shadow-[0_0_12px_rgba(142,89,255,0.1)]",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      ),
      ...props
    }
  );
}
function TabsContent({ className, ...props }) {
  return /* @__PURE__ */ jsx7(TabsPrimitive.Content, { "data-slot": "tabs-content", className: cn("flex-1 outline-none", className), ...props });
}

// src/components/ui/textarea.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx8(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "min-h-[80px] w-full rounded-lg px-3.5 py-2.5 text-base font-body resize-y",
        "bg-bp-elements-background-depth-3 dark:bg-bp-elements-background-depth-4 border border-bp-elements-borderColor text-bp-elements-textPrimary",
        "placeholder:text-bp-elements-textTertiary",
        "transition-all duration-200 outline-none",
        "hover:border-bp-elements-borderColorActive/40",
        "focus-visible:border-violet-500/40 focus-visible:ring-2 focus-visible:ring-violet-500/10",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/toggle.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function Toggle({ checked, onChange, disabled, className }) {
  return /* @__PURE__ */ jsx9(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      disabled,
      onClick: () => onChange(!checked),
      className: cn(
        "relative w-11 h-6 rounded-full transition-colors",
        checked ? "bg-violet-600" : "bg-bp-elements-background-depth-4",
        disabled && "opacity-40 pointer-events-none",
        className
      ),
      children: /* @__PURE__ */ jsx9(
        "span",
        {
          className: cn(
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
            checked && "translate-x-5"
          )
        }
      )
    }
  );
}

// src/components/motion/AnimatedPage.tsx
import { motion } from "framer-motion";
import { jsx as jsx10 } from "react/jsx-runtime";
var pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
};
function AnimatedPage({ children, className }) {
  return /* @__PURE__ */ jsx10(motion.div, { variants: pageVariants, initial: "initial", animate: "animate", exit: "exit", className, children });
}
var staggerContainer = {
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};
var staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};
function StaggerContainer({ children, className }) {
  return /* @__PURE__ */ jsx10(motion.div, { variants: staggerContainer, initial: "initial", animate: "animate", className, children });
}
function StaggerItem({ children, className }) {
  return /* @__PURE__ */ jsx10(motion.div, { variants: staggerItem, className, children });
}

// src/components/shared/Identicon.tsx
import { blo } from "blo";
import { jsx as jsx11 } from "react/jsx-runtime";
function Identicon({ address, size = 20, className }) {
  const dataUri = blo(address, size);
  return /* @__PURE__ */ jsx11(
    "img",
    {
      src: dataUri,
      alt: `${address.slice(0, 6)}...${address.slice(-4)}`,
      width: size,
      height: size,
      className: `rounded-full ${className ?? ""}`,
      style: { imageRendering: "pixelated" }
    }
  );
}

// src/components/shared/TangleLogo.tsx
import { useId } from "react";
import { jsx as jsx12, jsxs as jsxs3 } from "react/jsx-runtime";
function TangleLogo({ label }) {
  const paintId = useId();
  return /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxs3(
      "svg",
      {
        width: 114,
        height: 28,
        viewBox: "0 0 114 28",
        className: "fill-bp-elements-textPrimary stroke-none",
        children: [
          /* @__PURE__ */ jsxs3("g", { clipPath: "url(#clip0_828_2896)", children: [
            /* @__PURE__ */ jsx12(
              "path",
              {
                d: "M32 21.9598C32.0014 20.3605 31.2756 18.8261 29.9818 17.6934C28.6881 16.5606 26.9321 15.9221 25.0994 15.918L17.4484 15.918C17.4003 15.2958 17.3699 14.6596 17.3699 14C17.3699 13.3404 17.3396 12.7073 17.2969 12.082L25.0994 12.082C26.9162 12.0566 28.6488 11.4089 29.9233 10.2788C31.1978 9.14863 31.9121 7.62659 31.9121 6.041C31.9121 4.45541 31.1978 2.93337 29.9233 1.80323C28.6488 0.67309 26.9162 0.0254409 25.0994 -3.01633e-07L6.81321 -1.10095e-06C4.9964 0.02544 3.26386 0.673089 1.98936 1.80323C0.714863 2.93337 0.000568195 4.45541 0.000568126 6.041C0.000568057 7.62659 0.714862 9.14863 1.98936 10.2788C3.26386 11.4089 4.9964 12.0566 6.81321 12.082L14 12.25C14.5 12.25 14.5427 13.3404 14.5427 14C14.5427 14.6596 14.573 15.2927 14.6158 15.918L6.81321 15.918C4.9964 15.9434 3.26386 16.5911 1.98936 17.7212C0.714862 18.8514 0.000567499 20.3734 0.00056743 21.959C0.000567361 23.5446 0.714862 25.0666 1.98936 26.1968C3.26386 27.3269 4.9964 27.9746 6.81321 28L25.0994 28C26.9318 27.9959 28.6875 27.3576 29.9812 26.2252C31.2749 25.0928 32.0009 23.5588 32 21.9598ZM29.1727 6.04022C29.1732 6.98405 28.7446 7.8895 27.981 8.5579C27.2173 9.22631 26.181 9.60308 25.0994 9.60556L16.9974 9.60555C16.7039 7.83811 16.1447 6.11213 15.3342 4.47222C14.9768 3.7617 14.5193 3.09283 13.9723 2.48111L25.0994 2.48111C26.1798 2.48358 27.215 2.8595 27.9785 3.52656C28.7419 4.19362 29.1713 5.09747 29.1727 6.04022ZM6.81321 9.60555C5.72959 9.60555 4.69036 9.22992 3.92412 8.56129C3.15789 7.89266 2.72742 6.98581 2.72742 6.04022C2.72742 5.09464 3.15789 4.18778 3.92412 3.51915C4.69036 2.85052 5.7296 2.47489 6.81321 2.47489L8.64754 2.47489C10.2679 2.47489 11.8028 3.59489 12.7583 5.47244C13.4124 6.7954 13.8776 8.18352 14.1434 9.60555L6.81321 9.60555ZM2.7399 21.9598C2.73943 21.0159 3.16802 20.1105 3.93166 19.4421C4.6953 18.7737 5.73161 18.3969 6.81321 18.3944L14.9153 18.3944C15.2088 20.1619 15.768 21.8879 16.5785 23.5278C16.9358 24.2383 17.3933 24.9072 17.9404 25.5189L6.81321 25.5189C5.73285 25.5164 4.69762 25.1405 3.93418 24.4734C3.17074 23.8064 2.74131 22.9025 2.7399 21.9598ZM19.1651 22.5276C18.511 21.2046 18.0458 19.8165 17.78 18.3944L25.0994 18.3944C26.1831 18.3944 27.2223 18.7701 27.9885 19.4387C28.7548 20.1073 29.1852 21.0142 29.1852 21.9598C29.1852 22.9054 28.7548 23.8122 27.9885 24.4809C27.2223 25.1495 26.1831 25.5251 25.0994 25.5251L23.2651 25.5251C21.6518 25.5251 20.117 24.4051 19.1651 22.5276Z",
                fill: `url(#paint0_linear_${paintId})`
              }
            ),
            /* @__PURE__ */ jsx12(
              "path",
              {
                opacity: "0.8",
                d: "M32 6.04022C32.0014 7.63948 31.2756 9.17389 29.9818 10.3066C28.688 11.4394 26.9321 12.0779 25.0993 12.082L17.4481 12.082C17.4 12.7042 17.3697 13.3404 17.3697 14C17.3697 14.6596 17.3394 15.2927 17.2966 15.918L25.0993 15.918C26.9162 15.9434 28.6487 16.5911 29.9232 17.7212C31.1978 18.8514 31.9121 20.3734 31.9121 21.959C31.9121 23.5446 31.1978 25.0666 29.9232 26.1968C28.6487 27.3269 26.9162 27.9746 25.0993 28L6.81277 28C4.99592 27.9746 3.26335 27.3269 1.98883 26.1968C0.714308 25.0666 5.31303e-08 23.5446 7.20382e-08 21.959C9.09462e-08 20.3734 0.714308 18.8514 1.98883 17.7212C3.26335 16.5911 4.99592 15.9434 6.81277 15.918L13.9997 15.75C14.4997 15.75 14.5424 14.6596 14.5424 14C14.5424 13.3404 14.5727 12.7073 14.6155 12.082L6.81277 12.082C4.99592 12.0566 3.26335 11.4089 1.98883 10.2788C0.714308 9.14863 2.42951e-07 7.62659 2.61858e-07 6.041C2.80766e-07 4.45541 0.714308 2.93337 1.98883 1.80323C3.26335 0.673093 4.99592 0.0254399 6.81277 -3.00355e-07L25.0993 -8.22899e-08C26.9317 0.00411981 28.6875 0.642418 29.9812 1.77482C31.2749 2.90723 32.0009 4.44123 32 6.04022ZM29.1727 21.9598C29.1732 21.016 28.7446 20.1105 27.9809 19.4421C27.2173 18.7737 26.1809 18.3969 25.0993 18.3944L16.9971 18.3944C16.7036 20.1619 16.1444 21.8879 15.3339 23.5278C14.9765 24.2383 14.519 24.9072 13.9719 25.5189L25.0993 25.5189C26.1797 25.5164 27.2149 25.1405 27.9784 24.4734C28.7418 23.8064 29.1713 22.9025 29.1727 21.9598ZM6.81277 18.3944C5.72913 18.3944 4.68987 18.7701 3.92363 19.4387C3.15738 20.1073 2.7269 21.0142 2.7269 21.9598C2.7269 22.9054 3.15738 23.8122 3.92363 24.4808C4.68987 25.1495 5.72913 25.5251 6.81277 25.5251L8.64713 25.5251C10.2676 25.5251 11.8024 24.4051 12.7579 22.5276C13.412 21.2046 13.8772 19.8165 14.1431 18.3944L6.81277 18.3944ZM2.73939 6.04022C2.73891 6.98405 3.16751 7.8895 3.93117 8.55791C4.69482 9.22631 5.73115 9.60308 6.81277 9.60555L14.915 9.60555C15.2085 7.8381 15.7677 6.11213 16.5782 4.47222C16.9356 3.7617 17.3931 3.09283 17.9401 2.48111L6.81277 2.48111C5.73238 2.48358 4.69713 2.8595 3.93368 3.52656C3.17023 4.19362 2.7408 5.09747 2.73939 6.04022ZM19.1648 5.47244C18.5107 6.79541 18.0455 8.18352 17.7797 9.60555L25.0993 9.60555C26.183 9.60555 27.2222 9.22992 27.9885 8.56129C28.7547 7.89266 29.1852 6.98581 29.1852 6.04022C29.1852 5.09464 28.7547 4.18778 27.9885 3.51915C27.2222 2.85052 26.183 2.47489 25.0993 2.47489L23.265 2.47489C21.6516 2.47489 20.1168 3.59489 19.1648 5.47244Z",
                fill: `url(#paint1_linear_${paintId})`
              }
            )
          ] }),
          /* @__PURE__ */ jsx12("path", { d: "M48.685 8.598V22.5H45.283V8.598H48.685ZM40.873 10.11V6.96H53.095V10.11H40.873ZM57.2788 22.773C56.1728 22.773 55.2908 22.472 54.6328 21.87C53.9888 21.254 53.6668 20.435 53.6668 19.413C53.6668 18.447 53.9958 17.677 54.6538 17.103C55.3258 16.529 56.2918 16.193 57.5518 16.095L60.4918 15.864V15.696C60.4918 15.346 60.4218 15.059 60.2818 14.835C60.1418 14.597 59.9388 14.422 59.6728 14.31C59.4208 14.184 59.0988 14.121 58.7068 14.121C58.0208 14.121 57.4958 14.247 57.1318 14.499C56.7818 14.751 56.6068 15.115 56.6068 15.591H53.9188C53.9188 14.793 54.1218 14.1 54.5278 13.512C54.9338 12.924 55.5078 12.469 56.2498 12.147C57.0058 11.825 57.8808 11.664 58.8748 11.664C59.8968 11.664 60.7578 11.846 61.4578 12.21C62.1718 12.574 62.7108 13.106 63.0748 13.806C63.4528 14.506 63.6418 15.36 63.6418 16.368V22.5H60.7858L60.5758 21.114C60.4078 21.59 60.0088 21.989 59.3788 22.311C58.7628 22.619 58.0628 22.773 57.2788 22.773ZM58.4128 20.379C59.0288 20.379 59.5328 20.232 59.9248 19.938C60.3168 19.63 60.5128 19.175 60.5128 18.573V18.006L58.8748 18.153C58.1748 18.209 57.6778 18.328 57.3838 18.51C57.1038 18.678 56.9638 18.93 56.9638 19.266C56.9638 19.644 57.0828 19.924 57.3208 20.106C57.5588 20.288 57.9228 20.379 58.4128 20.379ZM70.4553 22.5H67.2213V12H70.2663L70.4763 13.092C70.7983 12.644 71.2393 12.294 71.7993 12.042C72.3733 11.79 73.0033 11.664 73.6893 11.664C74.9353 11.664 75.9013 12.049 76.5873 12.819C77.2873 13.575 77.6373 14.639 77.6373 16.011V22.5H74.4033V16.788C74.4033 16.13 74.2353 15.605 73.8993 15.213C73.5633 14.807 73.1153 14.604 72.5553 14.604C71.9113 14.604 71.4003 14.8 71.0223 15.192C70.6443 15.57 70.4553 16.088 70.4553 16.746V22.5ZM80.6916 17.061C80.6916 15.997 80.9016 15.059 81.3216 14.247C81.7556 13.435 82.3506 12.798 83.1066 12.336C83.8766 11.874 84.7516 11.643 85.7316 11.643C86.5576 11.643 87.2646 11.811 87.8526 12.147C88.4547 12.483 88.8677 12.924 89.0917 13.47L88.7766 13.68L89.0286 12H92.0737V21.828C92.0737 23.074 91.8427 24.145 91.3807 25.041C90.9187 25.951 90.2606 26.644 89.4066 27.12C88.5527 27.61 87.5237 27.855 86.3197 27.855C84.7096 27.855 83.4006 27.421 82.3926 26.553C81.3846 25.699 80.8036 24.53 80.6496 23.046H83.9256C83.9536 23.634 84.1776 24.089 84.5976 24.411C85.0176 24.747 85.5846 24.915 86.2986 24.915C87.0826 24.915 87.6986 24.698 88.1466 24.264C88.6087 23.83 88.8397 23.242 88.8397 22.5V20.274L89.1967 20.547C88.9727 21.093 88.5387 21.534 87.8946 21.87C87.2506 22.206 86.5086 22.374 85.6686 22.374C84.6886 22.374 83.8206 22.15 83.0646 21.702C82.3226 21.254 81.7416 20.631 81.3216 19.833C80.9016 19.035 80.6916 18.111 80.6916 17.061ZM83.9466 16.977C83.9466 17.481 84.0516 17.929 84.2616 18.321C84.4716 18.699 84.7586 19 85.1226 19.224C85.4866 19.448 85.9066 19.56 86.3827 19.56C86.8726 19.56 87.2996 19.455 87.6636 19.245C88.0416 19.021 88.3286 18.72 88.5246 18.342C88.7347 17.95 88.8397 17.495 88.8397 16.977C88.8397 16.459 88.7347 16.018 88.5246 15.654C88.3286 15.276 88.0416 14.982 87.6636 14.772C87.2996 14.562 86.8656 14.457 86.3616 14.457C85.8856 14.457 85.4657 14.562 85.1016 14.772C84.7376 14.982 84.4506 15.276 84.2406 15.654C84.0446 16.032 83.9466 16.473 83.9466 16.977ZM98.9997 22.5H95.7657V6.666H98.9997V22.5ZM107.558 22.773C106.508 22.773 105.57 22.535 104.744 22.059C103.932 21.583 103.288 20.932 102.812 20.106C102.35 19.266 102.119 18.307 102.119 17.229C102.119 16.137 102.343 15.178 102.791 14.352C103.253 13.512 103.89 12.854 104.702 12.378C105.514 11.902 106.445 11.664 107.495 11.664C108.601 11.664 109.553 11.895 110.351 12.357C111.149 12.805 111.765 13.449 112.199 14.289C112.633 15.115 112.85 16.102 112.85 17.25V18.069L103.82 18.111L103.862 16.116H109.637C109.637 15.556 109.448 15.115 109.07 14.793C108.692 14.457 108.174 14.289 107.516 14.289C106.97 14.289 106.522 14.394 106.172 14.604C105.836 14.814 105.584 15.143 105.416 15.591C105.248 16.025 105.164 16.585 105.164 17.271C105.164 18.251 105.36 18.979 105.752 19.455C106.158 19.917 106.781 20.148 107.621 20.148C108.237 20.148 108.748 20.043 109.154 19.833C109.56 19.623 109.819 19.329 109.931 18.951H112.892C112.71 20.113 112.136 21.044 111.17 21.744C110.204 22.43 109 22.773 107.558 22.773Z" }),
          /* @__PURE__ */ jsxs3("defs", { children: [
            /* @__PURE__ */ jsxs3("linearGradient", { id: `paint0_linear_${paintId}`, x1: "2.38462", y1: "1.77333", x2: "26.529", y2: "29.367", gradientUnits: "userSpaceOnUse", children: [
              /* @__PURE__ */ jsx12("stop", { stopColor: "#8E59FF" }),
              /* @__PURE__ */ jsx12("stop", { offset: "1", stopColor: "#6888F9" })
            ] }),
            /* @__PURE__ */ jsxs3("linearGradient", { id: `paint1_linear_${paintId}`, x1: "2.3841", y1: "26.2267", x2: "26.5285", y2: "-1.36739", gradientUnits: "userSpaceOnUse", children: [
              /* @__PURE__ */ jsx12("stop", { stopColor: "#8E59FF" }),
              /* @__PURE__ */ jsx12("stop", { offset: "1", stopColor: "#6888F9" })
            ] }),
            /* @__PURE__ */ jsx12("clipPath", { id: "clip0_828_2896", children: /* @__PURE__ */ jsx12("rect", { width: "28", height: "32", fill: "white", transform: "translate(32) rotate(90)" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx12("span", { className: "hidden sm:inline-flex px-2.5 py-1 rounded-full border border-bp-elements-borderColor text-sm font-display font-medium text-bp-elements-textSecondary", children: label ?? "Tangle" })
  ] });
}

// src/components/layout/AppDocument.tsx
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import { jsx as jsx13, jsxs as jsxs4 } from "react/jsx-runtime";
function buildInlineThemeCode(themeStorageKeys) {
  const [primaryKey, secondaryKey] = themeStorageKeys;
  return `
    (function() {
      var theme = localStorage.getItem('${primaryKey}') || localStorage.getItem('${secondaryKey}');
      if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.querySelector('html').setAttribute('data-theme', theme);
    })();
  `;
}
function AppDocument({ children, description, themeStorageKeys }) {
  return /* @__PURE__ */ jsxs4("html", { lang: "en", "data-theme": "dark", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxs4("head", { children: [
      /* @__PURE__ */ jsx13("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx13("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx13("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsx13(Meta, {}),
      /* @__PURE__ */ jsx13(Links, {}),
      /* @__PURE__ */ jsx13("link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }),
      /* @__PURE__ */ jsx13("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsx13("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
      /* @__PURE__ */ jsx13(
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
        }
      ),
      /* @__PURE__ */ jsx13("script", { dangerouslySetInnerHTML: { __html: buildInlineThemeCode(themeStorageKeys) } })
    ] }),
    /* @__PURE__ */ jsxs4("body", { children: [
      children,
      /* @__PURE__ */ jsx13(ScrollRestoration, {}),
      /* @__PURE__ */ jsx13(Scripts, {})
    ] })
  ] });
}

// src/components/layout/AppFooter.tsx
import { jsx as jsx14, jsxs as jsxs5 } from "react/jsx-runtime";
var TONE_STYLES = {
  cloud: {
    border: "border-cloud-elements-dividerColor",
    text: "text-cloud-elements-textTertiary"
  },
  arena: {
    border: "border-arena-elements-dividerColor",
    text: "text-arena-elements-textTertiary"
  }
};
function AppFooter({
  brandText,
  tone,
  githubUrl = "https://github.com/tangle-network",
  docsUrl = "https://docs.tangle.tools"
}) {
  const styles = TONE_STYLES[tone];
  return /* @__PURE__ */ jsx14("footer", { className: `border-t py-5 mt-12 ${styles.border}`, children: /* @__PURE__ */ jsxs5("div", { className: `mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between text-xs ${styles.text}`, children: [
    /* @__PURE__ */ jsx14("span", { className: "font-data", children: brandText }),
    /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-5", children: [
      /* @__PURE__ */ jsx14("a", { href: githubUrl, target: "_blank", rel: "noopener noreferrer", className: "hover:text-violet-700 dark:hover:text-violet-400 transition-colors", children: "GitHub" }),
      /* @__PURE__ */ jsx14("a", { href: docsUrl, target: "_blank", rel: "noopener noreferrer", className: "hover:text-violet-700 dark:hover:text-violet-400 transition-colors", children: "Docs" })
    ] })
  ] }) });
}

// src/components/layout/AppToaster.tsx
import { Toaster } from "sonner";
import { jsx as jsx15 } from "react/jsx-runtime";
var TONE_TEXT_COLOR = {
  cloud: "var(--cloud-elements-textPrimary)",
  arena: "var(--arena-elements-textPrimary)"
};
function AppToaster({ tone }) {
  const theme = useThemeValue();
  return /* @__PURE__ */ jsx15(
    Toaster,
    {
      position: "bottom-right",
      theme,
      richColors: true,
      closeButton: true,
      duration: 3e3,
      toastOptions: {
        style: {
          background: "var(--glass-bg-strong)",
          backdropFilter: "blur(16px)",
          border: "1px solid var(--glass-border)",
          color: TONE_TEXT_COLOR[tone]
        }
      }
    }
  );
}

// src/components/layout/Web3Shell.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { WagmiContext, useReconnect } from "wagmi";
import { jsx as jsx16, jsxs as jsxs6 } from "react/jsx-runtime";
async function findRecentConnector(currentConfig) {
  const storage = currentConfig.storage;
  const recentConnectorId = await storage?.getItem("recentConnectorId");
  if (!recentConnectorId) return null;
  const connector = currentConfig.connectors.find((candidate) => candidate.id === recentConnectorId) ?? null;
  if (!connector) {
    await storage?.removeItem("recentConnectorId");
  }
  return connector;
}
function ReconnectOnMount({
  config,
  reconnectOnMount
}) {
  const { reconnectAsync } = useReconnect();
  const attemptedRef = useRef(false);
  useEffect(() => {
    if (!reconnectOnMount || attemptedRef.current) return;
    attemptedRef.current = true;
    let cancelled = false;
    void (async () => {
      try {
        const connector = await findRecentConnector(config);
        if (cancelled) return;
        if (connector) {
          await reconnectAsync({ connectors: [connector] });
          return;
        }
        await reconnectAsync();
      } catch {
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [config, reconnectAsync, reconnectOnMount]);
  return null;
}
function Web3Shell({
  config,
  reconnectOnMount = true,
  children
}) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 3e4
        }
      }
    })
  );
  return (
    // We provide wagmi context directly instead of using WagmiProvider so we can
    // control exactly when silent reconnect runs.
    /* @__PURE__ */ jsx16(WagmiContext.Provider, { value: config, children: /* @__PURE__ */ jsxs6(QueryClientProvider, { client: queryClient, children: [
      /* @__PURE__ */ jsx16(ReconnectOnMount, { config, reconnectOnMount }),
      children
    ] }) })
  );
}

// src/components/layout/ChainSwitcher.tsx
import { useState as useState2, useRef as useRef2, useEffect as useEffect2 } from "react";
import { useStore } from "@nanostores/react";
import { jsx as jsx17, jsxs as jsxs7 } from "react/jsx-runtime";
function chainIcon(label, chainName) {
  if (label === "Tangle Local" || chainName === "Tangle Local") return "i-ph:desktop";
  if (label === "Tangle Testnet" || chainName === "Tangle Testnet") return "i-ph:flask";
  if (label === "Tangle Mainnet" || chainName === "Tangle") return "i-ph:globe-hemisphere-west";
  return "i-ph:globe";
}
function orderedChainIds() {
  const priority = {
    "Tangle Local": 0,
    "Tangle Testnet": 1,
    "Tangle Mainnet": 2,
    Tangle: 2
  };
  return Object.entries(getNetworks()).sort(([, a], [, b]) => {
    const aPriority = priority[a?.label ?? a?.chain?.name ?? ""] ?? 99;
    const bPriority = priority[b?.label ?? b?.chain?.name ?? ""] ?? 99;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.chain.id - b.chain.id;
  }).map(([chainId]) => Number(chainId));
}
function ChainSwitcher() {
  const [open, setOpen] = useState2(false);
  const ref = useRef2(null);
  const selectedChainId = useStore(selectedChainIdStore);
  const current = getNetworks()[selectedChainId];
  useEffect2(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);
  function selectChain(chainId) {
    selectedChainIdStore.set(chainId);
    setOpen(false);
    window.location.reload();
  }
  return /* @__PURE__ */ jsxs7("div", { ref, className: "relative", children: [
    /* @__PURE__ */ jsxs7(
      "button",
      {
        onClick: () => setOpen(!open),
        className: "flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-data font-medium bg-bp-elements-background-depth-3 dark:bg-bp-elements-background-depth-4 border border-bp-elements-borderColor hover:border-bp-elements-borderColorActive/40 transition-all",
        title: current?.label ?? "Select network",
        children: [
          /* @__PURE__ */ jsx17("div", { className: `${chainIcon(current?.label, current?.chain?.name)} text-sm text-bp-elements-icon-success` }),
          /* @__PURE__ */ jsx17("span", { className: "hidden sm:inline text-bp-elements-textSecondary", children: current?.shortLabel ?? "Unknown" }),
          /* @__PURE__ */ jsx17("div", { className: `i-ph:caret-down text-[10px] text-bp-elements-textTertiary transition-transform ${open ? "rotate-180" : ""}` })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxs7("div", { className: "absolute right-0 top-full mt-2 w-48 glass-card-strong rounded-xl border border-bp-elements-dividerColor/50 py-1.5 z-50 shadow-lg", children: [
      /* @__PURE__ */ jsx17("div", { className: "px-3 py-1.5 text-[10px] font-data uppercase tracking-wider text-bp-elements-textTertiary", children: "Network" }),
      orderedChainIds().map((chainId) => {
        const net = getNetworks()[chainId];
        if (!net) return null;
        const isSelected = chainId === selectedChainId;
        return /* @__PURE__ */ jsxs7(
          "button",
          {
            onClick: () => selectChain(chainId),
            className: `flex items-center gap-2.5 w-full px-3 py-2 text-left transition-colors ${isSelected ? "bg-violet-500/10 text-violet-700 dark:text-violet-400" : "hover:bg-bp-elements-item-backgroundHover text-bp-elements-textSecondary"}`,
            children: [
              /* @__PURE__ */ jsx17("div", { className: `${chainIcon(net.label, net.chain.name)} text-sm ${isSelected ? "text-violet-700 dark:text-violet-400" : "text-bp-elements-textTertiary"}` }),
              /* @__PURE__ */ jsx17("span", { className: "text-sm font-display font-medium", children: net.label }),
              isSelected && /* @__PURE__ */ jsx17("div", { className: "i-ph:check-bold text-xs ml-auto text-violet-700 dark:text-violet-400" })
            ]
          },
          chainId
        );
      })
    ] })
  ] });
}

// src/components/layout/ThemeToggle.tsx
import { jsx as jsx18 } from "react/jsx-runtime";
function ThemeToggle() {
  const theme = useThemeValue();
  return /* @__PURE__ */ jsx18(Button, { variant: "ghost", size: "icon-sm", onClick: toggleTheme, "aria-label": "Toggle theme", className: "relative overflow-hidden", children: /* @__PURE__ */ jsx18("div", { className: "transition-transform duration-300 ease-out", children: theme === "dark" ? /* @__PURE__ */ jsx18("div", { className: "i-ph:sun size-4 text-amber-400" }) : /* @__PURE__ */ jsx18("div", { className: "i-ph:moon size-4 text-violet-400" }) }) });
}

// src/components/web3/ConnectWalletCta.tsx
import { jsx as jsx19, jsxs as jsxs8 } from "react/jsx-runtime";
function ConnectWalletCta({ onClick, isReconnecting = false }) {
  return /* @__PURE__ */ jsx19(
    "button",
    {
      onClick: () => onClick?.(),
      disabled: !onClick,
      className: "px-4 py-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-700 dark:text-violet-400 text-sm font-display font-medium hover:bg-violet-500/20 transition-colors",
      children: isReconnecting ? /* @__PURE__ */ jsxs8("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx19("span", { className: "w-3 h-3 rounded-full border-2 border-violet-500/40 border-t-violet-600 dark:border-t-violet-400 animate-spin" }),
        "Reconnecting..."
      ] }) : "Connect"
    }
  );
}

// src/components/forms/FormField.tsx
import { useState as useState3 } from "react";
import { jsx as jsx20, jsxs as jsxs9 } from "react/jsx-runtime";
function FormField({ field, value, onChange, error }) {
  if (field.internal) return null;
  const isBool = field.type === "boolean";
  return /* @__PURE__ */ jsxs9("div", { className: cn(isBool && "flex items-center gap-3"), children: [
    !isBool && /* @__PURE__ */ jsxs9("label", { className: "block text-sm font-display font-medium text-bp-elements-textSecondary mb-2", children: [
      field.label,
      field.required && " *"
    ] }),
    /* @__PURE__ */ jsx20(FieldInput, { field, value, onChange }),
    isBool && /* @__PURE__ */ jsx20("span", { className: "text-sm font-display text-bp-elements-textSecondary", children: field.label }),
    field.helperText && !error && /* @__PURE__ */ jsx20("p", { className: "text-xs text-bp-elements-textTertiary mt-1", children: field.helperText }),
    error && /* @__PURE__ */ jsx20("p", { className: "text-xs text-crimson-400 mt-1", children: error })
  ] });
}
function FieldInput({
  field,
  value,
  onChange
}) {
  switch (field.type) {
    case "text":
      return /* @__PURE__ */ jsx20(
        Input,
        {
          value: String(value ?? ""),
          onChange: (e) => onChange(field.name, e.target.value),
          placeholder: field.placeholder
        }
      );
    case "number":
      return /* @__PURE__ */ jsx20(NumberInput, { field, value, onChange });
    case "textarea":
    case "json":
      return /* @__PURE__ */ jsx20(
        Textarea,
        {
          value: String(value ?? ""),
          onChange: (e) => onChange(field.name, e.target.value),
          placeholder: field.placeholder,
          rows: field.type === "json" ? 3 : 4,
          className: field.type === "json" ? "font-data text-sm" : void 0
        }
      );
    case "boolean":
      return /* @__PURE__ */ jsx20(Toggle, { checked: Boolean(value), onChange: (v) => onChange(field.name, v) });
    case "select":
      return /* @__PURE__ */ jsx20(
        Select,
        {
          value: String(value ?? ""),
          onValueChange: (v) => onChange(field.name, v),
          options: field.options ?? []
        }
      );
    case "combobox":
      return /* @__PURE__ */ jsx20(ComboboxInput, { field, value, onChange });
    default:
      return null;
  }
}
function NumberInput({
  field,
  value,
  onChange
}) {
  const numVal = Number(value ?? field.min ?? 0);
  const step = field.step ?? 1;
  const clamp = (raw) => {
    if (field.min != null && raw < field.min) return field.min;
    if (field.max != null && raw > field.max) return field.max;
    return raw;
  };
  const canDecrement = field.min == null || numVal > field.min;
  const canIncrement = field.max == null || numVal < field.max;
  return /* @__PURE__ */ jsxs9("div", { className: "flex items-stretch h-11 rounded-lg border border-bp-elements-borderColor bg-bp-elements-background-depth-3 dark:bg-bp-elements-background-depth-4 transition-all duration-200 hover:border-bp-elements-borderColorActive/40 focus-within:border-violet-500/40 focus-within:ring-2 focus-within:ring-violet-500/10", children: [
    /* @__PURE__ */ jsx20(
      "button",
      {
        type: "button",
        tabIndex: -1,
        disabled: !canDecrement,
        onClick: () => onChange(field.name, clamp(numVal - step)),
        className: "flex items-center justify-center w-10 shrink-0 text-bp-elements-textTertiary transition-colors hover:text-bp-elements-textPrimary hover:bg-white/[0.04] rounded-l-lg disabled:opacity-30 disabled:pointer-events-none",
        children: /* @__PURE__ */ jsx20("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ jsx20("path", { d: "M3 7h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
      }
    ),
    /* @__PURE__ */ jsx20(
      "input",
      {
        type: "number",
        value: numVal,
        min: field.min,
        max: field.max,
        step,
        onChange: (e) => {
          if (e.target.value === "") {
            onChange(field.name, field.min ?? 0);
            return;
          }
          onChange(field.name, clamp(Number(e.target.value)));
        },
        placeholder: field.placeholder,
        className: "flex-1 min-w-0 bg-transparent text-center text-base font-data text-bp-elements-textPrimary outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      }
    ),
    /* @__PURE__ */ jsx20(
      "button",
      {
        type: "button",
        tabIndex: -1,
        disabled: !canIncrement,
        onClick: () => onChange(field.name, clamp(numVal + step)),
        className: "flex items-center justify-center w-10 shrink-0 text-bp-elements-textTertiary transition-colors hover:text-bp-elements-textPrimary hover:bg-white/[0.04] rounded-r-lg disabled:opacity-30 disabled:pointer-events-none",
        children: /* @__PURE__ */ jsx20("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ jsx20("path", { d: "M7 3v8M3 7h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) })
      }
    )
  ] });
}
function ComboboxInput({
  field,
  value,
  onChange
}) {
  const strVal = String(value ?? "");
  const options = field.options ?? [];
  const isPreset = options.some((o) => o.value === strVal);
  const [isCustom, setIsCustom] = useState3(!isPreset && strVal !== "");
  if (isCustom) {
    return /* @__PURE__ */ jsxs9("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx20(
        Input,
        {
          value: strVal,
          onChange: (e) => onChange(field.name, e.target.value),
          placeholder: field.placeholder,
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ jsx20(
        "button",
        {
          type: "button",
          onClick: () => {
            setIsCustom(false);
            onChange(field.name, options[0]?.value ?? "");
          },
          className: "shrink-0 rounded-lg border border-bp-elements-borderColor bg-bp-elements-background-depth-3 px-3 py-2 text-xs font-display text-bp-elements-textTertiary transition-colors hover:border-bp-elements-borderColorActive/40 hover:text-bp-elements-textSecondary",
          children: "Presets"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx20("div", { className: "flex gap-2 w-full", children: /* @__PURE__ */ jsx20(
    Select,
    {
      value: strVal,
      onValueChange: (v) => {
        if (v === "__custom__") {
          setIsCustom(true);
          onChange(field.name, "");
        } else {
          onChange(field.name, v);
        }
      },
      options: [...options, { label: "Custom...", value: "__custom__" }],
      className: "flex-1"
    }
  ) });
}

// src/components/forms/BlueprintJobForm.tsx
import { jsx as jsx21, jsxs as jsxs10 } from "react/jsx-runtime";
function BlueprintJobForm({ job, values, onChange, errors, sections }) {
  const visibleFields = job.fields.filter((f) => !f.internal);
  if (sections) {
    return /* @__PURE__ */ jsx21("div", { className: "space-y-6", children: sections.map((section) => {
      const sectionFields = section.fields.map((name) => visibleFields.find((f) => f.name === name)).filter(Boolean);
      if (sectionFields.length === 0) return null;
      if (section.collapsed) {
        return /* @__PURE__ */ jsxs10("details", { className: "group", children: [
          /* @__PURE__ */ jsx21("summary", { className: "cursor-pointer text-sm font-display font-medium text-bp-elements-textTertiary hover:text-bp-elements-textSecondary transition-colors", children: section.label }),
          /* @__PURE__ */ jsx21("div", { className: "mt-4 space-y-4", children: sectionFields.map((field) => /* @__PURE__ */ jsx21(
            FormField,
            {
              field,
              value: values[field.name],
              onChange,
              error: errors?.[field.name]
            },
            field.name
          )) })
        ] }, section.label);
      }
      return /* @__PURE__ */ jsxs10("div", { children: [
        /* @__PURE__ */ jsx21("label", { className: "block text-sm font-display font-medium text-bp-elements-textSecondary mb-3", children: section.label }),
        /* @__PURE__ */ jsx21("div", { className: "space-y-4", children: sectionFields.map((field) => /* @__PURE__ */ jsx21(
          FormField,
          {
            field,
            value: values[field.name],
            onChange,
            error: errors?.[field.name]
          },
          field.name
        )) })
      ] }, section.label);
    }) });
  }
  return /* @__PURE__ */ jsx21("div", { className: "space-y-4", children: visibleFields.map((field) => /* @__PURE__ */ jsx21(
    FormField,
    {
      field,
      value: values[field.name],
      onChange,
      error: errors?.[field.name]
    },
    field.name
  )) });
}

// src/components/forms/FormSummary.tsx
import { jsx as jsx22, jsxs as jsxs11 } from "react/jsx-runtime";
function FormSummary({ job, values, context }) {
  return /* @__PURE__ */ jsxs11("div", { className: "glass-card rounded-lg p-4 space-y-2.5", children: [
    context && Object.entries(context).map(([key, val]) => /* @__PURE__ */ jsx22(SummaryRow, { label: key, value: String(val), mono: true }, key)),
    context && job.fields.length > 0 && /* @__PURE__ */ jsx22("div", { className: "border-t border-bp-elements-dividerColor my-2" }),
    job.fields.filter((f) => !f.internal).map((field) => {
      const v = values[field.name];
      let display;
      if (field.type === "boolean") {
        display = v ? "Enabled" : "Disabled";
      } else if (field.type === "select" && field.options) {
        display = field.options.find((o) => o.value === String(v))?.label ?? String(v ?? "");
      } else {
        display = String(v ?? "--");
      }
      return /* @__PURE__ */ jsx22(SummaryRow, { label: field.label, value: display, mono: field.type === "json" }, field.name);
    })
  ] });
}
function SummaryRow({ label, value, mono }) {
  return /* @__PURE__ */ jsxs11("div", { className: "flex justify-between text-sm", children: [
    /* @__PURE__ */ jsx22("span", { className: "text-bp-elements-textSecondary", children: label }),
    /* @__PURE__ */ jsx22("span", { className: cn("text-bp-elements-textPrimary", mono ? "font-data text-xs" : "font-display"), children: value || "--" })
  ] });
}

// src/components/forms/JobExecutionDialog.tsx
import { useStore as useStore2 } from "@nanostores/react";
import { Fragment, jsx as jsx23, jsxs as jsxs12 } from "react/jsx-runtime";
function JobExecutionDialog({
  open,
  onOpenChange,
  job,
  serviceId,
  context,
  onSuccess
}) {
  const infra = useStore2(infraStore);
  const { values, errors, onChange, validate, reset } = useJobForm(job);
  const { submitJob, status, error: txError, txHash, reset: resetTx } = useSubmitJob();
  const operatorRpcUrl = infra.serviceInfo?.operators?.[0]?.rpcAddress;
  const blueprintId = BigInt(infra.blueprintId || "0");
  const { quote, isLoading: priceLoading, isSolvingPow, formattedPrice, error: priceError } = useJobPrice(
    operatorRpcUrl,
    serviceId,
    job.id,
    blueprintId,
    open && !!operatorRpcUrl && serviceId > 0n
  );
  const estimatedPrice = BigInt(job.pricingMultiplier) * 1000000000000000n;
  const jobValue = quote?.price ?? estimatedPrice;
  const hasRfqPrice = !!quote && !priceError;
  const hasFields = job.fields.filter((f) => !f.internal).length > 0;
  const handleSubmit = async () => {
    if (hasFields && !validate()) return;
    const args = encodeJobArgs(job, values, context);
    const hash = await submitJob({
      serviceId,
      jobId: job.id,
      args,
      label: job.label,
      value: jobValue
    });
    if (hash) {
      onSuccess?.();
    }
  };
  const handleClose = (nextOpen) => {
    if (!nextOpen) {
      reset();
      resetTx();
    }
    onOpenChange(nextOpen);
  };
  return /* @__PURE__ */ jsx23(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxs12(DialogContent, { className: "sm:max-w-lg max-h-[85vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxs12(DialogHeader, { children: [
      /* @__PURE__ */ jsxs12(DialogTitle, { className: "font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsx23("div", { className: `${job.icon} text-lg` }),
        job.label
      ] }),
      /* @__PURE__ */ jsx23(DialogDescription, { children: job.description })
    ] }),
    /* @__PURE__ */ jsxs12("div", { className: "space-y-4 mt-2", children: [
      job.warning && /* @__PURE__ */ jsx23("div", { className: "glass-card rounded-lg p-3 border-amber-500/30", children: /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx23("div", { className: "i-ph:warning text-sm text-amber-400" }),
        /* @__PURE__ */ jsx23("p", { className: "text-xs text-amber-400", children: job.warning })
      ] }) }),
      hasFields && /* @__PURE__ */ jsx23(BlueprintJobForm, { job, values, onChange, errors }),
      /* @__PURE__ */ jsxs12("div", { className: "glass-card rounded-lg p-3", children: [
        /* @__PURE__ */ jsxs12("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx23("div", { className: "i-ph:tag text-sm text-bp-elements-textTertiary" }),
            /* @__PURE__ */ jsx23("span", { className: "text-sm font-display text-bp-elements-textSecondary", children: "Job Price" })
          ] }),
          /* @__PURE__ */ jsx23("div", { className: "flex items-center gap-2", children: priceLoading || isSolvingPow ? /* @__PURE__ */ jsx23("span", { className: "text-xs font-data text-bp-elements-textTertiary animate-pulse", children: isSolvingPow ? "Solving PoW..." : "Fetching quote..." }) : /* @__PURE__ */ jsx23("span", { className: cn(
            "text-sm font-data font-semibold",
            hasRfqPrice ? "text-teal-400" : "text-bp-elements-textSecondary"
          ), children: hasRfqPrice ? formattedPrice : `~${formatCost(estimatedPrice)}` }) })
        ] }),
        hasRfqPrice && /* @__PURE__ */ jsxs12("p", { className: "text-[10px] text-bp-elements-textTertiary mt-1.5", children: [
          "Signed quote from operator \u2014 expires in ",
          Math.max(0, Number(quote.expiry) - Math.floor(Date.now() / 1e3)),
          "s"
        ] }),
        !hasRfqPrice && !priceLoading && /* @__PURE__ */ jsxs12("p", { className: "text-[10px] text-bp-elements-textTertiary mt-1.5", children: [
          "Estimate (",
          job.pricingMultiplier,
          "x base rate) \u2014 no operator RFQ available"
        ] })
      ] }),
      status !== "idle" && /* @__PURE__ */ jsx23(
        "div",
        {
          className: cn(
            "glass-card rounded-lg p-3",
            status === "confirmed" && "border-teal-500/30",
            status === "failed" && "border-crimson-500/30"
          ),
          children: /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-3", children: [
            (status === "signing" || status === "pending") && /* @__PURE__ */ jsx23("div", { className: "i-ph:circle-fill text-sm text-blue-400 animate-pulse" }),
            status === "confirmed" && /* @__PURE__ */ jsx23("div", { className: "i-ph:check-circle-fill text-sm text-teal-400" }),
            status === "failed" && /* @__PURE__ */ jsx23("div", { className: "i-ph:x-circle-fill text-sm text-crimson-400" }),
            /* @__PURE__ */ jsxs12("div", { children: [
              /* @__PURE__ */ jsxs12("p", { className: "text-sm font-display font-medium text-bp-elements-textPrimary", children: [
                status === "signing" && "Waiting for wallet signature...",
                status === "pending" && "Transaction submitted...",
                status === "confirmed" && "Transaction confirmed!",
                status === "failed" && "Transaction failed"
              ] }),
              txHash && /* @__PURE__ */ jsxs12("p", { className: "text-xs font-data text-bp-elements-textTertiary mt-0.5 truncate max-w-xs", children: [
                "TX: ",
                txHash
              ] }),
              txError && /* @__PURE__ */ jsx23("p", { className: "text-xs text-crimson-400 mt-0.5", children: txError })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs12("div", { className: "flex justify-end gap-2 pt-2", children: [
        /* @__PURE__ */ jsx23(Button, { variant: "secondary", onClick: () => handleClose(false), children: status === "confirmed" ? "Close" : "Cancel" }),
        status !== "confirmed" && /* @__PURE__ */ jsx23(
          Button,
          {
            onClick: handleSubmit,
            disabled: status === "signing" || status === "pending" || priceLoading,
            children: status === "signing" || status === "pending" ? /* @__PURE__ */ jsxs12(Fragment, { children: [
              /* @__PURE__ */ jsx23("div", { className: "i-ph:circle-fill text-sm animate-pulse" }),
              "Submitting..."
            ] }) : priceLoading ? "Loading price..." : /* @__PURE__ */ jsxs12(Fragment, { children: [
              "Submit (",
              hasRfqPrice ? formattedPrice : `~${formatCost(estimatedPrice)}`,
              ")"
            ] })
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  AnimatedPage,
  AppDocument,
  AppFooter,
  AppToaster,
  Badge,
  BlueprintHostHero,
  BlueprintHostPanel,
  BlueprintJobForm,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChainSwitcher,
  ConnectWalletCta,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormField,
  FormSummary,
  Identicon,
  Input,
  JobExecutionDialog,
  Select,
  Separator,
  Skeleton,
  StaggerContainer,
  StaggerItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TangleLogo,
  Textarea,
  ThemeToggle,
  Toggle,
  Web3Shell,
  badgeVariants,
  buttonVariants
};
//# sourceMappingURL=components.js.map