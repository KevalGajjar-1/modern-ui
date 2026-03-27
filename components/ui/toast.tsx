"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  X, CheckCircle2, AlertCircle, AlertTriangle,
  Info, Loader2, Bell,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type ToastVariant = "default" | "success" | "error" | "warning" | "info" | "loading";
export type ToastPosition =
  | "top-left" | "top-center" | "top-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

export interface ToastAction {
  label: string;
  onClick: () => void;
  className?: string;
}

export interface ToastOptions {
  id?: string;
  variant?: ToastVariant;
  title?: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
  action?: ToastAction;
  onDismiss?: (id: string) => void;
  icon?: React.ReactNode;
  update?: boolean;
  className?: string;
}

export interface ToastItem
  extends Required<Pick<ToastOptions, "id" | "variant" | "duration" | "position">> {
  title?: string;
  description?: string;
  action?: ToastAction;
  onDismiss?: (id: string) => void;
  icon?: React.ReactNode;
  className?: string;
  entering: boolean;
  leaving: boolean;
}

// ─── Singleton store ──────────────────────────────────────
type Listener = (toasts: ToastItem[]) => void;

let _toasts: ToastItem[] = [];
let _listeners: Listener[] = [];
let _idCounter = 0;

function notify() {
  _listeners.forEach(l => l([ ..._toasts ]));
}

function addToast(opts: ToastOptions): string {
  const id = opts.id ?? `toast-${++_idCounter}`;

  const existing = _toasts.findIndex(t => t.id === id);
  if (existing >= 0 && opts.update !== false) {
    _toasts[ existing ] = {
      ..._toasts[ existing ],
      ...opts,
      id,
      variant: opts.variant ?? "default",
      duration: opts.duration ?? 4000,
      position: opts.position ?? "bottom-right",
      entering: false,
      leaving: false,
    };
    notify();
    return id;
  }

  const item: ToastItem = {
    id,
    variant: opts.variant ?? "default",
    duration: opts.duration ?? 4000,
    position: opts.position ?? "bottom-right",
    title: opts.title,
    description: opts.description,
    action: opts.action,
    onDismiss: opts.onDismiss,
    icon: opts.icon,
    className: opts.className,
    entering: true,
    leaving: false,
  };

  _toasts = [ ..._toasts, item ];
  notify();

  // Next frame: flip entering → false to trigger transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      _toasts = _toasts.map(t => t.id === id ? { ...t, entering: false } : t);
      notify();
    });
  });

  return id;
}

function dismissToast(id: string) {
  _toasts = _toasts.map(t => t.id === id ? { ...t, leaving: true } : t);
  notify();
  setTimeout(() => {
    const t = _toasts.find(t => t.id === id);
    t?.onDismiss?.(id);
    _toasts = _toasts.filter(t => t.id !== id);
    notify();
  }, 400);
}

function dismissAll() {
  [ ..._toasts ].forEach(t => dismissToast(t.id));
}

// ─── Public API ───────────────────────────────────────────
export const toast = Object.assign(
  (titleOrOpts: ToastOptions | string, opts?: Omit<ToastOptions, "title">) =>
    addToast(typeof titleOrOpts === "string" ? { ...opts, title: titleOrOpts } : titleOrOpts),
  {
    success: (title: string, opts?: Omit<ToastOptions, "variant" | "title">) =>
      addToast({ ...opts, variant: "success", title }),
    error: (title: string, opts?: Omit<ToastOptions, "variant" | "title">) =>
      addToast({ ...opts, variant: "error", title }),
    warning: (title: string, opts?: Omit<ToastOptions, "variant" | "title">) =>
      addToast({ ...opts, variant: "warning", title }),
    info: (title: string, opts?: Omit<ToastOptions, "variant" | "title">) =>
      addToast({ ...opts, variant: "info", title }),
    loading: (title: string, opts?: Omit<ToastOptions, "variant" | "title">) =>
      addToast({ ...opts, variant: "loading", title, duration: 0 }),

    promise: async <T,>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string | ((v: T) => string);
        error: string | ((e: unknown) => string);
      },
      opts?: Omit<ToastOptions, "variant" | "title">
    ): Promise<T> => {
      const id = addToast({ ...opts, variant: "loading", title: messages.loading, duration: 0 });
      try {
        const result = await promise;
        const title = typeof messages.success === "function"
          ? messages.success(result) : messages.success;
        addToast({ ...opts, id, variant: "success", title, update: true, duration: 4000 });
        return result;
      } catch (err) {
        const title = typeof messages.error === "function"
          ? messages.error(err) : messages.error;
        addToast({ ...opts, id, variant: "error", title, update: true, duration: 4000 });
        throw err;
      }
    },

    dismiss: dismissToast,
    dismissAll,
  }
);

