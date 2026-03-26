"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Toggle, ToggleProps, ToggleVariant, ToggleSize } from "./toggle";

// ─── Context ──────────────────────────────────────────────
interface ToggleGroupCtx {
  type:          "single" | "multiple";
  value:         string[];
  onSelect:      (val: string) => void;
  variant:       ToggleVariant;
  size:          ToggleSize;
  disabled:      boolean;
  orientation:   "horizontal" | "vertical";
  connected:     boolean;
  rovingIndex:   number;
  setRovingIndex:(i: number) => void;
  itemRefs:      React.MutableRefObject<(HTMLButtonElement | null)[]>;
}

const ToggleGroupContext = React.createContext<ToggleGroupCtx | null>(null);

function useToggleGroupCtx() {
  const ctx = React.useContext(ToggleGroupContext);
  if (!ctx) throw new Error("<ToggleGroupItem> must be used inside <ToggleGroup>");
  return ctx;
}

// ─── ToggleGroup ──────────────────────────────────────────
export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * "single"   — only one item active at a time (like radio buttons)
   * "multiple" — any number of items can be active
   */
  type?:         "single" | "multiple";
  /** Controlled value */
  value?:        string | string[];
  /** Uncontrolled default value */
  defaultValue?: string | string[];
  onValueChange?:(value: string | string[]) => void;
  variant?:      ToggleVariant;
  size?:         ToggleSize;
  disabled?:     boolean;
  orientation?:  "horizontal" | "vertical";
  /**
   * When true, renders items as a connected pill strip (shared border)
   * When false, renders items as separate independent buttons
   */
  connected?:    boolean;
  /** Loop keyboard navigation */
  loop?:         boolean;
  /** Accessible label */
  "aria-label"?: string;
}

