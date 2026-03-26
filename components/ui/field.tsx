"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, Eye, EyeOff } from "lucide-react";

// ─── Types ────────────────────────────────────────────────
export type FieldStatus = "idle" | "error" | "success" | "warning";
export type FieldLayout = "vertical" | "horizontal";
export type FieldLabelPos = "top" | "inline" | "floating";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Field label text */
  label?: string;
  /** Unique id — links label → input and hint → aria-describedby */
  htmlFor?: string;
  /** Helper text shown below the input */
  hint?: string;
  /** Validation message (error / success / warning) */
  message?: string;
  status?: FieldStatus;
  /** Show red asterisk */
  required?: boolean;
  /** Show optional badge */
  optional?: boolean;
  /** Additional label content (e.g. a tooltip icon) */
  labelSuffix?: React.ReactNode;
  /** Horizontal places label left of input */
  layout?: FieldLayout;
  /** Width of label column in horizontal layout */
  labelWidth?: string;
  disabled?: boolean;
}

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
  suffix?: React.ReactNode;
  disabled?: boolean;
}

export interface FieldMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  status?: FieldStatus;
  icon?: boolean;
}

export interface FieldHintProps extends React.HTMLAttributes<HTMLParagraphElement> { }

// ─── Context ──────────────────────────────────────────────
interface FieldCtx {
  id?: string;
  hintId?: string;
  msgId?: string;
  status: FieldStatus;
  disabled: boolean;
}

const FieldContext = React.createContext<FieldCtx>({
  status: "idle", disabled: false,
});

export function useFieldCtx() {
  return React.useContext(FieldContext);
}

// ─── Status styles ────────────────────────────────────────
const STATUS_MSG: Record<FieldStatus, string> = {
  idle: "text-muted-foreground",
  error: "text-red-600   dark:text-red-400",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600  dark:text-amber-400",
};

const STATUS_ICONS: Record<FieldStatus, React.ReactNode | null> = {
  idle: null,
  error: <AlertCircle className="h-3.5 w-3.5 shrink-0" />,
  success: <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />,
  warning: <AlertCircle className="h-3.5 w-3.5 shrink-0" />,
};

// ─── Field ────────────────────────────────────────────────
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      className,
      label,
      htmlFor,
      hint,
      message,
      status = "idle",
      required = false,
      optional = false,
      labelSuffix,
      layout = "vertical",
      labelWidth = "9rem",
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const uid = React.useId();
    const id = htmlFor ?? `field-${uid}`;
    const hintId = hint ? `${id}-hint` : undefined;
    const msgId = message ? `${id}-message` : undefined;

    return (
      <FieldContext.Provider value={ { id, hintId, msgId, status, disabled } }>
        <div
          ref={ ref }
          data-status={ status }
          data-layout={ layout }
          data-disabled={ disabled ? "" : undefined }
          className={ cn(
            "group",
            layout === "horizontal"
              ? "flex items-start gap-4"
              : "flex flex-col gap-1.5",
            disabled && "opacity-60",
            className
          ) }
          { ...props }
        >
          {/* Label column */ }
          { label && (
            <div
              className={ cn(
                layout === "horizontal" && "shrink-0 pt-2.5",
              ) }
              style={ layout === "horizontal" ? { width: labelWidth } : undefined }
            >
              <FieldLabel
                htmlFor={ id }
                required={ required }
                optional={ optional }
                suffix={ labelSuffix }
                disabled={ disabled }
              >
                { label }
              </FieldLabel>
            </div>
          ) }

          {/* Input + messages column */ }
          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
            {/* Clone children to inject id + aria attrs */ }
            { React.Children.map(children, child => {
              if (!React.isValidElement(child)) return child;
              const el = child as React.ReactElement<React.HTMLAttributes<HTMLElement> & {
                id?: string;
                "aria-describedby"?: string;
                "aria-invalid"?: boolean;
                disabled?: boolean;
              }>;
              const describedBy = [ hintId, msgId ].filter(Boolean).join(" ") || undefined;
              return React.cloneElement(el, {
                id: el.props.id ?? id,
                "aria-describedby": el.props[ "aria-describedby" ] ?? describedBy,
                "aria-invalid": status === "error" ? true : el.props[ "aria-invalid" ],
                disabled: disabled || el.props.disabled,
              });
            }) }

            {/* Hint */ }
            { hint && (
              <FieldHint id={ hintId }>
                { hint }
              </FieldHint>
            ) }

            {/* Validation message */ }
            { message && (
              <FieldMessage id={ msgId } status={ status } icon>
                { message }
              </FieldMessage>
            ) }
          </div>
        </div>
      </FieldContext.Provider>
    );
  }
);
Field.displayName = "Field";

