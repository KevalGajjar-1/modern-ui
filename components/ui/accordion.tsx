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
  disabled?: boolean;
}

const AccordionItemContext = React.createContext<{ value: string; disabled?: boolean } | undefined>(undefined);

export function AccordionItem({ value, children, className, disabled = false }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value, disabled }}>
      <div className={cn("border-b", className, disabled && "opacity-50")}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ className, children }: { className?: string; children: React.ReactNode }) {
  const { value: accordionValue, onValueChange, type } = useAccordion();
  const itemContext = React.useContext(AccordionItemContext)!;
  const { value: itemValue, disabled } = itemContext;

  const isOpen = type === "single" ? accordionValue === itemValue : (accordionValue as string[]).includes(itemValue);

  return (
    <div className="flex">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onValueChange?.(itemValue as any)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
          disabled && "cursor-not-allowed opacity-50",
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
  const itemContext = React.useContext(AccordionItemContext)!;
  const { value: itemValue } = itemContext;

  const isOpen = type === "single" ? accordionValue === itemValue : (accordionValue as string[]).includes(itemValue);
  const [height, setHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Set height to scrollHeight for smooth animation
        const scrollHeight = contentRef.current.scrollHeight;
        setHeight(scrollHeight);
        // After animation, set to auto for responsive behavior
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.style.height = 'auto';
          }
        }, 200);
      } else {
        // Set to fixed height before animating to 0
        if (contentRef.current) {
          contentRef.current.style.height = contentRef.current.scrollHeight + 'px';
        }
        setTimeout(() => {
          setHeight(0);
        }, 10);
      }
    }
  }, [isOpen]);

  // Check if animation is disabled
  const isAnimateNone = className?.includes('animate-none');
  const durationClass = className?.includes('duration-') ? '' : 'duration-200';

  return (
    <div 
      ref={contentRef}
      className={cn(
        "overflow-hidden text-sm transition-all", 
        !isAnimateNone && durationClass,
        className
      )}
      style={{ 
        height: isAnimateNone ? (isOpen ? 'auto' : 0) : height,
        display: 'block'
      }}
      data-state={isOpen ? "open" : "closed"}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  );
}