// ─── useToastStore ────────────────────────────────────────
function useToastStore(): ToastItem[] {
  const [ toasts, setToasts ] = React.useState<ToastItem[]>([ ..._toasts ]);
  React.useEffect(() => {
    _listeners.push(setToasts);
    return () => { _listeners = _listeners.filter(l => l !== setToasts); };
  }, []);
  return toasts;
}

// ─── Variant config ───────────────────────────────────────
type VariantCfg = {
  icon: React.ReactNode;
  iconClass: string;
  // subtle mode (default)
  border: string;
  accentBar: string;
  // rich color mode
  richBg: string;
  richBorder: string;
  richText: string;
  richIcon: string;
  richBar: string;
};

const VARIANT_CONFIG: Record<ToastVariant, VariantCfg> = {
  default: {
    icon: <Bell className="h-4 w-4" />,
    iconClass: "text-foreground/60",
    border: "border-border/70",
    accentBar: "bg-foreground/20",
    richBg: "bg-background",
    richBorder: "border-border/70",
    richText: "text-foreground",
    richIcon: "text-foreground/60",
    richBar: "bg-foreground/30",
  },
  success: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    iconClass: "text-emerald-500",
    border: "border-emerald-200 dark:border-emerald-800/60",
    accentBar: "bg-emerald-500",
    richBg: "bg-emerald-500 dark:bg-emerald-600",
    richBorder: "border-emerald-600 dark:border-emerald-500",
    richText: "text-white",
    richIcon: "text-white/90",
    richBar: "bg-white/40",
  },
  error: {
    icon: <AlertCircle className="h-4 w-4" />,
    iconClass: "text-red-500",
    border: "border-red-200 dark:border-red-800/60",
    accentBar: "bg-red-500",
    richBg: "bg-red-500 dark:bg-red-600",
    richBorder: "border-red-600 dark:border-red-500",
    richText: "text-white",
    richIcon: "text-white/90",
    richBar: "bg-white/40",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4" />,
    iconClass: "text-amber-500",
    border: "border-amber-200 dark:border-amber-800/60",
    accentBar: "bg-amber-500",
    richBg: "bg-amber-400 dark:bg-amber-500",
    richBorder: "border-amber-500 dark:border-amber-400",
    richText: "text-amber-950",
    richIcon: "text-amber-900",
    richBar: "bg-amber-900/30",
  },
  info: {
    icon: <Info className="h-4 w-4" />,
    iconClass: "text-blue-500",
    border: "border-blue-200 dark:border-blue-800/60",
    accentBar: "bg-blue-500",
    richBg: "bg-blue-500 dark:bg-blue-600",
    richBorder: "border-blue-600 dark:border-blue-500",
    richText: "text-white",
    richIcon: "text-white/90",
    richBar: "bg-white/40",
  },
  loading: {
    icon: <Loader2 className="h-4 w-4 animate-spin" />,
    iconClass: "text-muted-foreground",
    border: "border-border/70",
    accentBar: "bg-muted-foreground/40",
    richBg: "bg-background",
    richBorder: "border-border/70",
    richText: "text-foreground",
    richIcon: "text-muted-foreground",
    richBar: "bg-muted-foreground/30",
  },
};

// ─── Position helpers ─────────────────────────────────────
const POSITION_CLASSES: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

const ALIGN_CLASSES: Record<ToastPosition, string> = {
  "top-left": "items-start",
  "top-center": "items-center",
  "top-right": "items-end",
  "bottom-left": "items-start",
  "bottom-center": "items-center",
  "bottom-right": "items-end",
};

