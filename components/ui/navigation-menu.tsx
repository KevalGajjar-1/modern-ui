"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type NavigationMenuOrientation = "horizontal" | "vertical";

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: NavigationMenuOrientation;
  /** Delay before closing a submenu in ms */
  closeDelay?:  number;
  /** Delay before opening a submenu in ms */
  openDelay?:   number;
}

export interface NavigationMenuListProps extends React.HTMLAttributes<HTMLUListElement> {}

export interface NavigationMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export interface NavigationMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Show built-in chevron */
  showChevron?: boolean;
}

export interface NavigationMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Preferred side for the panel — "bottom" for top nav, "right" for sidebar */
  align?: "start" | "center" | "end";
  width?: string;
}

export interface NavigationMenuLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  asChild?: boolean;
}

// ─── Context ──────────────────────────────────────────────
interface NavCtx {
  activeItem:    string | null;
  setActiveItem: (id: string | null) => void;
  orientation:   NavigationMenuOrientation;
  openDelay:     number;
  closeDelay:    number;
}

const NavContext = React.createContext<NavCtx>({
  activeItem:    null,
  setActiveItem: () => {},
  orientation:   "horizontal",
  openDelay:     0,
  closeDelay:    150,
});

interface NavItemCtx {
  itemId:     string;
  isOpen:     boolean;
  triggerId:  string;
  contentId:  string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const NavItemContext = React.createContext<NavItemCtx | null>(null);

function useNavItemCtx() {
  const ctx = React.useContext(NavItemContext);
  if (!ctx) throw new Error("Must be inside <NavigationMenuItem>");
  return ctx;
}

// ─── NavigationMenu ───────────────────────────────────────
export const NavigationMenu = React.forwardRef<HTMLElement, NavigationMenuProps>(
  (
    {
      className,
      orientation = "horizontal",
      openDelay   = 0,
      closeDelay  = 150,
      children,
      ...props
    },
    ref
  ) => {
    const [activeItem, setActiveItemRaw] = React.useState<string | null>(null);
    const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined as unknown as ReturnType<typeof setTimeout>);

    const setActiveItem = React.useCallback(
      (id: string | null) => {
        clearTimeout(timer.current);
        if (id === null) {
          timer.current = setTimeout(() => setActiveItemRaw(null), closeDelay);
        } else {
          if (openDelay > 0) {
            timer.current = setTimeout(() => setActiveItemRaw(id), openDelay);
          } else {
            setActiveItemRaw(id);
          }
        }
      },
      [openDelay, closeDelay]
    );

    // Close on Escape or outside click
    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveItemRaw(null);
      };
      const onPointer = (e: PointerEvent) => {
        const nav = (ref as React.RefObject<HTMLElement>)?.current;
        if (nav && !nav.contains(e.target as Node)) setActiveItemRaw(null);
      };
      document.addEventListener("keydown",       onKey);
      document.addEventListener("pointerdown",   onPointer);
      return () => {
        document.removeEventListener("keydown",     onKey);
        document.removeEventListener("pointerdown", onPointer);
      };
    }, [ref]);

    return (
      <NavContext.Provider value={{ activeItem, setActiveItem, orientation, openDelay, closeDelay }}>
        <nav
          ref={ref}
          aria-label="Main navigation"
          data-orientation={orientation}
          className={cn(
            "relative",
            orientation === "horizontal" ? "flex items-center" : "flex flex-col",
            className
          )}
          {...props}
        >
          {children}
        </nav>
      </NavContext.Provider>
    );
  }
);
NavigationMenu.displayName = "NavigationMenu";

// ─── NavigationMenuList ───────────────────────────────────
export const NavigationMenuList = React.forwardRef<HTMLUListElement, NavigationMenuListProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = React.useContext(NavContext);
    return (
      <ul
        ref={ref}
        role="menubar"
        aria-orientation={orientation}
        className={cn(
          "flex list-none m-0 p-0 gap-0.5",
          orientation === "vertical" ? "flex-col w-full" : "flex-row items-center",
          className
        )}
        {...props}
      />
    );
  }
);
NavigationMenuList.displayName = "NavigationMenuList";

