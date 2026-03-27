"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type CollapsibleVariant = "default" | "outline" | "ghost" | "card" | "flush";

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: CollapsibleVariant;
  disabled?: boolean;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showChevron?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  openClassName?: string;
  className?: string;
  children: React.ReactNode;
}

// ─── Context ──────────────────────────────────────────────
interface CollapsibleCtx {
  open: boolean;
  toggle: () => void;
  disabled: boolean;
  duration: number;
  triggerId: string;
  contentId: string;
}

// ✅ Exported so page components can consume it
export const CollapsibleContext = React.createContext<CollapsibleCtx | undefined>(undefined);

export function useCollapsible(): CollapsibleCtx {
  const ctx = React.useContext(CollapsibleContext);
  if (!ctx) throw new Error("Must be inside <Collapsible>");
  return ctx;
}

// ─── Variant styles ───────────────────────────────────────
const CONTAINER_VARIANTS: Record<CollapsibleVariant, string> = {
  default: "rounded-xl bg-muted/40 border border-border/50",
  outline: "rounded-xl border border-border bg-background",
  ghost: "rounded-xl",
  card: "rounded-2xl border border-border/60 bg-card shadow-sm",
  flush: "border-b border-border/50 last:border-0",
};

const TRIGGER_VARIANTS: Record<CollapsibleVariant, string> = {
  default: "px-4 py-3 rounded-xl hover:bg-muted/60",
  outline: "px-4 py-3 rounded-xl hover:bg-muted/50",
  ghost: "px-3 py-2.5 rounded-xl hover:bg-muted/60",
  card: "px-5 py-4 rounded-t-2xl hover:bg-muted/30",
  flush: "py-3.5 hover:text-foreground",
};

// ─── Collapsible ──────────────────────────────────────────
export function Collapsible({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  variant = "default",
  disabled = false,
  duration = 220,
  className,
  children,
  ...props
}: CollapsibleProps) {
  const [ uncontrolled, setUncontrolled ] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolled;

  const toggle = React.useCallback(() => {
    if (disabled) return;
    const next = !open;
    if (!isControlled) setUncontrolled(next);
    onOpenChange?.(next);
  }, [ disabled, open, isControlled, onOpenChange ]);

  const id = React.useId();
  const triggerId = `col-trigger-${id}`;
  const contentId = `col-content-${id}`;

  return (
    <CollapsibleContext.Provider
      value={ { open, toggle, disabled, duration, triggerId, contentId } }
    >
      <div
        data-state={ open ? "open" : "closed" }
        data-disabled={ disabled ? "" : undefined }
        className={ cn(CONTAINER_VARIANTS[ variant ], className) }
        { ...props }
      >
        { children }
      </div>
    </CollapsibleContext.Provider>
  );
}

// ─── CollapsibleTrigger ───────────────────────────────────
export function CollapsibleTrigger({
  showChevron = true,
  className,
  children,
  disabled: triggerDisabled,
  ...props
}: CollapsibleTriggerProps) {
  const ctx = useCollapsible();
  const isDisabled = triggerDisabled ?? ctx.disabled;

  return (
    <button
      type="button"
      id={ ctx.triggerId }
      aria-expanded={ ctx.open }
      aria-controls={ ctx.contentId }
      disabled={ isDisabled }
      onClick={ ctx.toggle }
      className={ cn(
        "flex w-full items-center justify-between gap-2",
        "text-sm font-medium text-foreground",
        "transition-colors duration-150 select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50 p-3",
        className
      ) }
      { ...props }
    >
      { children }
      { showChevron && (
        <ChevronDown
          className={ cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            ctx.open && "rotate-180"
          ) }
          style={ { transitionDuration: `${ctx.duration}ms` } }
        />
      ) }
    </button>
  );
}

// ─── CollapsibleContent ───────────────────────────────────
export function CollapsibleContent({
  openClassName,
  className,
  children,
  ...props
}: CollapsibleContentProps) {
  const ctx = useCollapsible();
  const ref = React.useRef<HTMLDivElement>(null);
  const [ height, setHeight ] = React.useState<number | "auto">(
    ctx.open ? "auto" : 0
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (ctx.open) {
      // Measure → animate to exact height → then set auto
      const measured = el.scrollHeight;
      setHeight(measured);
      const id = setTimeout(() => setHeight("auto"), ctx.duration);
      return () => clearTimeout(id);
    } else {
      // Snap from auto → measured → 0
      const measured = el.scrollHeight;
      setHeight(measured);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
      return () => cancelAnimationFrame(id as unknown as number);
    }
  }, [ ctx.open, ctx.duration ]);

  return (
    <div
      id={ ctx.contentId }
      role="region"
      aria-labelledby={ ctx.triggerId }
      hidden={ !ctx.open && height === 0 }
      ref={ ref }
      className={ cn(
        "overflow-hidden",
        ctx.open && openClassName,
        className
      ) }
      style={ {
        height: height === "auto" ? "auto" : `${height}px`,
        transition: height !== "auto"
          ? `height ${ctx.duration}ms cubic-bezier(0.4,0,0.2,1)`
          : undefined,
      } }
      { ...props }
    >
      { children }
    </div>
  );
}
