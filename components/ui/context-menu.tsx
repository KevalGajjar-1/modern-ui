"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, Circle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type ContextMenuItemVariant = "default" | "destructive";

export interface ContextMenuProps {
  children:  React.ReactNode;
  disabled?: boolean;
}

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
}

export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:  ContextMenuItemVariant;
  disabled?: boolean;
  inset?:    boolean;
}

export interface ContextMenuCheckboxItemProps extends ContextMenuItemProps {
  checked?:         boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface ContextMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?:         string;
  onValueChange?: (value: string) => void;
}

export interface ContextMenuRadioItemProps extends ContextMenuItemProps {
  value: string;
}

export interface ContextMenuSubProps {
  children: React.ReactNode;
}

export interface ContextMenuSubTriggerProps extends ContextMenuItemProps {}
export interface ContextMenuSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

// ─── Context ──────────────────────────────────────────────
interface ContextMenuCtx {
  open:     boolean;
  position: { x: number; y: number };
  close:    () => void;
  disabled: boolean;
}

const ContextMenuContext = React.createContext<ContextMenuCtx>({
  open:     false,
  position: { x: 0, y: 0 },
  close:    () => {},
  disabled: false,
});

interface RadioGroupCtx {
  value?:         string;
  onValueChange?: (v: string) => void;
}
const RadioGroupContext = React.createContext<RadioGroupCtx>({});

interface SubCtx {
  isOpen:    boolean;
  setIsOpen: (v: boolean) => void;
}
const SubContext = React.createContext<SubCtx | null>(null);

// ─── Shared item styles ───────────────────────────────────
function itemCn(
  variant: ContextMenuItemVariant = "default",
  disabled = false,
  inset    = false,
  extra    = ""
) {
  return cn(
    "relative flex cursor-pointer select-none items-center gap-2",
    "rounded-lg px-2.5 py-1.5 text-sm outline-none",
    "transition-colors duration-100",
    inset && "pl-8",
    variant === "destructive"
      ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 focus:bg-red-50 dark:focus:bg-red-950/40"
      : "text-foreground/85 hover:bg-muted/70 hover:text-foreground focus:bg-muted/70 focus:text-foreground",
    disabled && "pointer-events-none opacity-40",
    extra
  );
}

// ─── ContextMenu ──────────────────────────────────────────
export function ContextMenu({ children, disabled = false }: ContextMenuProps) {
  const [open, setOpen]     = React.useState(false);
  const [pos,  setPos]      = React.useState({ x: 0, y: 0 });
  const menuRef             = React.useRef<HTMLDivElement | null>(null);

  const close = React.useCallback(() => setOpen(false), []);

  // Keyboard & outside click
  React.useEffect(() => {
    if (!open) return;
    const onKey     = (e: KeyboardEvent)      => { if (e.key === "Escape") close(); };
    const onPointer = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown",     onKey);
    document.addEventListener("pointerdown", onPointer, true);
    return () => {
      document.removeEventListener("keydown",     onKey);
      document.removeEventListener("pointerdown", onPointer, true);
    };
  }, [open, close]);

  // Body scroll lock
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Separate trigger area from menu portal
  const children_arr = React.Children.toArray(children);
  const trigger      = children_arr.find(
    c => React.isValidElement(c) && (c.type as React.FC).displayName === "ContextMenuTrigger"
  );
  const content      = children_arr.find(
    c => React.isValidElement(c) && (c.type as React.FC).displayName === "ContextMenuContent"
  );

  const handleContextMenu = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();

    // Clamp to viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const MENU_W = 220;
    const MENU_H = 300; // estimated
    const x = Math.min(e.clientX, vw - MENU_W - 8);
    const y = Math.min(e.clientY, vh - MENU_H - 8);

    setPos({ x: x + window.scrollX, y: y + window.scrollY });
    setOpen(true);
  };

  return (
    <ContextMenuContext.Provider value={{ open, position: pos, close, disabled }}>
      <div onContextMenu={handleContextMenu} className="contents">
        {trigger}
      </div>
      {/* Menu renders in a fixed portal */}
      {open && (
        <ContextMenuPortal menuRef={menuRef} pos={pos}>
          {content}
        </ContextMenuPortal>
      )}
    </ContextMenuContext.Provider>
  );
}

// ─── Portal wrapper ───────────────────────────────────────
function ContextMenuPortal({
  children,
  menuRef,
  pos,
}: {
  children:  React.ReactNode;
  menuRef:   React.RefObject<HTMLDivElement | null>;
  pos:       { x: number; y: number };
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  // Use a wrapper div absolutely placed in the document
  return (
    <div
      ref={menuRef as React.RefObject<HTMLDivElement>}
      style={{
        position: "fixed",
        top:  pos.y - window.scrollY,
        left: pos.x - window.scrollX,
        zIndex: 9999,
      }}
    >
      {children}
    </div>
  );
}

// ─── ContextMenuTrigger ───────────────────────────────────
export function ContextMenuTrigger({
  children,
  className,
  asChild = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
      { className: cn((children as React.ReactElement<{ className?: string }>).props.className, className), ...props }
    );
  }
  return <div className={cn("", className)} {...props}>{children}</div>;
}
(ContextMenuTrigger as React.FC).displayName = "ContextMenuTrigger";