const IS_TOP: Record<ToastPosition, boolean> = {
  "top-left": true,
  "top-center": true,
  "top-right": true,
  "bottom-left": false,
  "bottom-center": false,
  "bottom-right": false,
};

// ─── Toaster ──────────────────────────────────────────────
export interface ToasterProps {
  position?: ToastPosition;
  /** Vivid coloured backgrounds per variant */
  richColors?: boolean;
  closeButton?: boolean;
  maxToasts?: number;
  /** Gap between toasts in px */
  gap?: number;
  className?: string;
}

export function Toaster({
  position = "bottom-right",
  richColors = false,
  closeButton = true,
  maxToasts = 5,
  gap = 8,
  className,
}: ToasterProps) {
  const allToasts = useToastStore();
  const positions = Object.keys(POSITION_CLASSES) as ToastPosition[];

  return (
    <>
      { positions.map(pos => {
        const posToasts = allToasts
          .filter(t => t.position === pos)
          .slice(-maxToasts);

        if (!posToasts.length) return null;
        const isTop = IS_TOP[ pos ];

        return (
          <div
            key={ pos }
            aria-live="polite"
            aria-atomic={ false }
            className={ cn(
              "fixed z-[9999] flex flex-col pointer-events-none",
              "w-full sm:max-w-[400px]",
              POSITION_CLASSES[ pos ],
              ALIGN_CLASSES[ pos ],
              className
            ) }
            style={ { gap } }
          >
            { (isTop ? posToasts : [ ...posToasts ].reverse()).map(t => (
              <ToastCard
                key={ t.id }
                toast={ t }
                showClose={ closeButton }
                richColors={ richColors }
                onDismiss={ dismissToast }
                isTop={ isTop }
              />
            )) }
          </div>
        );
      }) }
    </>
  );
}

// ─── ToastCard ────────────────────────────────────────────
interface ToastCardProps {
  toast: ToastItem;
  showClose: boolean;
  richColors: boolean;
  onDismiss: (id: string) => void;
  isTop: boolean;
}