// ─── FieldLabel ───────────────────────────────────────────
export const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, required, optional, suffix, disabled, children, ...props }, ref) => (
    <label
      ref={ ref }
      className={ cn(
        "flex items-center gap-1.5",
        "text-sm font-medium leading-none",
        disabled ? "text-muted-foreground" : "text-foreground",
        "select-none",
        className
      ) }
      { ...props }
    >
      <span>{ children }</span>
      { required && (
        <span className="text-red-500 text-xs leading-none" aria-hidden>*</span>
      ) }
      { optional && !required && (
        <span className="text-[10px] font-normal text-muted-foreground/70 bg-muted/60 px-1.5 py-0.5 rounded-md leading-none">
          optional
        </span>
      ) }
      { suffix && (
        <span className="text-muted-foreground/60">{ suffix }</span>
      ) }
    </label>
  )
);
FieldLabel.displayName = "FieldLabel";

// ─── FieldHint ────────────────────────────────────────────
export const FieldHint = React.forwardRef<HTMLParagraphElement, FieldHintProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ ref }
      className={ cn("text-xs text-muted-foreground leading-relaxed", className) }
      { ...props }
    />
  )
);
FieldHint.displayName = "FieldHint";

// ─── FieldMessage ─────────────────────────────────────────
export const FieldMessage = React.forwardRef<HTMLParagraphElement, FieldMessageProps>(
  ({ className, status = "idle", icon = true, children, ...props }, ref) => (
    <p
      ref={ ref }
      role={ status === "error" ? "alert" : undefined }
      aria-live={ status === "error" ? "assertive" : "polite" }
      className={ cn(
        "flex items-center gap-1.5 text-xs font-medium leading-relaxed",
        STATUS_MSG[ status ],
        className
      ) }
      { ...props }
    >
      { icon && STATUS_ICONS[ status ] }
      { children }
    </p>
  )
);
FieldMessage.displayName = "FieldMessage";

// ─── PasswordInput — showcase of Field + Input combo ──────
export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showToggle?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showToggle = true, ...props }, ref) => {
    const [ visible, setVisible ] = React.useState(false);
    return (
      <div className="relative">
        <input
          ref={ ref }
          type={ visible ? "text" : "password" }
          className={ cn(
            "w-full rounded-xl border border-input bg-background px-3.5 py-2 text-sm",
            "outline-none transition-all duration-150",
            "focus:border-ring focus:outline-2 focus:outline-ring/25",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "placeholder:text-muted-foreground",
            showToggle && "pr-10",
            className
          ) }
          { ...props }
        />
        { showToggle && (
          <button
            type="button"
            onClick={ () => setVisible(v => !v) }
            className={ cn(
              "absolute right-2.5 top-1/2 -translate-y-1/2",
              "text-muted-foreground/60 hover:text-muted-foreground",
              "transition-colors focus:outline-none",
              "p-1 rounded-md"
            ) }
            tabIndex={ -1 }
            aria-label={ visible ? "Hide password" : "Show password" }
          >
            { visible
              ? <EyeOff className="h-4 w-4" />
              : <Eye className="h-4 w-4" /> }
          </button>
        ) }
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