// ─── ContextMenuContent ───────────────────────────────────
export const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open } = React.useContext(ContextMenuContext);
    return (
      <div
        ref={ref}
        role="menu"
        data-state={open ? "open" : "closed"}
        className={cn(
          "min-w-[13rem] rounded-2xl border border-border/60 bg-popover p-1.5",
          "shadow-xl shadow-black/[0.10] dark:shadow-black/30",
          "animate-in fade-in zoom-in-95 duration-150 origin-top-left",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ContextMenuContent.displayName = "ContextMenuContent";

// ─── ContextMenuItem ──────────────────────────────────────
export const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, variant = "default", disabled = false, inset = false, onClick, children, ...props }, ref) => {
    const { close } = React.useContext(ContextMenuContext);
    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={e => { if (disabled) return; onClick?.(e); close(); }}
        onKeyDown={e => { if ((e.key === "Enter" || e.key === " ") && !disabled) { e.preventDefault(); (e.currentTarget as HTMLDivElement).click(); }}}
        className={cn(itemCn(variant, disabled, inset), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ContextMenuItem.displayName = "ContextMenuItem";

// ─── ContextMenuCheckboxItem ──────────────────────────────
export const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ className, checked = false, onCheckedChange, disabled, inset, children, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={e => { if (disabled) return; onCheckedChange?.(!checked); onClick?.(e); }}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-sm",
          "transition-colors hover:bg-muted/70 focus:bg-muted/70 outline-none",
          "text-foreground/85 hover:text-foreground",
          disabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <Check className="h-3.5 w-3.5" />}
        </span>
        {children}
      </div>
    );
  }
);
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

// ─── ContextMenuRadioGroup ────────────────────────────────
export function ContextMenuRadioGroup({
  value, onValueChange, children, ...props
}: ContextMenuRadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group" {...props}>{children}</div>
    </RadioGroupContext.Provider>
  );
}

// ─── ContextMenuRadioItem ─────────────────────────────────
export const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ className, value, disabled, children, onClick, ...props }, ref) => {
    const { value: groupVal, onValueChange } = React.useContext(RadioGroupContext);
    const checked = groupVal === value;
    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={e => { if (disabled) return; onValueChange?.(value); onClick?.(e); }}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-sm",
          "transition-colors hover:bg-muted/70 focus:bg-muted/70 outline-none",
          "text-foreground/85 hover:text-foreground",
          disabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <Circle className="h-2 w-2 fill-current" />}
        </span>
        {children}
      </div>
    );
  }
);
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

// ─── ContextMenuSub ───────────────────────────────────────
export function ContextMenuSub({ children }: ContextMenuSubProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <SubContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
    </SubContext.Provider>
  );
}

// ─── ContextMenuSubTrigger ────────────────────────────────
export const ContextMenuSubTrigger = React.forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  ({ className, inset = false, children, ...props }, ref) => {
    const sub = React.useContext(SubContext);
    return (
      <div
        ref={ref}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={sub?.isOpen}
        className={cn(
          "flex cursor-pointer select-none items-center rounded-lg px-2.5 py-1.5 text-sm",
          "transition-colors hover:bg-muted/70 hover:text-foreground outline-none",
          "text-foreground/85",
          inset && "pl-8",
          sub?.isOpen && "bg-muted/60 text-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
      </div>
    );
  }
);
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

// ─── ContextMenuSubContent ────────────────────────────────
export const ContextMenuSubContent = React.forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ className, children, ...props }, ref) => {
    const sub = React.useContext(SubContext);
    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          "absolute left-full top-0 ml-1 z-[10000] min-w-[12rem]",
          "rounded-2xl border border-border/60 bg-popover p-1.5",
          "shadow-xl shadow-black/[0.10] dark:shadow-black/30",
          "transition-all duration-150 origin-top-left",
          sub?.isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ContextMenuSubContent.displayName = "ContextMenuSubContent";

// ─── ContextMenuLabel ─────────────────────────────────────
export const ContextMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 select-none",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = "ContextMenuLabel";

// ─── ContextMenuSeparator ─────────────────────────────────
export const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("my-1 h-px bg-border/60", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = "ContextMenuSeparator";

// ─── ContextMenuShortcut ──────────────────────────────────
export function ContextMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto pl-5 text-[11px] font-medium tracking-widest text-muted-foreground/50 select-none",
        className
      )}
      aria-hidden
      {...props}
    />
  );
}
