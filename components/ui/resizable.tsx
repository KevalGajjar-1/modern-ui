"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GripVertical, GripHorizontal } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type ResizableDirection = "horizontal" | "vertical";

export interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: ResizableDirection;
  /** Gap between the handle and panels */
  handleSize?: number;
  /** Persist sizes to localStorage under this key */
  storageKey?: string;
  onLayout?: (sizes: number[]) => void;
}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default size as a percentage (0–100) */
  defaultSize?: number;
  /** Minimum percentage size */
  minSize?: number;
  /** Maximum percentage size */
  maxSize?: number;
  /** Panel index (auto-assigned by context) */
  index?: number;
}

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show a grip icon in the handle */
  withHandle?: boolean;
  disabled?: boolean;
}

// ─── Context ──────────────────────────────────────────────
interface PanelGroupCtx {
  direction: ResizableDirection;
  sizes: number[];
  setSizes: (sizes: number[]) => void;
  panelCount: number;
  handleSize: number;
}

const PanelGroupContext = React.createContext<PanelGroupCtx | null>(null);

function usePanelGroupCtx() {
  const ctx = React.useContext(PanelGroupContext);
  if (!ctx) throw new Error("Must be inside <ResizablePanelGroup>");
  return ctx;
}

// ─── ResizablePanelGroup ──────────────────────────────────
export const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  ResizablePanelGroupProps
>(
  (
    {
      className,
      direction = "horizontal",
      handleSize = 5,
      storageKey,
      onLayout,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // Count panels by scanning children
    const panels = React.Children.toArray(children).filter(
      c => React.isValidElement(c) && (c.type as React.FC).displayName === "ResizablePanel"
    );
    const panelCount = panels.length;

    // Default: equal split
    const defaultSizes = React.useMemo(
      () => panels.map(
        (c) =>
          (React.isValidElement(c) && (c as React.ReactElement<ResizablePanelProps>).props.defaultSize) ||
          100 / panelCount
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [ panelCount ]
    );

    const [ sizes, setSizesRaw ] = React.useState<number[]>(() => {
      if (storageKey) {
        try {
          const stored = localStorage.getItem(storageKey);
          if (stored) return JSON.parse(stored) as number[];
        } catch { }
      }
      return defaultSizes;
    });

    const setSizes = React.useCallback(
      (next: number[]) => {
        setSizesRaw(next);
        if (storageKey) {
          try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { }
        }
        onLayout?.(next);
      },
      [ storageKey, onLayout ]
    );

    return (
      <PanelGroupContext.Provider value={ { direction, sizes, setSizes, panelCount, handleSize } }>
        <div
          ref={ ref }
          data-direction={ direction }
          className={ cn(
            "flex w-full",
            direction === "horizontal" ? "flex-row" : "flex-col",
            className
          ) }
          style={ { height: direction === "vertical" ? "100%" : undefined, ...style } }
          { ...props }
        >
          { children }
        </div>
      </PanelGroupContext.Provider>
    );
  }
);
ResizablePanelGroup.displayName = "ResizablePanelGroup";

// ─── ResizablePanel ───────────────────────────────────────
let _panelIndex = 0;

export const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  (
    {
      className,
      defaultSize,
      minSize = 10,
      maxSize = 90,
      index: indexProp,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { direction, sizes } = usePanelGroupCtx();

    // Auto-assign index via a ref so it's stable
    const indexRef = React.useRef<number>(indexProp ?? -1);
    if (indexRef.current === -1) {
      indexRef.current = indexProp ?? 0; // consumers should pass index
    }
    const idx = indexProp ?? 0;
    const size = sizes[ idx ] ?? (defaultSize ?? 50);

    const sizeStyle =
      direction === "horizontal"
        ? { width: `${size}%`, minWidth: `${minSize}%`, maxWidth: `${maxSize}%`, flexShrink: 0 }
        : { height: `${size}%`, minHeight: `${minSize}%`, maxHeight: `${maxSize}%`, flexShrink: 0 };

    return (
      <div
        ref={ ref }
        data-panel-index={ idx }
        className={ cn("overflow-hidden", className) }
        style={ { ...sizeStyle, ...style } }
        { ...props }
      >
        { children }
      </div>
    );
  }
);
ResizablePanel.displayName = "ResizablePanel";

// ─── ResizableHandle ──────────────────────────────────────
export const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  (
    {
      className,
      withHandle = false,
      disabled = false,
      onMouseDown: externalMouseDown,
      ...props
    },
    ref
  ) => {
    const { direction, sizes, setSizes, panelCount } = usePanelGroupCtx();
    const isHorizontal = direction === "horizontal";
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const setRef = (el: HTMLDivElement | null) => {
      containerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };

    // Find which panel index this handle is after by its DOM position
    const getHandleIndex = (): number => {
      const el = containerRef.current;
      if (!el || !el.parentElement) return 0;
      const siblings = Array.from(el.parentElement.children);
      const handlePos = siblings.indexOf(el);
      // Count ResizablePanel siblings before this handle
      let panelsBefore = 0;
      for (let i = 0; i < handlePos; i++) {
        if (siblings[ i ].hasAttribute("data-panel-index")) panelsBefore++;
      }
      return panelsBefore - 1; // index of the panel to the left/above
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      externalMouseDown?.(e);

      const startPos = isHorizontal ? e.clientX : e.clientY;
      const panelIdx = getHandleIndex();
      const startSizes = [ ...sizes ];
      const groupEl = containerRef.current?.parentElement;
      if (!groupEl) return;
      const groupSize = isHorizontal ? groupEl.offsetWidth : groupEl.offsetHeight;

      const onMouseMove = (ev: MouseEvent) => {
        const currentPos = isHorizontal ? ev.clientX : ev.clientY;
        const delta = ((currentPos - startPos) / groupSize) * 100;
        const next = [ ...startSizes ];

        const leftIdx = panelIdx;
        const rightIdx = panelIdx + 1;

        if (leftIdx < 0 || rightIdx >= next.length) return;

        const leftPanel = containerRef.current?.parentElement
          ?.querySelector(`[data-panel-index="${leftIdx}"]`) as HTMLElement | null;
        const rightPanel = containerRef.current?.parentElement
          ?.querySelector(`[data-panel-index="${rightIdx}"]`) as HTMLElement | null;

        const leftMin = leftPanel ? parseFloat(leftPanel.style.minWidth || leftPanel.style.minHeight || "10") : 10;
        const leftMax = leftPanel ? parseFloat(leftPanel.style.maxWidth || leftPanel.style.maxHeight || "90") : 90;
        const rightMin = rightPanel ? parseFloat(rightPanel.style.minWidth || rightPanel.style.minHeight || "10") : 10;
        const rightMax = rightPanel ? parseFloat(rightPanel.style.maxWidth || rightPanel.style.maxHeight || "90") : 90;

        let newLeft = Math.min(leftMax, Math.max(leftMin, startSizes[ leftIdx ] + delta));
        let newRight = Math.min(rightMax, Math.max(rightMin, startSizes[ rightIdx ] - delta));

        // Clamp so they don't exceed their bounds
        const actualDelta = newLeft - startSizes[ leftIdx ];
        newLeft = startSizes[ leftIdx ] + actualDelta;
        newRight = startSizes[ rightIdx ] - actualDelta;

        next[ leftIdx ] = newLeft;
        next[ rightIdx ] = newRight;
        setSizes(next);
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    return (
      <div
        ref={ setRef }
        role="separator"
        aria-orientation={ isHorizontal ? "vertical" : "horizontal" }
        data-resize-handle
        data-disabled={ disabled ? "" : undefined }
        onMouseDown={ handleMouseDown }
        className={ cn(
          "relative flex shrink-0 items-center justify-center",
          "bg-border/40 transition-colors",
          "hover:bg-primary/30 active:bg-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          isHorizontal
            ? "w-px cursor-col-resize mx-0.5 self-stretch"
            : "h-px cursor-row-resize my-0.5 self-stretch",
          disabled && "pointer-events-none opacity-40",
          className
        ) }
        { ...props }
      >
        { withHandle && (
          <div
            className={ cn(
              "z-10 flex items-center justify-center",
              "rounded-md border border-border bg-background shadow-sm",
              "text-muted-foreground/60 hover:text-muted-foreground",
              "transition-colors",
              isHorizontal ? "h-8 w-3.5" : "h-3.5 w-8"
            ) }
            aria-hidden
          >
            { isHorizontal
              ? <GripVertical className="h-3.5 w-3.5" />
              : <GripHorizontal className="h-3.5 w-3.5" />
            }
          </div>
        ) }
      </div>
    );
  }
);
ResizableHandle.displayName = "ResizableHandle";
