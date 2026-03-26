"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type DrawerSide = "left" | "right" | "top" | "bottom";
export type DrawerSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Which edge the drawer slides from */
  side?: DrawerSide;
}

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: DrawerSide;
  size?: DrawerSize;
  /** Show X close button */
  showClose?: boolean;
  /** Click backdrop to close */
  closeOnBackdrop?: boolean;
  /** Show drag handle (bottom/top drawers) */
  showHandle?: boolean;
  onClose?: () => void;
}

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }
export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> { }
export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }
export interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }
export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> { }

// ─── Context ──────────────────────────────────────────────
interface DrawerCtx {
  open: boolean;
  close: () => void;
  side: DrawerSide;
  titleId: string;
  descId: string;
}

const DrawerContext = React.createContext<DrawerCtx | null>(null);

function useDrawerCtx() {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) throw new Error("Must be inside <Drawer>");
  return ctx;
}

// ─── Size maps ────────────────────────────────────────────
const HORIZONTAL_SIZES: Record<DrawerSize, string> = {
  xs: "w-64",
  sm: "w-80",
  md: "w-96",
  lg: "w-[30rem]",
  xl: "w-[40rem]",
  full: "w-screen",
};

const VERTICAL_SIZES: Record<DrawerSize, string> = {
  xs: "h-[25vh]",
  sm: "h-[35vh]",
  md: "h-[50vh]",
  lg: "h-[65vh]",
  xl: "h-[80vh]",
  full: "h-screen",
};

// ─── Slide-in/out transforms ──────────────────────────────
const HIDDEN_TRANSFORM: Record<DrawerSide, string> = {
  left: "-translate-x-full",
  right: "translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

// ─── Drawer ───────────────────────────────────────────────
export function Drawer({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = "right",
}: DrawerProps) {
  const [ uncontrolled, setUncontrolled ] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? (controlledOpen ?? false) : uncontrolled;

  const close = React.useCallback(() => {
    if (!isControlled) setUncontrolled(false);
    onOpenChange?.(false);
  }, [ isControlled, onOpenChange ]);

  const uid = React.useId();
  const titleId = `drawer-title-${uid}`;
  const descId = `drawer-desc-${uid}`;

  // Lock body scroll when open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [ open ]);

  // Escape key
  React.useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [ open, close ]);

  return (
    <DrawerContext.Provider value={ { open, close, side, titleId, descId } }>
      { children }
    </DrawerContext.Provider>
  );
}

// ─── DrawerTrigger ────────────────────────────────────────
export function DrawerTrigger({
  children,
  asChild = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }) {
  const ctx = React.useContext(DrawerContext);
  const open = () => { /* handled via DrawerContext onOpenChange */ };

  const handleClick = (e: React.MouseEvent) => {
    // bubble up; consumer controls open state
    (props as React.HTMLAttributes<HTMLElement> & { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
      { className: cn((children as React.ReactElement<{ className?: string }>).props.className, className), ...props }
    );
  }
  return <div className={ cn("contents", className) } onClick={ handleClick } { ...props }>{ children }</div>;
}

// ─── DrawerPortal ─────────────────────────────────────────
export function DrawerPortal({ children }: { children: React.ReactNode }) {
  const [ mounted, setMounted ] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{ children }</>;
}

// ─── DrawerOverlay ────────────────────────────────────────
export const DrawerOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, onClick, ...props }, ref) => {
  const { open, close } = useDrawerCtx();
  return (
    <div
      ref={ ref }
      aria-hidden
      onClick={ e => { close(); onClick?.(e); } }
      className={ cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]",
        "transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        className
      ) }
      { ...props }
    />
  );
});
DrawerOverlay.displayName = "DrawerOverlay";

