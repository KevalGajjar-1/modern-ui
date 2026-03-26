"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { type ButtonProps } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────
export type ButtonGroupOrientation = "horizontal" | "vertical";
export type ButtonGroupVariant = ButtonProps[ "variant" ];
export type ButtonGroupSize = ButtonProps[ "size" ];

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: ButtonGroupOrientation;
  /** Apply a shared variant to all children that don't specify their own */
  variant?: ButtonGroupVariant;
  /** Apply a shared size to all children */
  size?: ButtonGroupSize;
  /** Compress gap between buttons (attached look) */
  attached?: boolean;
  /** Disable all buttons in the group */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

// ─── Context ──────────────────────────────────────────────
interface ButtonGroupContextValue {
  orientation: ButtonGroupOrientation;
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  attached: boolean;
  disabled: boolean;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({
  orientation: "horizontal",
  attached: true,
  disabled: false,
});

export function useButtonGroup() {
  return React.useContext(ButtonGroupContext);
}

// ─── ButtonGroup ──────────────────────────────────────────
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      orientation = "horizontal",
      variant,
      size,
      attached = true,
      disabled = false,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === "horizontal";

    // Clone children to inject rounded corner overrides for attached mode
    const items = React.Children.toArray(children);
    const count = items.length;

    const cloned = items.map((child, idx) => {
      if (!React.isValidElement(child)) return child;

      const isFirst = idx === 0;
      const isLast = idx === count - 1;
      const isMid = !isFirst && !isLast;

      let roundedClass = "";

      if (attached && count > 1) {
        if (isHorizontal) {
          roundedClass = isFirst ? "rounded-r-none"
            : isLast ? "rounded-l-none"
              : isMid ? "rounded-none"
                : "";
        } else {
          roundedClass = isFirst ? "rounded-b-none"
            : isLast ? "rounded-t-none"
              : isMid ? "rounded-none"
                : "";
        }
      }

      const dividerClass =
        attached && !isLast
          ? isHorizontal
            ? "border-r-0"
            : "border-b-0"
          : "";

      return React.cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLElement> & { disabled?: boolean; className?: string }>, {
        className: cn(
          (child as React.ReactElement<{ className?: string }>).props.className,
          roundedClass,
          dividerClass,
          fullWidth && "flex-1",
        ),
        disabled:
          disabled ||
          (child as React.ReactElement<{ disabled?: boolean }>).props.disabled,
      });
    });

    return (
      <ButtonGroupContext.Provider
        value={ { orientation, variant, size, attached, disabled } }
      >
        <div
          ref={ ref }
          role="group"
          className={ cn(
            "inline-flex",
            isHorizontal ? "flex-row" : "flex-col",
            fullWidth && "w-full flex",
            // Attached: merge borders between buttons
            attached && isHorizontal && "[&>*:not(:first-child)]:border-l-0",
            attached && !isHorizontal && "[&>*:not(:first-child)]:border-t-0",
            // Focus-visible ring isolation per button
            "[&>*]:relative [&>*]:z-0 [&>*:focus-visible]:z-10",
            className
          ) }
          { ...props }
        >
          { cloned }
        </div>
      </ButtonGroupContext.Provider>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";
