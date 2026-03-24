import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Component: Checkbox
 * Figma source: node 124:2639 (standalone), 815:75 (with label)
 * Box: 20x20 with 2px padding = 24x24 total
 * Font: Lexend (--family-body)
 */

interface CheckboxProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  /** Indeterminate (mixed) state — overrides checked visually */
  indeterminate?: boolean;
  /** Text label */
  label?: string;
  /** Description text below the label */
  description?: string;
}

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-3"
  >
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-3"
  >
    <path
      d="M2.5 6H9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      indeterminate = false,
      disabled,
      checked,
      defaultChecked,
      label,
      description,
      id,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    const inputId = id ?? React.useId();

    // Merge forwarded ref with inner ref
    React.useImperativeHandle(ref, () => innerRef.current!);

    // Sync indeterminate property (not an HTML attribute)
    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : undefined;
    const isFilled = indeterminate || isChecked;

    const box = (
      <span className="relative flex items-start p-[2px]">
        <input
          ref={innerRef}
          type="checkbox"
          id={inputId}
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        {/* Visual box */}
        <span
          className={cn(
            "inline-flex items-center justify-center size-5 rounded-[var(--radius-sm)] transition-colors",
            "border",
            isFilled
              ? [
                  "bg-[var(--content-primary)] border-[var(--content-primary)] text-[color:var(--content-on-primary)]",
                  "peer-disabled:bg-[var(--content-disabled)] peer-disabled:border-[var(--content-disabled)]",
                ]
              : [
                  "bg-transparent border-[var(--content-primary)]",
                  "peer-disabled:border-[var(--content-disabled)]",
                ],
            "peer-focus-visible:shadow-[var(--components-focus)]"
          )}
        >
          {indeterminate ? (
            <MinusIcon />
          ) : (
            /* Show check when controlled=checked OR uncontrolled via CSS */
            <>
              {isControlled ? (
                isChecked && <CheckIcon />
              ) : (
                <span className="hidden peer-checked:group-[]:inline-flex">
                  <CheckIcon />
                </span>
              )}
            </>
          )}
        </span>
      </span>
    );

    if (!label) {
      return (
        <span className={cn("inline-flex", className)}>
          {box}
        </span>
      );
    }

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex gap-[var(--padding-lg)] items-start cursor-pointer",
          disabled && "cursor-not-allowed",
          className
        )}
      >
        {box}
        <span className="flex flex-col gap-1 text-[length:var(--size-small)] leading-[17px]">
          <span
            className={cn(
              'font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)]',
              disabled
                ? "text-[color:var(--content-disabled)]"
                : "text-[color:var(--content-primary)]"
            )}
          >
            {label}
          </span>
          {description && (
            <span
              className={cn(
                'font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)]',
                disabled
                  ? "text-[color:var(--content-disabled)]"
                  : "text-[color:var(--content-secondary)]"
              )}
            >
              {description}
            </span>
          )}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
