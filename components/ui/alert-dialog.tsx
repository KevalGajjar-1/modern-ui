"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, AlertTriangle, Info, CheckCircle2, HelpCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type AlertDialogVariant =
  | "default" | "destructive" | "warning" | "success" | "info";

export interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertDialogVariant;
  showClose?: boolean;
  closeOnBackdrop?: boolean;
  width?: string;
  onClose?: () => void;
}

export interface AlertDialogActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "ghost" | "secondary";
}

// ─── Single context ───────────────────────────────────────
interface AlertDialogCtx {
  open: boolean;
  openDialog: () => void;
  onClose: () => void;
  titleId: string;
  descId: string;
}

const AlertDialogContext = React.createContext<AlertDialogCtx | undefined>(undefined);

function useAlertDialogCtx(): AlertDialogCtx {
  const ctx = React.useContext(AlertDialogContext);
  if (ctx === undefined)
    throw new Error("AlertDialog sub-components must be used inside <AlertDialog>");
  return ctx;
}

// ─── Variant maps ─────────────────────────────────────────
const VARIANT_ICONS: Record<AlertDialogVariant, React.ReactNode> = {
  default: <HelpCircle className="h-5 w-5" />,
  destructive: <AlertTriangle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

const VARIANT_ICON_STYLES: Record<AlertDialogVariant, string> = {
  default: "bg-muted text-foreground",
  destructive: "bg-red-100     text-red-600     dark:bg-red-950/50     dark:text-red-400",
  warning: "bg-amber-100   text-amber-600   dark:bg-amber-950/50   dark:text-amber-400",
  success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
  info: "bg-blue-100    text-blue-600    dark:bg-blue-950/50    dark:text-blue-400",
};

// ─── Root ─────────────────────────────────────────────────
export function AlertDialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: AlertDialogProps) {
  const [ uncontrolled, setUncontrolled ] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolled;

  const openDialog = React.useCallback(() => {
    if (!isControlled) setUncontrolled(true);
    onOpenChange?.(true);
  }, [ isControlled, onOpenChange ]);

  const onClose = React.useCallback(() => {
    if (!isControlled) setUncontrolled(false);
    onOpenChange?.(false);
  }, [ isControlled, onOpenChange ]);

  const id = React.useId();
  const titleId = `ad-title-${id}`;
  const descId = `ad-desc-${id}`;

  // Body scroll lock
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [ open ]);

  // Escape key
  React.useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [ open, onClose ]);

  return (
    <AlertDialogContext.Provider
      value={ { open, openDialog, onClose, titleId, descId } }
    >
      { children }
    </AlertDialogContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────
export function AlertDialogTrigger({
  children,
  asChild = false,
  ...props
}: {
  children: React.ReactNode;
  asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  const { openDialog } = useAlertDialogCtx();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
      { onClick: openDialog } as React.HTMLAttributes<HTMLElement>
    );
  }

  return (
    <span
      role="button"
      tabIndex={ 0 }
      onKeyDown={ e => e.key === "Enter" && openDialog() }
      onClick={ openDialog }
      style={ { display: "contents" } }
      { ...props }
    >
      { children }
    </span>
  );
}

