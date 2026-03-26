import * as React from "react"
import { cn } from "@/lib/utils"

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex items-center", className)}
    {...props}
  />
))
InputGroup.displayName = "InputGroup"

const InputGroupText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex items-center px-3 text-muted-foreground text-sm border border-input bg-muted h-10 first:rounded-l-md last:rounded-r-md first:border-r-0 last:border-l-0",
      className
    )}
    {...props}
  />
))
InputGroupText.displayName = "InputGroupText"

export { InputGroup, InputGroupText }
