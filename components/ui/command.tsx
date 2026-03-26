"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, X, Loader2, ArrowRight, CornerDownLeft } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled search value */
  value?: string;
  onValueChange?: (value: string) => void;
  /** Filter function — return true to show an item */
  filter?: (value: string, search: string) => boolean;
  /** Placeholder for the search input */
  placeholder?: string;
  /** Show loading spinner */
  loading?: boolean;
  /** Disable filtering (e.g. server-side search) */
  shouldFilter?: boolean;
  /** Label for screen readers */
  label?: string;
}

export interface CommandInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> { }

export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> { }

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
}

export interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The text value used for filtering */
  value?: string;
  disabled?: boolean;
  /** Called when the item is selected via click or keyboard */
  onSelect?: (value: string) => void;
}

export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> { }
export interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> { }
export interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> { }

// ─── Context ──────────────────────────────────────────────
interface CommandCtx {
  search: string;
  setSearch: (v: string) => void;
  filter: (value: string, search: string) => boolean;
  shouldFilter: boolean;
  loading: boolean;
  placeholder: string;
  inputId: string;
  // Active item tracking
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  // Item registry
  items: React.MutableRefObject<{ value: string; el: HTMLDivElement | null }[]>;
  selectItem: (value: string) => void;
  onSelect?: (value: string) => void;
}

const CommandContext = React.createContext<CommandCtx | null>(null);

function useCommandCtx() {
  const ctx = React.useContext(CommandContext);
  if (!ctx) throw new Error("Must be inside <Command>");
  return ctx;
}

// Default filter: case-insensitive substring
const defaultFilter = (value: string, search: string) =>
  value.toLowerCase().includes(search.toLowerCase());

// ─── Command ──────────────────────────────────────────────
export const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  (
    {
      className,
      value: controlledSearch,
      onValueChange,
      filter = defaultFilter,
      placeholder = "Type a command or search…",
      loading = false,
      shouldFilter = true,
      label = "Command menu",
      children,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [ uncontrolled, setUncontrolled ] = React.useState("");
    const isControlled = controlledSearch !== undefined;
    const search = isControlled ? (controlledSearch ?? "") : uncontrolled;

    const setSearch = React.useCallback(
      (v: string) => {
        if (!isControlled) setUncontrolled(v);
        onValueChange?.(v);
      },
      [ isControlled, onValueChange ]
    );

    const uid = React.useId();
    const inputId = `cmd-input-${uid}`;
    const items = React.useRef<{ value: string; el: HTMLDivElement | null }[]>([]);

    const [ activeIndex, setActiveIndex ] = React.useState(-1);

    const selectItem = React.useCallback(
      (value: string) => {
        const item = items.current.find(i => i.value === value);
        item?.el?.click();
      },
      []
    );

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const visible = items.current.filter(i => {
        if (!shouldFilter || !search) return true;
        return filter(i.value, search);
      });

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, visible.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        visible[ activeIndex ]?.el?.click();
      }
      onKeyDown?.(e);
    };

    // Reset active index when search changes
    React.useEffect(() => { setActiveIndex(-1); }, [ search ]);

    return (
      <CommandContext.Provider
        value={ {
          search, setSearch, filter, shouldFilter, loading,
          placeholder, inputId, activeIndex, setActiveIndex,
          items, selectItem,
        } }
      >
        <div
          ref={ ref }
          role="combobox"
          aria-expanded
          aria-haspopup="listbox"
          aria-label={ label }
          data-loading={ loading }
          onKeyDown={ handleKeyDown }
          className={ cn(
            "flex flex-col overflow-hidden rounded-2xl",
            "border border-border/60 bg-popover",
            "shadow-2xl shadow-black/[0.12] dark:shadow-black/40",
            className
          ) }
          { ...props }
        >
          { children }
        </div>
      </CommandContext.Provider>
    );
  }
);
Command.displayName = "Command";

// ─── CommandInput ─────────────────────────────────────────
export const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => {
    const { search, setSearch, loading, placeholder, inputId } = useCommandCtx();
    return (
      <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3.5">
        { loading
          ? <Loader2 className="h-4 w-4 shrink-0 text-muted-foreground animate-spin" />
          : <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        }
        <input
          ref={ ref }
          id={ inputId }
          role="searchbox"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={ false }
          aria-autocomplete="list"
          value={ search }
          onChange={ e => setSearch(e.target.value) }
          placeholder={ placeholder }
          className={ cn(
            "flex-1 bg-transparent text-sm text-foreground",
            "placeholder:text-muted-foreground/50",
            "outline-none",
            className
          ) }
          { ...props }
        />
        { search && (
          <button
            type="button"
            onClick={ () => setSearch("") }
            className="rounded-md p-0.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) }
      </div>
    );
  }
);
CommandInput.displayName = "CommandInput";

// ─── CommandList ──────────────────────────────────────────
export const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ ref }
      role="listbox"
      className={ cn(
        "max-h-[320px] overflow-y-auto overflow-x-hidden",
        "py-1.5",
        "scrollbar-thin scrollbar-thumb-border/60",
        className
      ) }
      { ...props }
    >
      { children }
    </div>
  )
);
CommandList.displayName = "CommandList";