// ─── NavigationMenuItem ───────────────────────────────────
export const NavigationMenuItem = React.forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ className, children, ...props }, ref) => {
    const uid        = React.useId();
    const itemId     = `nav-item-${uid}`;
    const triggerId  = `nav-trigger-${uid}`;
    const contentId  = `nav-content-${uid}`;
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const { activeItem } = React.useContext(NavContext);
    const isOpen = activeItem === itemId;

    return (
      <NavItemContext.Provider value={{ itemId, isOpen, triggerId, contentId, triggerRef }}>
        <li
          ref={ref}
          role="none"
          data-state={isOpen ? "open" : "closed"}
          className={cn("relative", className)}
          {...props}
        >
          {children}
        </li>
      </NavItemContext.Provider>
    );
  }
);
NavigationMenuItem.displayName = "NavigationMenuItem";

// ─── NavigationMenuTrigger ────────────────────────────────
export const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(({ className, showChevron = true, children, ...props }, ref) => {
  const { setActiveItem } = React.useContext(NavContext);
  const { itemId, isOpen, triggerId, contentId, triggerRef } = useNavItemCtx();

  const setRef = (el: HTMLButtonElement | null) => {
    triggerRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  return (
    <button
      ref={setRef}
      id={triggerId}
      type="button"
      role="menuitem"
      aria-haspopup="true"
      aria-expanded={isOpen}
      aria-controls={contentId}
      data-state={isOpen ? "open" : "closed"}
      onClick={() => setActiveItem(isOpen ? null : itemId)}
      onMouseEnter={() => setActiveItem(itemId)}
      onMouseLeave={() => setActiveItem(null)}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-lg px-3 py-2",
        "text-sm font-medium text-foreground/80",
        "transition-colors duration-150",
        "hover:bg-muted/70 hover:text-foreground",
        "focus:outline-none focus:bg-muted/60 focus:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        isOpen && "bg-muted/60 text-foreground",
        className
      )}
      {...props}
    >
      {children}
      {showChevron && (
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground/70 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden
        />
      )}
    </button>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// ─── NavigationMenuContent ────────────────────────────────
export const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(
  (
    {
      className,
      align = "start",
      width = "auto",
      style,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const { setActiveItem, orientation } = React.useContext(NavContext);
    const { itemId, isOpen, triggerId, contentId } = useNavItemCtx();

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        data-state={isOpen ? "open" : "closed"}
        data-align={align}
        onMouseEnter={e => { setActiveItem(itemId); onMouseEnter?.(e); }}
        onMouseLeave={e => { setActiveItem(null);   onMouseLeave?.(e); }}
        className={cn(
          // Positioning
          orientation === "horizontal"
            ? cn(
                "absolute top-full mt-1.5 z-50",
                align === "start"  && "left-0",
                align === "center" && "left-1/2 -translate-x-1/2",
                align === "end"    && "right-0"
              )
            : "relative mt-1 w-full",
          // Card
          "rounded-2xl border border-border/60 bg-popover shadow-xl shadow-black/[0.08]",
          "dark:shadow-black/30",
          // Animation
          "transition-all duration-150 origin-top",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
          className
        )}
        style={{ width, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavigationMenuContent.displayName = "NavigationMenuContent";

// ─── NavigationMenuLink ───────────────────────────────────
export const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(({ className, active = false, asChild = false, children, ...props }, ref) => {
  const base = cn(
    "flex items-center gap-2.5 rounded-xl px-3 py-2.5",
    "text-sm text-foreground/80 font-medium",
    "transition-colors duration-150",
    "hover:bg-muted/70 hover:text-foreground",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    active && "bg-muted text-foreground",
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
      { className: base, ref } as React.HTMLAttributes<HTMLElement>
    );
  }

  return (
    <a ref={ref} className={base} {...props}>
      {children}
    </a>
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

// ─── NavigationMenuSeparator ──────────────────────────────
export function NavigationMenuSeparator({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      className={cn("my-1.5 h-px bg-border/60", className)}
    />
  );
}

// ─── NavigationMenuViewport (indicator bar) ───────────────
export function NavigationMenuViewport({ className }: { className?: string }) {
  const { activeItem, orientation } = React.useContext(NavContext);
  if (orientation !== "horizontal") return null;
  return (
    <div
      aria-hidden
      className={cn(
        "absolute bottom-0 left-0 h-0.5 rounded-full bg-primary",
        "transition-all duration-200",
        !activeItem && "opacity-0",
        className
      )}
    />
  );
}