// ─── Content (backdrop + card) ────────────────────────────
export const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(
  (
    {
      className,
      variant = "default",
      showClose = false,
      closeOnBackdrop = false,
      width = "28rem",
      onClose: onCloseProp,
      children,
      ...props
    },
    ref
  ) => {
    const ctx = useAlertDialogCtx();
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Merge forwarded ref + local ref
    const setRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      },
      [ ref ]
    );

    const close = onCloseProp ?? ctx.onClose;

    // Focus trap
    React.useEffect(() => {
      if (!ctx.open) return;
      const el = contentRef.current;
      if (!el) return;

      const focusable = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable[ 0 ]?.focus();

      const trap = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        const first = focusable[ 0 ];
        const last = focusable[ focusable.length - 1 ];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first?.focus();
        }
      };

      document.addEventListener("keydown", trap);
      return () => document.removeEventListener("keydown", trap);
    }, [ ctx.open ]);

    if (!ctx.open) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="alertdialog"
        aria-modal
        aria-labelledby={ ctx.titleId }
        aria-describedby={ ctx.descId }
      >
        {/* Backdrop */ }
        <div
          aria-hidden
          className={ cn(
            "absolute inset-0 bg-black/50 backdrop-blur-[2px]",
            "animate-in fade-in duration-150"
          ) }
          onClick={ closeOnBackdrop ? close : undefined }
        />

        {/* Card */ }
        <div
          ref={ setRef }
          className={ cn(
            "relative z-10 w-full rounded-2xl bg-background",
            "border border-border/60 shadow-2xl dark:shadow-black/50",
            "animate-in zoom-in-95 fade-in duration-200",
            className
          ) }
          style={ { maxWidth: width } }
          { ...props }
        >
          { showClose && (
            <button
              type="button"
              aria-label="Close"
              onClick={ close }
              className={ cn(
                "absolute top-3.5 right-3.5 rounded-lg p-1.5",
                "text-muted-foreground/60 hover:text-foreground hover:bg-muted/60",
                "transition-colors focus:outline-none focus:outline-2 focus:outline-ring"
              ) }
            >
              <X className="h-4 w-4" />
            </button>
          ) }
          { children }
        </div>
      </div>
    );
  }
);
AlertDialogContent.displayName = "AlertDialogContent";

// ─── Header ───────────────────────────────────────────────
export function AlertDialogHeader({
  className,
  variant = "default",
  icon,
  showIcon = true,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: AlertDialogVariant;
  icon?: React.ReactNode;
  showIcon?: boolean;
}) {
  return (
    <div
      className={ cn(
        "flex flex-col items-center gap-4 px-6 pt-6 pb-2 text-center",
        className
      ) }
      { ...props }
    >
      { showIcon && (
        <div className={ cn(
          "flex items-center justify-center w-12 h-12 rounded-full shrink-0",
          VARIANT_ICON_STYLES[ variant ]
        ) }>
          { icon ?? VARIANT_ICONS[ variant ] }
        </div>
      ) }
      { children }
    </div>
  );
}

// ─── Title ────────────────────────────────────────────────
export function AlertDialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { titleId } = useAlertDialogCtx();
  return (
    <h2
      id={ titleId }
      className={ cn(
        "text-lg font-semibold leading-tight text-foreground",
        className
      ) }
      { ...props }
    />
  );
}

// ─── Description ──────────────────────────────────────────
export function AlertDialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { descId } = useAlertDialogCtx();
  return (
    <p
      id={ descId }
      className={ cn(
        "text-sm text-muted-foreground leading-relaxed",
        className
      ) }
      { ...props }
    />
  );
}

// ─── Footer ───────────────────────────────────────────────
export function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={ cn(
        "flex flex-col-reverse gap-2 px-6 pb-6 pt-4",
        "sm:flex-row sm:justify-end",
        className
      ) }
      { ...props }
    />
  );
}

// ─── Action button ────────────────────────────────────────
export const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ className, variant = "default", ...props }, ref) => {
  const ACTION_STYLES: Record<string, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600",
    outline: "border border-input bg-transparent hover:bg-muted hover:text-foreground",
    ghost: "bg-transparent hover:bg-muted",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };

  return (
    <button
      ref={ ref }
      type="button"
      className={ cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 h-10",
        "text-sm font-semibold transition-all duration-150",
        "focus:outline-none focus:outline-2 focus:outline-ring focus:outline-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        ACTION_STYLES[ variant ],
        className
      ) }
      { ...props }
    />
  );
});
AlertDialogAction.displayName = "AlertDialogAction";

// ─── Cancel button ────────────────────────────────────────
export const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { onClose } = useAlertDialogCtx();
  return (
    <button
      ref={ ref }
      type="button"
      onClick={ e => { onClose(); onClick?.(e); } }
      className={ cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 h-10",
        "text-sm font-medium border border-input bg-transparent text-foreground",
        "hover:bg-muted transition-all duration-150",
        "focus:outline-none focus:outline-2 focus:outline-ring focus:outline-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      ) }
      { ...props }
    />
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";