// ─── CommandGroup ─────────────────────────────────────────
export const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => (
    <div
      ref={ ref }
      role="group"
      aria-label={ heading }
      className={ cn("px-1.5", className) }
      { ...props }
    >
      { heading && (
        <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 select-none">
          { heading }
        </div>
      ) }
      { children }
    </div>
  )
);
CommandGroup.displayName = "CommandGroup";

// ─── CommandItem ──────────────────────────────────────────
export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  (
    {
      className,
      value = "",
      disabled = false,
      onSelect,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const ctx = useCommandCtx();
    const elRef = React.useRef<HTMLDivElement | null>(null);
    const textValue = value || (typeof children === "string" ? children : "");

    // Register / unregister
    React.useEffect(() => {
      const entry = { value: textValue, el: elRef.current };
      ctx.items.current.push(entry);
      return () => {
        ctx.items.current = ctx.items.current.filter(i => i !== entry);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ textValue ]);

    // Filtering
    const isVisible = !ctx.shouldFilter || !ctx.search
      ? true
      : ctx.filter(textValue, ctx.search);

    const visibleItems = ctx.items.current.filter(i =>
      !ctx.shouldFilter || !ctx.search ? true : ctx.filter(i.value, ctx.search)
    );
    const visibleIndex = visibleItems.findIndex(i => i.value === textValue);
    const isActive = visibleIndex !== -1 && visibleIndex === ctx.activeIndex;

    const setRef = (el: HTMLDivElement | null) => {
      elRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ setRef }
        role="option"
        aria-selected={ isActive }
        aria-disabled={ disabled }
        data-selected={ isActive }
        data-disabled={ disabled ? "" : undefined }
        onMouseEnter={ () => ctx.setActiveIndex(visibleIndex) }
        onClick={ e => {
          if (disabled) return;
          onSelect?.(textValue);
          onClick?.(e);
        } }
        onKeyDown={ e => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            onSelect?.(textValue);
          }
        } }
        tabIndex={ disabled ? -1 : 0 }
        className={ cn(
          "relative flex cursor-pointer select-none items-center gap-2.5",
          "rounded-xl px-3 py-2.5 text-sm text-foreground/80",
          "outline-none transition-colors duration-100",
          "hover:bg-muted/70 hover:text-foreground",
          isActive && "bg-muted/70 text-foreground",
          disabled && "pointer-events-none opacity-40",
          className
        ) }
        { ...props }
      >
        { children }
      </div>
    );
  }
);
CommandItem.displayName = "CommandItem";

// ─── CommandEmpty ─────────────────────────────────────────
export const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, children, ...props }, ref) => {
    const { search } = useCommandCtx();
    if (!search) return null;
    return (
      <div
        ref={ ref }
        role="presentation"
        className={ cn(
          "flex flex-col items-center justify-center gap-2 py-10 text-sm text-muted-foreground",
          className
        ) }
        { ...props }
      >
        { children ?? (
          <>
            <Search className="h-8 w-8 opacity-20" />
            <p>No results for <strong className="text-foreground">"{ search }"</strong></p>
          </>
        ) }
      </div>
    );
  }
);
CommandEmpty.displayName = "CommandEmpty";

// ─── CommandSeparator ─────────────────────────────────────
export const CommandSeparator = React.forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ ref }
      role="separator"
      className={ cn("my-1.5 h-px bg-border/60 mx-1.5", className) }
      { ...props }
    />
  )
);
CommandSeparator.displayName = "CommandSeparator";

// ─── CommandShortcut ──────────────────────────────────────
export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return (
    <span
      className={ cn(
        "ml-auto flex items-center gap-0.5 text-[11px] font-medium text-muted-foreground/50 select-none tracking-widest",
        className
      ) }
      aria-hidden
      { ...props }
    />
  );
}

// ─── CommandDialog ───────────────────────────────────────
export interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  placeholder?: string;
  triggerKeys?: string[];
}

export const CommandDialog = React.forwardRef<HTMLDivElement, CommandDialogProps>(
  (
    {
      open: controlledOpen,
      onOpenChange,
      children,
      placeholder = "Type a command or search…",
      triggerKeys = ["k"],
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? (controlledOpen ?? false) : uncontrolled;

    const setOpen = React.useCallback(
      (v: boolean) => {
        if (!isControlled) setUncontrolled(v);
        onOpenChange?.(v);
      },
      [isControlled, onOpenChange]
    );

    // Global keyboard listener for ⌘K / Ctrl+K
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        const isMeta = e.metaKey || e.ctrlKey;
        const key = e.key.toLowerCase();
        if (isMeta && triggerKeys.some(k => k.toLowerCase() === key)) {
          e.preventDefault();
          setOpen(!open);
        }
        if (e.key === "Escape") {
          setOpen(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, triggerKeys, setOpen]);

    // Body scroll lock
    React.useEffect(() => {
      if (open) {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
      }
    }, [open]);

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        
        {/* Dialog */}
        <div
          ref={ref}
          className="relative z-10 w-full max-w-lg mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Command placeholder={placeholder}>
            {children}
          </Command>
        </div>
      </div>
    );
  }
);
CommandDialog.displayName = "CommandDialog";
