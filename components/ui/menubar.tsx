"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, Circle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type MenubarItemVariant = "default" | "destructive";

export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface MenubarMenuProps {
  children: React.ReactNode;
}

export interface MenubarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface MenubarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export interface MenubarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:   MenubarItemVariant;
  disabled?:  boolean;
  inset?:     boolean;
}

export interface MenubarCheckboxItemProps extends MenubarItemProps {
  checked?:          boolean;
  onCheckedChange?:  (checked: boolean) => void;
}

export interface MenubarRadioItemProps extends MenubarItemProps {
  value: string;
}

export interface MenubarRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?:          string;
  onValueChange?:  (value: string) => void;
}

export interface MenubarSubProps {
  children: React.ReactNode;
}

export interface MenubarSubTriggerProps extends MenubarItemProps {}

export interface MenubarSubContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface MenubarShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

// ─── Context ──────────────────────────────────────────────
interface MenubarCtx {
  activeMenu:    string | null;
  setActiveMenu: (id: string | null) => void;
  isOpen:        boolean;
}

const MenubarContext = React.createContext<MenubarCtx>({
  activeMenu:    null,
  setActiveMenu: () => {},
  isOpen:        false,
});

interface MenuCtx {
  menuId:    string;
  isOpen:    boolean;
  triggerId: string;
  contentId: string;
}

const MenuContext = React.createContext<MenuCtx | null>(null);

function useMenuCtx() {
  const ctx = React.useContext(MenuContext);
  if (!ctx) throw new Error("Must be inside <MenubarMenu>");
  return ctx;
}

interface RadioGroupCtx {
  value?:         string;
  onValueChange?: (v: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupCtx>({});

interface SubCtx {
  isOpen:     boolean;
  setIsOpen:  (v: boolean) => void;
  subId:      string;
}

const SubContext = React.createContext<SubCtx | null>(null);

// ─── Menubar ──────────────────────────────────────────────
export const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, children, ...props }, ref) => {
    const [activeMenu, setActiveMenuRaw] = React.useState<string | null>(null);
    const rootRef = React.useRef<HTMLDivElement | null>(null);

    const setRef = (el: HTMLDivElement | null) => {
      rootRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };

    const setActiveMenu = React.useCallback((id: string | null) => {
      setActiveMenuRaw(id);
    }, []);

    // Close on outside click or Escape
    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveMenuRaw(null);
      };
      const onPointer = (e: PointerEvent) => {
        if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
          setActiveMenuRaw(null);
        }
      };
      document.addEventListener("keydown",     onKey);
      document.addEventListener("pointerdown", onPointer);
      return () => {
        document.removeEventListener("keydown",     onKey);
        document.removeEventListener("pointerdown", onPointer);
      };
    }, []);

    return (
      <MenubarContext.Provider value={{ activeMenu, setActiveMenu, isOpen: !!activeMenu }}>
        <div
          ref={setRef}
          role="menubar"
          className={cn(
            "flex items-center gap-0.5",
            "rounded-xl border border-border/60 bg-background",
            "px-1.5 py-1",
            "shadow-sm",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </MenubarContext.Provider>
    );
  }
);
Menubar.displayName = "Menubar";

// ─── MenubarMenu ──────────────────────────────────────────
export function MenubarMenu({ children }: MenubarMenuProps) {
  const uid       = React.useId();
  const menuId    = `mb-menu-${uid}`;
  const triggerId = `mb-trigger-${uid}`;
  const contentId = `mb-content-${uid}`;
  const { activeMenu } = React.useContext(MenubarContext);
  const isOpen = activeMenu === menuId;

  return (
    <MenuContext.Provider value={{ menuId, isOpen, triggerId, contentId }}>
      <div className="relative">
        {children}
      </div>
    </MenuContext.Provider>
  );
}

// ─── MenubarTrigger ───────────────────────────────────────
export const MenubarTrigger = React.forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { activeMenu, setActiveMenu } = React.useContext(MenubarContext);
    const { menuId, isOpen, triggerId, contentId } = useMenuCtx();

    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={contentId}
        data-state={isOpen ? "open" : "closed"}
        onClick={() => setActiveMenu(isOpen ? null : menuId)}
        // If another menu is open, hover-switch to this one
        onMouseEnter={() => { if (activeMenu && activeMenu !== menuId) setActiveMenu(menuId); }}
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-3 py-1.5",
          "text-sm font-medium text-foreground/80",
          "transition-colors duration-100 select-none",
          "hover:bg-muted/70 hover:text-foreground",
          "focus:outline-none focus:bg-muted/60 focus:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring",
          isOpen && "bg-muted/80 text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
MenubarTrigger.displayName = "MenubarTrigger";