// ─── DrawerContent ────────────────────────────────────────
export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  (
    {
      className,
      side: sideProp,
      size = "md",
      showClose = true,
      closeOnBackdrop = true,
      showHandle = true,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const { open, close, side: ctxSide, titleId, descId } = useDrawerCtx();
    const side = sideProp ?? ctxSide;
    const isHorizontal = side === "left" || side === "right";

    const handleClose = () => { close(); onClose?.(); };

    return (
      <DrawerPortal>
        {/* Backdrop */ }
        { closeOnBackdrop && (
          <div
            aria-hidden
            onClick={ handleClose }
            className={ cn(
              "fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]",
              "transition-opacity duration-300",
              open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            ) }
          />
        ) }

        {/* Panel */ }
        <div
          ref={ ref }
          role="dialog"
          aria-modal
          aria-labelledby={ titleId }
          aria-describedby={ descId }
          data-state={ open ? "open" : "closed" }
          data-side={ side }
          className={ cn(
            // Position
            "fixed z-50 flex flex-col",
            "bg-background",
            side === "left" && "inset-y-0 left-0 border-r border-border/60",
            side === "right" && "inset-y-0 right-0 border-l border-border/60",
            side === "top" && "inset-x-0 top-0 border-b border-border/60",
            side === "bottom" && "inset-x-0 bottom-0 border-t border-border/60 rounded-t-3xl",
            // Size
            isHorizontal ? HORIZONTAL_SIZES[ size ] : VERTICAL_SIZES[ size ],
            // Shadow
            "shadow-2xl shadow-black/20 dark:shadow-black/50",
            // Slide transition
            "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            open ? "translate-x-0 translate-y-0" : HIDDEN_TRANSFORM[ side ],
            className
          ) }
          { ...props }
        >
          {/* Drag handle — top/bottom only */ }
          { showHandle && !isHorizontal && (
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div
                className="w-10 h-1 rounded-full bg-muted-foreground/25 cursor-grab active:cursor-grabbing"
                aria-hidden
              />
            </div>
          ) }

          {/* Close button */ }
          { showClose && (
            <button
              type="button"
              onClick={ handleClose }
              aria-label="Close drawer"
              className={ cn(
                "absolute top-4 right-4 z-10",
                "rounded-xl p-1.5",
                "text-muted-foreground/60 hover:text-foreground",
                "hover:bg-muted/60 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              ) }
            >
              <X className="h-4 w-4" />
            </button>
          ) }

          { children }
        </div>
      </DrawerPortal>
    );
  }
);
DrawerContent.displayName = "DrawerContent";

// ─── DrawerHeader ─────────────────────────────────────────
export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ ref }
      className={ cn("flex flex-col gap-1 px-6 pt-6 pb-3 shrink-0", className) }
      { ...props }
    />
  )
);
DrawerHeader.displayName = "DrawerHeader";

// ─── DrawerTitle ──────────────────────────────────────────
export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => {
    const { titleId } = useDrawerCtx();
    return (
      <h2
        ref={ ref }
        id={ titleId }
        className={ cn("text-lg font-semibold leading-tight text-foreground", className) }
        { ...props }
      />
    );
  }
);
DrawerTitle.displayName = "DrawerTitle";

// ─── DrawerDescription ────────────────────────────────────
export const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { descId } = useDrawerCtx();
    return (
      <p
        ref={ ref }
        id={ descId }
        className={ cn("text-sm text-muted-foreground leading-relaxed", className) }
        { ...props }
      />
    );
  }
);
DrawerDescription.displayName = "DrawerDescription";

// ─── DrawerBody ───────────────────────────────────────────
export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ ref }
      className={ cn("flex-1 overflow-y-auto px-6 py-3", className) }
      { ...props }
    />
  )
);
DrawerBody.displayName = "DrawerBody";

// ─── DrawerFooter ─────────────────────────────────────────
export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ ref }
      className={ cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2",
        "px-6 pt-3 pb-6 shrink-0",
        "border-t border-border/60 bg-muted/20",
        className
      ) }
      { ...props }
    />
  )
);
DrawerFooter.displayName = "DrawerFooter";

// ─── DrawerClose ──────────────────────────────────────────
export function DrawerClose({
  children,
  className,
  asChild = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }) {
  const { close } = useDrawerCtx();
  const merged = { ...props, onClick: (e: React.MouseEvent) => { close(); (props as React.HTMLAttributes<HTMLElement> & { onClick?: (e: React.MouseEvent) => void }).onClick?.(e); } };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
      { className: cn((children as React.ReactElement<{ className?: string }>).props.className, className), ...merged }
    );
  }
  return <div className={ cn("contents", className) } { ...merged }>{ children }</div>;
}
