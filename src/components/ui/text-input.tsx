import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Component: TextInput
 * Figma source: node 761:20738
 * Single-line text input with label, helper/validation text, and status icons.
 */

const inputSizeVariants = cva(
  [
    "w-full bg-[var(--background-primary)] rounded-[var(--radius-sm)]",
    "px-[var(--padding-lg)]",
    "font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)]",
    "text-[color:var(--content-primary)]",
    "placeholder:text-[color:var(--content-secondary)]",
    "outline-none transition-colors",
    "disabled:text-[color:var(--content-disabled)] disabled:placeholder:text-[color:var(--content-disabled)] disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        md: "h-[40px] text-[length:var(--size-small)] leading-[var(--line-height-small-text)]",
        sm: "h-[32px] text-[length:var(--size-button)] leading-[var(--line-height-tiny-text)]",
      },
    },
    defaultVariants: { size: "md" },
  }
);

/* Status icons */
const SuccessDot = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="size-[13px] shrink-0">
    <circle cx="6.5" cy="6.5" r="5" fill="var(--content-success)" />
  </svg>
);

const ErrorDot = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="size-[13px] shrink-0">
    <circle cx="6.5" cy="6.5" r="5" fill="var(--content-attention)" />
  </svg>
);

const WarningTriangle = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="size-[13px] shrink-0">
    <path d="M6.5 1L12 11.5H1L6.5 1Z" fill="var(--content-warning-icons)" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4 shrink-0">
    <circle cx="8" cy="8" r="7" fill="var(--content-attention)" />
    <path d="M8 4.5V8.5" stroke="var(--content-on-primary)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.75" fill="var(--content-on-primary)" />
  </svg>
);

interface TextInputProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  /** Label text above the input */
  label?: string;
  /** Default helper text below the input */
  helperText?: string;
  /** Error message (shows error state) */
  errorText?: string;
  /** Success message (shows success state) */
  successText?: string;
  /** Warning message (shows warning state) */
  warningText?: string;
  /** Input size */
  size?: "md" | "sm";
}

const borderStateClasses = {
  default: "border border-[var(--border-subtle)] hover:border-[var(--border-medium)] focus-within:border-[var(--border-strong)] focus-within:ring-1 focus-within:ring-inset focus-within:ring-[var(--border-strong)]",
  success: "border border-[var(--border-success)] ring-1 ring-inset ring-[var(--border-success)]",
  error: "border border-[var(--border-attention)] ring-1 ring-inset ring-[var(--border-attention)]",
  warning: "border border-[var(--border-attention)] ring-1 ring-inset ring-[var(--border-attention)]",
  disabled: "border border-[var(--border-subtle)]",
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      label,
      helperText,
      errorText,
      successText,
      warningText,
      size = "md",
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const helperId = `${inputId}-helper`;

    const state = disabled
      ? "disabled"
      : errorText
        ? "error"
        : successText
          ? "success"
          : warningText
            ? "warning"
            : "default";

    const validationText = errorText || successText || warningText;
    const showHelper = !!(helperText || validationText);

    return (
      <div className={cn("flex flex-col items-start min-w-16 w-full", className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "pb-[8px] font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-button)] leading-[var(--line-height-small-text)] uppercase whitespace-nowrap",
              disabled
                ? "text-[color:var(--content-disabled)]"
                : "text-[color:var(--content-primary)]"
            )}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div
          className={cn(
            "relative flex items-center w-full rounded-[var(--radius-sm)]",
            borderStateClasses[state]
          )}
        >
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={state === "error" || undefined}
            aria-describedby={showHelper ? helperId : undefined}
            className={cn(inputSizeVariants({ size }), "flex-1 min-w-0")}
            {...props}
          />
          {state === "error" && (
            <span className="absolute right-[var(--padding-lg)] pointer-events-none">
              <ErrorIcon />
            </span>
          )}
        </div>

        {/* Helper / validation text */}
        {showHelper && (
          <div id={helperId} className="pt-[var(--padding-md)] w-full" role={state === "error" ? "alert" : undefined}>
            <div
              className={cn(
                "flex items-center px-[var(--padding-md)] py-[var(--padding-sm)] rounded-[var(--radius-sm)] w-full",
                state === "error" && "bg-[var(--background-attention-light)]",
                state === "success" && "bg-[var(--background-success-light)]",
                state === "warning" && "bg-[var(--background-warning)]",
                state === "default" && "bg-[var(--background-secondary)]",
                state === "disabled" && "bg-[var(--background-secondary)]"
              )}
            >
              {state === "success" && (
                <span className="pr-[var(--padding-sm)]"><SuccessDot /></span>
              )}
              {state === "error" && (
                <span className="pr-[var(--padding-sm)]"><ErrorDot /></span>
              )}
              {state === "warning" && (
                <span className="pr-[var(--padding-sm)]"><WarningTriangle /></span>
              )}
              <p
                className={cn(
                  "flex-1 font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] leading-[var(--line-height-tiny-text)]",
                  state === "error" && "text-[color:var(--content-attention)]",
                  state === "success" && "text-[color:var(--content-success)]",
                  state === "warning" && "text-[color:var(--content-warning-text)]",
                  (state === "default" || state === "disabled") && "text-[color:var(--content-secondary)]"
                )}
              >
                {validationText || helperText}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput };
export type { TextInputProps };