// ─── MenubarContent ───────────────────────────────────────
export const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  (
    {
      className,
      align      = "start",
      sideOffset = 6,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { isOpen, triggerId, contentId } = useMenuCtx();

    return (
      <div
        ref={ref}
        id={contentId}
        role="menu"
        aria-labelledby={triggerId}
        data-state={isOpen ? "open" : "closed"}
        data-align={align}
        className={cn(
          "absolute top-full z-50 min-w-[13rem]",
          align === "start"  && "left-0",
          align === "center" && "left-1/2 -translate-x-1/2",
          align === "end"    && "right-0",
          `mt-[${sideOffset}px]`,
          // Card
          "rounded-2xl border border-border/60 bg-popover p-1.5",
          "shadow-xl shadow-black/[0.08] dark:shadow-black/30",
          // Animation
          "transition-all duration-150 origin-top-left",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none select-none",
          className
        )}
        style={{ marginTop: sideOffset, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MenubarContent.displayName = "MenubarContent";

// ─── MenubarItem ──────────────────────────────────────────
export const MenubarItem = React.forwardRef<HTMLDivElement, MenubarItemProps>(
  ({ className, variant = "default", disabled = false, inset = false, children, onClick, ...props }, ref) => {
    const { setActiveMenu } = React.useContext(MenubarContext);
    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        onClick={e => {
          if (disabled) return;
          onClick?.(e);
          setActiveMenu(null);
        }}
        onKeyDown={e => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            (e.currentTarget as HTMLDivElement).click();
          }
        }}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "relative flex cursor-pointer select-none items-center gap-2",
          "rounded-lg px-2.5 py-1.5 text-sm outline-none",
          "transition-colors duration-100",
          inset && "pl-8",
          variant === "destructive"
            ? "text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/40 hover:bg-red-50 dark:hover:bg-red-950/40"
            : "text-foreground/85 hover:bg-muted/70 hover:text-foreground focus:bg-muted/70 focus:text-foreground",
          disabled && "pointer-events-none opacity-40",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MenubarItem.displayName = "MenubarItem";

// ─── MenubarCheckboxItem ──────────────────────────────────
export const MenubarCheckboxItem = React.forwardRef<HTMLDivElement, MenubarCheckboxItemProps>(
  ({ className, checked = false, onCheckedChange, disabled, children, onClick, ...props }, ref) => {
    const { setActiveMenu } = React.useContext(MenubarContext);
    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={e => {
          if (disabled) return;
          onCheckedChange?.(!checked);
          onClick?.(e);
        }}
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
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

// ─── MenubarRadioGroup ────────────────────────────────────
export function MenubarRadioGroup({
  value,
  onValueChange,
  children,
  ...props
}: MenubarRadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div role="group" {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

// ─── MenubarRadioItem ─────────────────────────────────────
export const MenubarRadioItem = React.forwardRef<HTMLDivElement, MenubarRadioItemProps>(
  ({ className, value, disabled, children, onClick, ...props }, ref) => {
    const { value: groupValue, onValueChange } = React.useContext(RadioGroupContext);
    const checked = groupValue === value;
    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={e => {
          if (disabled) return;
          onValueChange?.(value);
          onClick?.(e);
        }}
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
MenubarRadioItem.displayName = "MenubarRadioItem";

// ─── MenubarSub ───────────────────────────────────────────
export function MenubarSub({ children }: MenubarSubProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const uid   = React.useId();
  const subId = `mb-sub-${uid}`;
  return (
    <SubContext.Provider value={{ isOpen, setIsOpen, subId }}>
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

// ─── MenubarSubTrigger ────────────────────────────────────
export const MenubarSubTrigger = React.forwardRef<HTMLDivElement, MenubarSubTriggerProps>(
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
MenubarSubTrigger.displayName = "MenubarSubTrigger";

// ─── MenubarSubContent ────────────────────────────────────
export const MenubarSubContent = React.forwardRef<HTMLDivElement, MenubarSubContentProps>(
  ({ className, children, ...props }, ref) => {
    const sub = React.useContext(SubContext);
    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          "absolute left-full top-0 ml-1 z-50 min-w-[12rem]",
          "rounded-2xl border border-border/60 bg-popover p-1.5",
          "shadow-xl shadow-black/[0.08] dark:shadow-black/30",
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
MenubarSubContent.displayName = "MenubarSubContent";

// ─── MenubarLabel ─────────────────────────────────────────
export const MenubarLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 select-none",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
MenubarLabel.displayName = "MenubarLabel";

// ─── MenubarSeparator ─────────────────────────────────────
export const MenubarSeparator = React.forwardRef<
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
MenubarSeparator.displayName = "MenubarSeparator";

// ─── MenubarShortcut ──────────────────────────────────────
export const MenubarShortcut = ({
  className,
  ...props
}: MenubarShortcutProps) => (
  <span
    className={cn(
      "ml-auto pl-5 text-[11px] font-medium tracking-widest text-muted-foreground/50 select-none",
      className
    )}
    aria-hidden
    {...props}
  />
);
MenubarShortcut.displayName = "MenubarShortcut";
