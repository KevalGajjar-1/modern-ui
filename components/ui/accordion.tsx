"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an Accordion");
  }
  return context;
}

interface AccordionProps {
  type: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
}

export function Accordion({
  type,
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
  collapsible = true,
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || (type === "single" ? "" : []));
  const value = controlledValue ?? uncontrolledValue;

  const handleValueChange = (newValue: string | string[]) => {
    let updatedValue: string | string[];
    if (type === "single") {
      const itemValue = Array.isArray(newValue) ? newValue[0] : newValue;
      updatedValue = value === itemValue ? "" : itemValue;
    } else {
      const currentValues = Array.isArray(value) ? value : [];
      const itemValue = Array.isArray(newValue) ? newValue[0] : newValue;
      updatedValue = currentValues.includes(itemValue)
        ? currentValues.filter((v) => v !== itemValue)
        : [...currentValues, itemValue];
    }
    setUncontrolledValue(updatedValue);
    onValueChange?.(updatedValue);
  };

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionItemContext = React.createContext<{ value: string } | undefined>(undefined);

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn("border-b", className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
  const { value: accordionValue, onValueChange, type } = useAccordion();
  const { value: itemValue } = React.useContext(AccordionItemContext)!;

  const isOpen = type === "single" ? accordionValue === itemValue : (accordionValue as string[]).includes(itemValue);

  return (
    <div className="flex">
      <button
        type="button"
        onClick={() => onValueChange?.(itemValue as any)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </div>
  );
}

export function AccordionContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { value: accordionValue, type } = useAccordion();
  const { value: itemValue } = React.useContext(AccordionItemContext)!;

  const isOpen = type === "single" ? accordionValue === itemValue : (accordionValue as string[]).includes(itemValue);

  if (!isOpen) return null;

  return (
    <div className={cn("overflow-hidden text-sm transition-all animate-in slide-in-from-top-1", className)}>
      <div className="pb-4 pt-0">{children}</div>
    </div>
  );
}
