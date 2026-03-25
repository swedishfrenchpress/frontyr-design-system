import * as React from "react";
import { Checkbox as CheckboxIcon, CheckboxCheckedFilled, CheckboxIndeterminateFilled } from "@carbon/icons-react";
import { cn } from "@/lib/utils";

/**
 * Component: Checkbox
 * Figma source: node 124:2639 (standalone), 815:75 (with label)
 * Box: 20x20 with 2px padding = 24x24 total
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
      <span className="relative inline-flex items-start p-[2px]">
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
        {/* Visual checkbox icon */}
        <span
          className={cn(
            "inline-flex transition-[color,box-shadow] duration-300 rounded-[var(--radius-sm)]",
            "text-[color:var(--content-primary)]",
            "peer-disabled:text-[color:var(--content-disabled)]",
            "peer-focus-visible:shadow-[var(--components-focus)]"
          )}
        >
          {indeterminate ? (
            <CheckboxIndeterminateFilled size={20} />
          ) : isControlled ? (
            isChecked ? <CheckboxCheckedFilled size={20} /> : <CheckboxIcon size={20} />
          ) : (
            <>
              <span className="peer-checked:group-[]:hidden">
                <CheckboxIcon size={20} />
              </span>
              <span className="hidden peer-checked:group-[]:inline-flex">
                <CheckboxCheckedFilled size={20} />
              </span>
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
