"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Switch({
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  className,
  disabled = false,
  size = "md",
  ...props
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked || false);
  const checked = controlledChecked ?? uncontrolledChecked;

  const handleCheckedChange = () => {
    if (disabled) return;
    const newChecked = !checked;
    setUncontrolledChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  const sizeClasses = {
    sm: "h-4 w-7",
    md: "h-6 w-11",
    lg: "h-8 w-14",
  };

  const thumbSizes = {
    sm: "h-3 w-3 translate-x-3.5",
    md: "h-5 w-5 translate-x-5",
    lg: "h-6 w-6 translate-x-6",
  };

  const uncheckedThumbSizes = {
    sm: "h-3 w-3 translate-x-0.5 scale-90",
    md: "h-5 w-5 translate-x-0 scale-95",
    lg: "h-6 w-6 translate-x-0.5 scale-95",
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleCheckedChange}
      disabled={disabled}
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        checked ? "bg-primary" : "bg-input",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-all duration-200 ease-in-out",
          checked ? thumbSizes[size] : uncheckedThumbSizes[size]
        )}
      />
    </button>
  );
}

export function SwitchMinimal({
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  className,
  disabled = false,
  ...props
}: Omit<SwitchProps, 'size'>) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked || false);
  const checked = controlledChecked ?? uncontrolledChecked;

  const handleCheckedChange = () => {
    if (disabled) return;
    const newChecked = !checked;
    setUncontrolledChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleCheckedChange}
      disabled={disabled}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-muted transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        checked && "bg-foreground",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow transition-transform duration-200",
          checked ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

export function SwitchRounded({
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  className,
  disabled = false,
  ...props
}: Omit<SwitchProps, 'size'>) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked || false);
  const checked = controlledChecked ?? uncontrolledChecked;

  const handleCheckedChange = () => {
    if (disabled) return;
    const newChecked = !checked;
    setUncontrolledChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleCheckedChange}
      disabled={disabled}
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-[20px] border border-muted-foreground/20 bg-muted transition-all duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        checked && "border-primary/50 bg-primary/20",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-[18px] bg-background shadow-md transition-all duration-300 ease-in-out",
          checked ? "translate-x-5 bg-primary" : "translate-x-0.5 bg-muted-foreground/50"
        )}
      />
    </button>
  );
}

export function SwitchWithIcon({
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  className,
  disabled = false,
  onIcon,
  offIcon,
  ...props
}: Omit<SwitchProps, 'size'> & { onIcon?: React.ReactNode; offIcon?: React.ReactNode }) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked || false);
  const checked = controlledChecked ?? uncontrolledChecked;

  const handleCheckedChange = () => {
    if (disabled) return;
    const newChecked = !checked;
    setUncontrolledChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleCheckedChange}
      disabled={disabled}
      className={cn(
        "peer relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked && "bg-primary",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-background shadow transition-all duration-200",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      >
        {checked ? onIcon : offIcon}
      </span>
    </button>
  );
}