export function ToggleGroup({
  className,
  type         = "single",
  value:         controlledValue,
  defaultValue,
  onValueChange,
  variant      = "default",
  size         = "md",
  disabled     = false,
  orientation  = "horizontal",
  connected    = true,
  loop         = true,
  children,
  "aria-label": ariaLabel,
  ...props
}: ToggleGroupProps) {
  // Normalize value → string[]
  const normalize = (v?: string | string[]): string[] => {
    if (v === undefined || v === null) return [];
    return Array.isArray(v) ? v : v ? [v] : [];
  };

  const [uncontrolled, setUncontrolled] = React.useState<string[]>(
    normalize(defaultValue)
  );
  const isControlled = controlledValue !== undefined;
  const value        = isControlled ? normalize(controlledValue) : uncontrolled;

  // Roving tabindex state
  const [rovingIndex, setRovingIndex] = React.useState(0);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const onSelect = React.useCallback(
    (itemValue: string) => {
      let next: string[];
      if (type === "single") {
        // Allow deselect if same value clicked
        next = value.includes(itemValue) ? [] : [itemValue];
      } else {
        next = value.includes(itemValue)
          ? value.filter(v => v !== itemValue)
          : [...value, itemValue];
      }
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(type === "single" ? (next[0] ?? "") : next);
    },
    [type, value, isControlled, onValueChange]
  );

  // Arrow key navigation handler (hoisted to group level)
  const handleGroupKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    const count = items.length;
    if (!count) return;

    const isHorizontal = orientation === "horizontal";
    const prevKey      = isHorizontal ? "ArrowLeft"  : "ArrowUp";
    const nextKey      = isHorizontal ? "ArrowRight" : "ArrowDown";

    let newIndex = rovingIndex;

    if (e.key === prevKey) {
      e.preventDefault();
      newIndex = loop
        ? (rovingIndex - 1 + count) % count
        : Math.max(0, rovingIndex - 1);
    } else if (e.key === nextKey) {
      e.preventDefault();
      newIndex = loop
        ? (rovingIndex + 1) % count
        : Math.min(count - 1, rovingIndex + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      newIndex = count - 1;
    } else {
      return;
    }

    setRovingIndex(newIndex);
    items[newIndex]?.focus();
  };

  return (
    <ToggleGroupContext.Provider
      value={{
        type, value, onSelect, variant, size,
        disabled, orientation, connected,
        rovingIndex, setRovingIndex, itemRefs,
      }}
    >
      <div
        role={type === "single" ? "radiogroup" : "group"}
        aria-label={ariaLabel}
        aria-orientation={orientation}
        data-orientation={orientation}
        data-connected={connected ? "" : undefined}
        onKeyDown={handleGroupKeyDown}
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-row items-stretch" : "flex-col items-stretch",
          // Connected: merged as a single pill strip
          connected && [
            "rounded-md overflow-hidden border border-input",
            "shadow-sm",
            orientation === "horizontal" && "[&>button]:border-r [&>button:last-child]:border-r-0",
            orientation === "vertical"   && "[&>button]:border-b [&>button:last-child]:border-b-0",
            // Remove individual border-radius when connected
            "[&>button]:rounded-none",
          ],
          // Separated: gap between items
          !connected && [
            orientation === "horizontal" ? "gap-1" : "gap-1",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

// ─── ToggleGroupItem ──────────────────────────────────────
export interface ToggleGroupItemProps extends Omit<ToggleProps, "pressed" | "defaultPressed" | "onPressedChange"> {
  /** Must match a unique string for value tracking */
  value: string;
  /** Override group variant for this item only */
  variant?: ToggleVariant;
  /** Override group size for this item only */
  size?: ToggleSize;
}

export const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, variant, size, disabled, className, onClick, children, ...props }, ref) => {
    const ctx     = useToggleGroupCtx();
    const pressed = ctx.value.includes(value);

    // Register in itemRefs
    const localRef = React.useRef<HTMLButtonElement | null>(null);
    const itemIndex = React.useRef<number>(-1);

    const setRef = React.useCallback(
      (el: HTMLButtonElement | null) => {
        localRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
        // Register in group refs array
        if (el && !ctx.itemRefs.current.includes(el)) {
          const emptyIdx = ctx.itemRefs.current.indexOf(null);
          if (emptyIdx !== -1) {
            ctx.itemRefs.current[emptyIdx] = el;
            itemIndex.current = emptyIdx;
          } else {
            itemIndex.current = ctx.itemRefs.current.length;
            ctx.itemRefs.current.push(el);
          }
        }
      },
      [ref, ctx.itemRefs]
    );

    // Cleanup on unmount
    React.useEffect(() => {
      return () => {
        if (itemIndex.current !== -1) {
          ctx.itemRefs.current[itemIndex.current] = null;
        }
      };
    }, [ctx.itemRefs]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      ctx.onSelect(value);
      // Update roving index
      const idx = ctx.itemRefs.current.findIndex(r => r === localRef.current);
      if (idx !== -1) ctx.setRovingIndex(idx);
      onClick?.(e);
    };

    const idx = ctx.itemRefs.current.findIndex(r => r === localRef.current);
    const tabIndex = disabled
      ? -1
      : idx === ctx.rovingIndex || (ctx.rovingIndex === 0 && idx <= 0)
      ? 0
      : -1;

    return (
      <Toggle
        ref={setRef}
        variant={variant ?? ctx.variant}
        size={size ?? ctx.size}
        pressed={pressed}
        disabled={disabled ?? ctx.disabled}
        tabIndex={tabIndex}
        onClick={handleClick}
        className={cn(
          // When connected — remove individual radius, use border separator
          ctx.connected && [
            "rounded-none border-0",
            "focus-visible:ring-inset focus-visible:z-10",
          ],
          // Vertical full width
          ctx.orientation === "vertical" && "w-full justify-start",
          className
        )}
        {...props}
      >
        {children}
      </Toggle>
    );
  }
);
ToggleGroupItem.displayName = "ToggleGroupItem";
