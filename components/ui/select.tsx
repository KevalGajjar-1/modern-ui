"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectContextValue {
  value?: string;
  label?: React.ReactNode;
  onValueChange?: (value: string, label: React.ReactNode) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedLabelRef: React.MutableRefObject<React.ReactNode>;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined);

function useSelect() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("useSelect must be used within a Select");
  }
  return context;
}

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value: controlledValue, defaultValue, onValueChange, children }: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const selectedLabelRef = React.useRef<React.ReactNode>(null);
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const value = controlledValue ?? uncontrolledValue;

  const handleValueChange = React.useCallback(
    (newValue: string, newLabel: React.ReactNode) => {
      setUncontrolledValue(newValue);
      selectedLabelRef.current = newLabel;
      onValueChange?.(newValue);
      setOpen(false);
    },
    [onValueChange]
  );

  React.useEffect(() => {
    if (triggerRef.current) {
      triggerRef.current.style.setProperty('--select-trigger-width', `${triggerRef.current.offsetWidth}px`);
    }
  }, [open]);

  return (
    <SelectContext.Provider value={{ value, label: selectedLabelRef.current, onValueChange: handleValueChange, open, setOpen, selectedLabelRef }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSelect();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-11 w-full items-center justify-between rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/50 transition-colors duration-200",
        open && "border-primary",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2 truncate">{children}</span>
      <ChevronDown className={cn("h-4 w-4 opacity-50 transition-all duration-200", open && "rotate-180 opacity-100")} />
    </button>
  );
}

export function SelectTriggerMinimal({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSelect();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between border-b border-input bg-transparent px-1 py-2 text-sm transition-colors hover:border-primary focus:outline-none",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2">{children}</span>
      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
    </button>
  );
}

export function SelectTriggerPill({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSelect();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-12 w-full items-center justify-between rounded-full border-2 border-input bg-background px-6 py-3 text-sm font-medium transition-all duration-200 hover:border-primary hover:shadow-md focus:outline-none",
        open && "border-primary shadow-md",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-3">{children}</span>
      <ChevronDown className={cn("h-5 w-5 transition-all duration-200", open && "rotate-180 scale-110")} />
    </button>
  );
}

export function SelectTriggerUnderline({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSelect();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between border-b-2 bg-transparent px-0 py-2 text-sm transition-colors hover:text-primary focus:outline-none",
        open ? "border-primary text-primary" : "border-muted-foreground/30",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2 font-medium">{children}</span>
      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { label } = useSelect();
  return <span>{label || placeholder}</span>;
}

export function SelectContent({ className, children, align = "start" }: { className?: string; children: React.ReactNode; align?: "start" | "end" | "center" }) {
  const { open, setOpen } = useSelect();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  const alignClasses = {
    start: "left-0",
    end: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full z-50 mt-2 min-w-[var(--select-trigger-width)] max-w-sm overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-1",
        alignClasses[align],
        className
      )}
    >
      <div className="max-h-60 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        {children}
      </div>
    </div>
  );
}

export function SelectContentDropdown({ className, children }: { className?: string; children: React.ReactNode }) {
  const { open, setOpen } = useSelect();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full left-0 z-50 mt-1 w-full overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-2xl animate-in fade-in-0 slide-in-from-top-2",
        className
      )}
    >
      <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20">
        {children}
      </div>
    </div>
  );
}

export function SelectContentCard({ className, children }: { className?: string; children: React.ReactNode }) {
  const { open, setOpen } = useSelect();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border-2 bg-popover text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      <div className="border-b bg-muted/30 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select an option</p>
      </div>
      <div className="max-h-60 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20">
        {children}
      </div>
    </div>
  );
}

export function SelectItem({ value: itemValue, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const { value, onValueChange, selectedLabelRef } = useSelect();
  const isSelected = value === itemValue;

  React.useEffect(() => {
    if (isSelected) {
      selectedLabelRef.current = children;
    }
  }, [isSelected, children, selectedLabelRef]);

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => onValueChange?.(itemValue, children)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-md py-2.5 pl-9 pr-3 text-sm outline-none transition-colors duration-150 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected && "bg-accent/70 text-accent-foreground font-medium",
        className
      )}
    >
      <span className="absolute left-2.5 flex h-4 w-4 items-center justify-center">
        {isSelected && <Check className="h-4 w-4 text-primary" />}
      </span>
      <span className="truncate">{children}</span>
    </div>
  );
}

export function SelectItemRadio({ value: itemValue, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const { value, onValueChange, selectedLabelRef } = useSelect();
  const isSelected = value === itemValue;

  React.useEffect(() => {
    if (isSelected) {
      selectedLabelRef.current = children;
    }
  }, [isSelected, children, selectedLabelRef]);

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => onValueChange?.(itemValue, children)}
      className={cn(
        "flex w-full cursor-pointer select-none items-center rounded-lg py-3 pl-4 pr-3 text-sm outline-none transition-all duration-150 hover:bg-accent/50",
        isSelected && "bg-accent",
        className
      )}
    >
      <span className="mr-3 flex h-5 w-5 items-center justify-center">
        <span className={cn("h-2.5 w-2.5 rounded-full transition-all", isSelected ? "bg-primary scale-100" : "bg-muted-foreground/30 scale-0")} />
      </span>
      {children}
    </div>
  );
}

export function SelectItemIcon({ value: itemValue, icon: Icon, className, children }: { value: string; icon?: React.ElementType; className?: string; children: React.ReactNode }) {
  const { value, onValueChange, selectedLabelRef } = useSelect();
  const isSelected = value === itemValue;

  React.useEffect(() => {
    if (isSelected) {
      selectedLabelRef.current = children;
    }
  }, [isSelected, children, selectedLabelRef]);

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => onValueChange?.(itemValue, children)}
      className={cn(
        "flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-2.5 pl-3 pr-3 text-sm transition-colors hover:bg-accent",
        isSelected && "bg-accent",
        className
      )}
    >
      {Icon && <Icon className={cn("h-5 w-5", isSelected ? "text-primary" : "text-muted-foreground")} />}
      <span className="flex-1">{children}</span>
      {isSelected && <Check className="h-4 w-4 text-primary" />}
    </div>
  );
}

export function SelectGroup({ children }: { children: React.ReactNode }) {
  return <div className="p-1">{children}</div>;
}

export function SelectLabel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", className)}>{children}</div>;
}
