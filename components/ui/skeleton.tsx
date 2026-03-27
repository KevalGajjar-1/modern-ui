import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────
export type SkeletonVariant = "default" | "shimmer" | "pulse" | "wave";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  /** Force a circle shape */
  circle?: boolean;
  /** Width shorthand */
  w?: string | number;
  /** Height shorthand */
  h?: string | number;
  className?: string;
}

// ─── Skeleton ─────────────────────────────────────────────
export function Skeleton({
  variant = "shimmer",
  circle = false,
  w,
  h,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={ cn(
        "bg-muted/70 overflow-hidden",
        circle ? "rounded-full" : "rounded-lg",
        variant === "shimmer" && "skeleton-shimmer",
        variant === "pulse" && "animate-pulse",
        variant === "wave" && "skeleton-wave",
        className
      ) }
      style={ {
        width: w !== undefined ? (typeof w === "number" ? `${w}px` : w) : undefined,
        height: h !== undefined ? (typeof h === "number" ? `${h}px` : h) : undefined,
        ...style,
      } }
      { ...props }
    />
  );
}

// ─── Preset compositions ──────────────────────────────────

/** A single text line skeleton */
export function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
  className,
  variant,
}: {
  lines?: number;
  lastLineWidth?: string;
  className?: string;
  variant?: SkeletonVariant;
}) {
  return (
    <div className={ cn("flex flex-col gap-2", className) }>
      { Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={ i }
          variant={ variant }
          h={ 14 }
          style={ {
            width: i === lines - 1 && lines > 1 ? lastLineWidth : "100%",
          } }
        />
      )) }
    </div>
  );
}

/** Avatar + name/subtitle row */
export function SkeletonAvatar({
  size = 40,
  hasText = true,
  lines = 2,
  className,
  variant,
}: {
  size?: number;
  hasText?: boolean;
  lines?: number;
  className?: string;
  variant?: SkeletonVariant;
}) {
  return (
    <div className={ cn("flex items-center gap-3", className) }>
      <Skeleton circle w={ size } h={ size } variant={ variant } className="shrink-0" />
      { hasText && (
        <div className="flex flex-col gap-1.5 flex-1">
          { Array.from({ length: lines }, (_, i) => (
            <Skeleton
              key={ i }
              variant={ variant }
              h={ i === 0 ? 14 : 11 }
              style={ { width: i === 0 ? "50%" : "35%" } }
            />
          )) }
        </div>
      ) }
    </div>
  );
}

/** Card skeleton */
export function SkeletonCard({
  hasImage = true,
  imageH = 160,
  lines = 3,
  className,
  variant,
}: {
  hasImage?: boolean;
  imageH?: number;
  lines?: number;
  className?: string;
  variant?: SkeletonVariant;
}) {
  return (
    <div className={ cn(
      "rounded-2xl border border-border/40 overflow-hidden bg-card",
      className
    ) }>
      { hasImage && (
        <Skeleton
          variant={ variant }
          h={ imageH }
          className="rounded-none w-full"
        />
      ) }
      <div className="p-4 flex flex-col gap-2.5">
        <SkeletonAvatar variant={ variant } />
        <SkeletonText variant={ variant } lines={ lines } />
        <div className="flex gap-2 mt-1">
          <Skeleton variant={ variant } h={ 32 } className="flex-1 rounded-xl" />
          <Skeleton variant={ variant } h={ 32 } w={ 80 } className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/** Table skeleton */
export function SkeletonTable({
  rows = 5,
  cols = 4,
  hasHeader = true,
  className,
  variant,
}: {
  rows?: number;
  cols?: number;
  hasHeader?: boolean;
  className?: string;
  variant?: SkeletonVariant;
}) {
  return (
    <div className={ cn("w-full rounded-2xl border border-border/40 overflow-hidden", className) }>
      { hasHeader && (
        <div className="flex gap-4 px-4 py-3 border-b border-border/40 bg-muted/30">
          { Array.from({ length: cols }, (_, i) => (
            <Skeleton key={ i } variant={ variant } h={ 14 }
              style={ { flex: i === 0 ? 2 : 1 } } />
          )) }
        </div>
      ) }
      { Array.from({ length: rows }, (_, r) => (
        <div
          key={ r }
          className="flex gap-4 px-4 py-3 border-b border-border/30 last:border-0"
        >
          { Array.from({ length: cols }, (_, c) => (
            <Skeleton
              key={ c }
              variant={ variant }
              h={ 14 }
              style={ {
                flex: c === 0 ? 2 : 1,
                width: c === cols - 1 ? "60%" : undefined,
              } }
            />
          )) }
        </div>
      )) }
    </div>
  );
}
