"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  className,
  ...props
}: CheckboxProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked || false);
  const checked = controlledChecked ?? uncontrolledChecked;

  const handleCheckedChange = () => {
    const newChecked = !checked;
    setUncontrolledChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={handleCheckedChange}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary text-primary-foreground" : "bg-background",
        className
      )}
      data-state={checked ? "checked" : "unchecked"}
      {...props}
    >
      {checked && (
        <span className="flex items-center justify-center text-current">
          <Check className="h-4 w-4" />
        </span>
      )}
    </button>
  );
}
