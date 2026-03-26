"use client";

import * as React from "react";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);

function useRadioGroup() {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error("useRadioGroup must be used within a RadioGroup");
  }
  return context;
}

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: RadioGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    setUncontrolledValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={cn("grid gap-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function RadioGroupItem({ value: itemValue, className, ...props }: RadioGroupItemProps) {
  const { value, onValueChange } = useRadioGroup();
  const isChecked = value === itemValue;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isChecked}
      onClick={() => onValueChange?.(itemValue)}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
        isChecked && "bg-primary text-primary-foreground",
        className
      )}
      {...props}
    >
      {isChecked && (
        <span className="flex items-center justify-center">
          <Circle className="h-2.5 w-2.5 fill-current text-current" />
        </span>
      )}
    </button>
  );
}
