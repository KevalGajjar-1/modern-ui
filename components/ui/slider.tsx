"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'> {
  defaultValue?: number[];
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  showTooltip?: boolean;
  disabled?: boolean;
}

export function Slider({
  defaultValue = [0],
  value: controlledValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  showTooltip = false,
  disabled = false,
}: SliderProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const trackRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);

  const handleValueChange = (newValue: number[]) => {
    setUncontrolledValue(newValue);
    onValueChange?.(newValue);
  };

  const calculateValue = (clientX: number) => {
    if (!trackRef.current) return value[0];
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    const newValue = calculateValue(e.clientX);
    handleValueChange([newValue]);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const movedValue = calculateValue(moveEvent.clientX);
      handleValueChange([movedValue]);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMouseDown(e);
  };

  const percentage = ((value[0] - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      onMouseDown={handleMouseDown}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute h-full bg-primary transition-all duration-75"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        ref={thumbRef}
        onMouseDown={handleThumbMouseDown}
        className={cn(
          "absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          disabled ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing"
        )}
        style={{ left: `calc(${percentage}% - 10px)` }}
      />
      {showTooltip && (
        <div
          className="absolute -top-8 px-2 py-1 text-xs font-medium text-white bg-primary rounded shadow-lg"
          style={{ left: `calc(${percentage}% - 5px)` }}
        >
          {value[0]}
        </div>
      )}
    </div>
  );
}

export function SliderMinimal({
  defaultValue = [0],
  value: controlledValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  disabled = false,
}: Omit<SliderProps, 'showTooltip'>) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const trackRef = React.useRef<HTMLDivElement>(null);

  const handleValueChange = (newValue: number[]) => {
    setUncontrolledValue(newValue);
    onValueChange?.(newValue);
  };

  const calculateValue = (clientX: number) => {
    if (!trackRef.current) return value[0];
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    const newValue = calculateValue(e.clientX);
    handleValueChange([newValue]);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const movedValue = calculateValue(moveEvent.clientX);
      handleValueChange([movedValue]);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const percentage = ((value[0] - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      onMouseDown={handleMouseDown}
      className={cn(
        "relative flex w-full touch-none select-none items-center py-2",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="relative h-1 w-full overflow-hidden rounded bg-muted">
        <div
          className="absolute h-full bg-foreground transition-all duration-75"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function SliderThick({
  defaultValue = [0],
  value: controlledValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  disabled = false,
}: Omit<SliderProps, 'showTooltip'>) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const trackRef = React.useRef<HTMLDivElement>(null);

  const handleValueChange = (newValue: number[]) => {
    setUncontrolledValue(newValue);
    onValueChange?.(newValue);
  };

  const calculateValue = (clientX: number) => {
    if (!trackRef.current) return value[0];
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    const newValue = calculateValue(e.clientX);
    handleValueChange([newValue]);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const movedValue = calculateValue(moveEvent.clientX);
      handleValueChange([movedValue]);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const percentage = ((value[0] - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      onMouseDown={handleMouseDown}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-75"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className="absolute h-7 w-7 rounded-full border-4 border-primary bg-background shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ left: `calc(${percentage}% - 14px)`, cursor: 'grab' }}
      />
    </div>
  );
}

export function SliderDouble({
  defaultValue = [0, 100],
  value: controlledValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  disabled = false,
}: Omit<SliderProps, 'showTooltip'>) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [draggingThumb, setDraggingThumb] = React.useState<number | null>(null);

  const handleValueChange = (newValue: number[]) => {
    setUncontrolledValue(newValue);
    onValueChange?.(newValue);
  };

  const calculateValue = (clientX: number) => {
    if (!trackRef.current) return value[0];
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    return Math.round(rawValue / step) * step;
  };

  const handleMouseDown = (e: React.MouseEvent, thumbIndex: number) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setDraggingThumb(thumbIndex);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const newValue = calculateValue(moveEvent.clientX);
      const newValues = [...value];
      
      if (thumbIndex === 0) {
        newValues[0] = Math.min(newValue, value[1] - step);
      } else {
        newValues[1] = Math.max(newValue, value[0] + step);
      }
      
      handleValueChange(newValues);
    };

    const handleMouseUp = () => {
      setDraggingThumb(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const startPercentage = ((value[0] - min) / (max - min)) * 100;
  const endPercentage = ((value[1] - min) / (max - min)) * 100;
  const rangePercentage = endPercentage - startPercentage;

  return (
    <div
      ref={trackRef}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute h-full bg-primary transition-all duration-75"
          style={{ left: `${startPercentage}%`, width: `${rangePercentage}%` }}
        />
      </div>
      <div
        onMouseDown={(e) => handleMouseDown(e, 0)}
        className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-110 active:scale-95"
        style={{ left: `calc(${startPercentage}% - 10px)`, cursor: 'grab' }}
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, 1)}
        className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md transition-transform hover:scale-110 active:scale-95"
        style={{ left: `calc(${endPercentage}% - 10px)`, cursor: 'grab' }}
      />
    </div>
  );
}