function ToastCard({ toast: t, showClose, richColors, onDismiss, isTop }: ToastCardProps) {
  const cfg = VARIANT_CONFIG[ t.variant ];

  // ── Progress bar ──
  const progressRef = React.useRef<HTMLDivElement | null>(null);
  const startTimeRef = React.useRef<number>(Date.now());
  const rafRef = React.useRef<number>(0);
  const elapsedRef = React.useRef<number>(0);
  const [ paused, setPaused ] = React.useState(false);

  React.useEffect(() => {
    if (!t.duration) return;
    const duration = t.duration;

    const tick = () => {
      const elapsed = elapsedRef.current + (Date.now() - startTimeRef.current);
      const pct = Math.min((elapsed / duration) * 100, 100);
      if (progressRef.current) progressRef.current.style.width = `${100 - pct}%`;
      if (elapsed >= duration) { onDismiss(t.id); return; }
      rafRef.current = requestAnimationFrame(tick);
    };

    startTimeRef.current = Date.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ t.id, t.duration, paused ]);

  const handlePause = () => {
    setPaused(true);
    elapsedRef.current += Date.now() - startTimeRef.current;
    cancelAnimationFrame(rafRef.current);
  };

  const handleResume = () => {
    startTimeRef.current = Date.now();
    setPaused(false);
  };

  // ── Swipe-to-dismiss ──
  const swipeStartX = React.useRef<number | null>(null);
  const swipeStartY = React.useRef<number | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    swipeStartX.current = e.touches[ 0 ].clientX;
    swipeStartY.current = e.touches[ 0 ].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.touches[ 0 ].clientX - swipeStartX.current;
    const dy = Math.abs(e.touches[ 0 ].clientY - (swipeStartY.current ?? 0));
    if (dy > 10) return; // vertical scroll — ignore
    if (cardRef.current) cardRef.current.style.transform = `translateX(${dx}px)`;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.changedTouches[ 0 ].clientX - swipeStartX.current;
    if (Math.abs(dx) > 80) {
      onDismiss(t.id);
    } else if (cardRef.current) {
      cardRef.current.style.transform = "";
    }
    swipeStartX.current = null;
  };

  // ── Derived styles ──
  const isRich = richColors && t.variant !== "default" && t.variant !== "loading";

  const enterClass = isTop ? "-translate-y-3 opacity-0 scale-95"
    : "translate-y-3 opacity-0 scale-95";
  const leaveClass = isTop ? "-translate-y-3 opacity-0 scale-95"
    : "translate-y-3 opacity-0 scale-95";

  return (
    <div
      ref={ cardRef }
      role="status"
      aria-live="polite"
      onMouseEnter={ handlePause }
      onMouseLeave={ handleResume }
      onFocus={ handlePause }
      onBlur={ handleResume }
      onTouchStart={ onTouchStart }
      onTouchMove={ onTouchMove }
      onTouchEnd={ onTouchEnd }
      className={ cn(
        // Layout
        "group pointer-events-auto relative overflow-hidden",
        "flex w-full items-start gap-3",
        "rounded-2xl border px-4 py-3.5",
        // Shadow
        "shadow-lg shadow-black/[0.08] dark:shadow-black/25",
        // Animation
        "transition-all duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]",
        // Entry / exit
        t.entering && enterClass,
        t.leaving && leaveClass,
        !t.entering && !t.leaving && "translate-y-0 translate-x-0 opacity-100 scale-100",
        // Colours
        isRich
          ? cn(cfg.richBg, cfg.richBorder, cfg.richText)
          : cn("bg-background text-foreground", cfg.border),
        // Left accent bar (subtle mode only)
        !isRich && t.variant !== "default" && t.variant !== "loading" && "pl-5",
        t.className
      ) }
    >
      {/* ── Left accent bar (subtle mode) ── */ }
      { !isRich && t.variant !== "default" && t.variant !== "loading" && (
        <span
          aria-hidden
          className={ cn(
            "absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl",
            cfg.accentBar
          ) }
        />
      ) }

      {/* ── Icon ── */ }
      <span
        aria-hidden
        className={ cn(
          "mt-0.5 shrink-0",
          isRich ? cfg.richIcon : cfg.iconClass
        ) }
      >
        { t.icon ?? cfg.icon }
      </span>

      {/* ── Content ── */ }
      <div className="flex-1 min-w-0">
        { t.title && (
          <p className={ cn(
            "text-sm font-semibold leading-snug",
            isRich ? cfg.richText : "text-foreground"
          ) }>
            { t.title }
          </p>
        ) }
        { t.description && (
          <p className={ cn(
            "text-sm mt-0.5 leading-relaxed",
            isRich ? "text-current opacity-85" : "text-muted-foreground"
          ) }>
            { t.description }
          </p>
        ) }
        { t.action && (
          <button
            type="button"
            onClick={ () => { t.action!.onClick(); onDismiss(t.id); } }
            className={ cn(
              "mt-2 text-xs font-semibold",
              "underline-offset-4 hover:underline transition-colors",
              isRich ? "text-current opacity-90 hover:opacity-100"
                : "text-foreground/80 hover:text-foreground",
              t.action.className
            ) }
          >
            { t.action.label }
          </button>
        ) }
      </div>

      {/* ── Close button (hidden until hover / focus) ── */ }
      { showClose && (
        <button
          type="button"
          onClick={ () => onDismiss(t.id) }
          aria-label="Dismiss"
          className={ cn(
            "shrink-0 mt-0.5 rounded-lg p-1",
            "transition-all duration-150",
            // Hidden by default, visible on group-hover or focus
            "opacity-0 group-hover:opacity-100 focus:opacity-100",
            isRich
              ? "text-current hover:bg-white/20 focus-visible:ring-white"
              : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/60",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          ) }
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) }

      {/* ── Progress bar ── */ }
      { !!t.duration && (
        <div className={ cn(
          "absolute bottom-0 left-0 right-0 h-[2px]",
          isRich ? "bg-white/20" : "bg-muted/50"
        ) }>
          <div
            ref={ progressRef }
            className={ cn(
              "h-full transition-none",
              isRich ? cfg.richBar : cfg.accentBar
            ) }
            style={ { width: "100%" } }
          />
        </div>
      ) }
    </div>
  );
}
