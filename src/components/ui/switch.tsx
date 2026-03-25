import * as React from "react";
import { Checkmark } from "@carbon/icons-react";
import { cn } from "@/lib/utils";

/**
 * Component: Switch
 * Figma source: node 814:72
 * Track: 36×20px, pill shape. Knob: 16px white circle.
 */

interface SwitchProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  /** Text label */
  label?: string;
  /** Description text below the label */
  description?: string;
  /** Label position relative to switch */
  labelPosition?: "left" | "right";
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      disabled,
      checked,
      defaultChecked,
      label,
      description,
      labelPosition = "left",
      id,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    const inputId = id ?? React.useId();

    React.useImperativeHandle(ref, () => innerRef.current!);

    const isControlled = checked !== undefined;

    const track = (
      <label
        htmlFor={inputId}
        className={cn(
          "relative inline-flex items-center w-[36px] h-[20px] rounded-full cursor-pointer shrink-0",
          "transition-colors duration-300",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          ref={innerRef}
          type="checkbox"
          id={inputId}
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          className="peer sr-only"
          role="switch"
          aria-checked={isControlled ? checked : undefined}
          {...props}
        />

        {/* Track background */}
        <span
          className={cn(
            "absolute inset-0 rounded-full transition-colors duration-300",
            "bg-[var(--background-tertiary)]",
            "peer-checked:bg-[var(--content-primary)]",
            "peer-focus-visible:shadow-[var(--components-focus)]"
          )}
        />

        {/* Knob */}
        <span
          className={cn(
            "absolute top-[2px] left-[2px] size-4 rounded-full bg-white",
            "shadow-[var(--shadows-elevation1)]",
            "transition-transform duration-300",
            "peer-checked:translate-x-4",
            "flex items-center justify-center"
          )}
        >
          {/* Checkmark — visible when checked */}
          <span className="hidden peer-checked:group-[]:flex">
            <Checkmark size={10} className="text-[color:var(--content-primary)]" />
          </span>
        </span>
      </label>
    );

    if (!label) {
      return (
        <span className={cn("inline-flex", className)}>
          {track}
        </span>
      );
    }

    const labelContent = (
      <span className="flex flex-col gap-1 text-[length:var(--size-small)] leading-[17px]">
        <span
          className={cn(
            "font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)]",
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
              "font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)]",
              disabled
                ? "text-[color:var(--content-disabled)]"
                : "text-[color:var(--content-secondary)]"
            )}
          >
            {description}
          </span>
        )}
      </span>
    );

    return (
      <div
        className={cn(
          "inline-flex gap-[var(--padding-lg)] items-start",
          disabled && "cursor-not-allowed",
          className
        )}
      >
        {labelPosition === "right" && track}
        {labelPosition === "right" && labelContent}
        {labelPosition === "left" && track}
        {labelPosition === "left" && labelContent}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
export type { SwitchProps };
