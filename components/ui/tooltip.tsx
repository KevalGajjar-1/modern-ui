"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
}

export function Tooltip({ children, content, delayDuration = 300 }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, delayDuration);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(false);
  };

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {open && (
        <div
          className={cn(
            "absolute bottom-full left-1/2 z-50 mb-2 translate-x-[-50%] rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export function TooltipTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  return <>{children}</>;
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
