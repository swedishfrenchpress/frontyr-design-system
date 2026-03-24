import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Component: Button
 * Figma source: node 147:2305
 * Font: Lexend (--family-labels-links)
 * All values reference design tokens from tokens.css.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "relative overflow-clip",
    "rounded-[var(--radius-sm)]",
    "font-[family-name:var(--family-labels-links),sans-serif]",
    "leading-none",
    "uppercase",
    "cursor-pointer select-none whitespace-nowrap",
    "transition-[color,background-color,box-shadow,opacity] duration-300",
    "disabled:cursor-not-allowed",
    "focus-visible:outline-none",
    "group",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--content-primary)] text-[color:var(--content-on-primary)]",
          "hover:bg-[color-mix(in_srgb,var(--content-primary)_92%,var(--content-on-primary))]",
          "focus-visible:shadow-[var(--components-focus)]",
          "disabled:bg-[var(--content-disabled)] disabled:shadow-none",
        ],
        secondary: [
          "bg-[var(--background-primary)] text-[color:var(--content-primary)]",
          "border border-[var(--border-subtle)]",
          "hover:bg-[var(--input-hover-dark)]",
          "focus-visible:shadow-[var(--components-focus)] focus-visible:border-transparent",
          "disabled:text-[color:var(--content-disabled)] disabled:border-[var(--border-disabled)] disabled:shadow-none",
        ],
        destructive: [
          "bg-[var(--background-attention)] text-[color:var(--content-on-primary)]",
          "hover:bg-[color-mix(in_srgb,var(--background-attention)_92%,var(--content-on-primary))]",
          "focus-visible:shadow-[var(--components-destructive-focus)]",
          "disabled:bg-[var(--content-disabled)] disabled:shadow-none",
        ],
      },
      size: {
        lg: [
          "h-[var(--icons-lg)]",
          "px-[var(--padding-lg)] py-[var(--padding-md)]",
          "gap-[var(--padding-sm)]",
          "text-[length:var(--size-button)]",
          "tracking-[var(--letter-spacing-spacious)]",
          "font-[var(--weight-regular)]",
        ],
        sm: [
          "h-[var(--icons-med)]",
          "p-[var(--padding-md)]",
          "gap-[var(--padding-sm)]",
          "text-[length:var(--size-super-tiny)]",
          "tracking-[var(--letter-spacing-normal)]",
          "font-[var(--weight-semibold)]",
        ],
      },
      buttonType: {
        text: "",
        "text-icon": "",
        "icon-only": "",
        "text-shortcut": "",
        badge: "",
      },
    },
    compoundVariants: [
      { buttonType: "text-icon", size: "lg", className: "gap-[var(--padding-md)]" },
      { buttonType: "text-icon", size: "sm", className: "gap-[var(--padding-sm)]" },
      { buttonType: "text-shortcut", className: "gap-[var(--padding-md)]" },
      { buttonType: "icon-only", size: "lg", className: "size-[var(--icons-lg)] !p-0" },
      { buttonType: "icon-only", size: "sm", className: "size-[var(--icons-med)] !p-0" },
      { buttonType: "badge", size: "lg", className: "size-[var(--icons-lg)] !p-0" },
      { buttonType: "badge", size: "sm", className: "size-[var(--icons-med)] !p-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "lg",
      buttonType: "text",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "type">,
    Omit<ButtonVariantProps, "buttonType"> {
  buttonType?: ButtonVariantProps["buttonType"];
  loading?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
  badgeLabel?: string;
  htmlType?: React.ComponentProps<"button">["type"];
}

/** 3x3 dot grid loader matching Figma loading state */
const DotLoader = ({ light }: { light?: boolean }) => {
  const opacities = [0.1, 0.1, 0.4, 0.1, 1, 0.4, 0.4, 1, 1];
  return (
    <span className="inline-grid grid-cols-3 gap-[2px] p-[var(--padding-sm)] shrink-0">
      {opacities.map((op, i) => (
        <span
          key={i}
          className={cn(
            "size-1 rounded-[0.5px]",
            light
              ? "bg-[var(--content-primary)]"
              : "bg-[var(--content-on-primary)]"
          )}
          style={{ opacity: op }}
        />
      ))}
    </span>
  );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      buttonType = "text",
      loading = false,
      disabled,
      icon,
      shortcut,
      badgeLabel,
      htmlType = "button",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={htmlType}
        className={cn(
          buttonVariants({ variant, size, buttonType }),
          loading && "pointer-events-none w-16",
          className
        )}
        disabled={disabled}
        aria-disabled={disabled || loading || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <DotLoader light={variant === "secondary"} />
        ) : (
          <>
            {(buttonType === "text-icon" || buttonType === "icon-only") &&
              icon && (
                <span className="shrink-0 [&>svg]:size-[var(--icons-xs)]">
                  {icon}
                </span>
              )}
            {buttonType !== "icon-only" && buttonType !== "badge" && (
              <span className="leading-[var(--line-height-buttons)]">
                {children}
              </span>
            )}
            {buttonType === "text-shortcut" && shortcut && (
              <kbd className="flex items-center rounded-[3px] border border-[var(--border-subtle)] bg-[var(--background-primary)] px-1 py-0.5 text-[length:var(--size-super-tiny)] text-[color:var(--content-secondary)] font-[var(--weight-regular)] normal-case tracking-normal">
                {shortcut}
              </kbd>
            )}
            {buttonType === "badge" && (
              <span className="inline-flex items-center justify-center shrink-0 size-[var(--size-button)] text-[length:var(--size-button)] text-[color:var(--content-secondary)] font-[var(--weight-regular)] tracking-[var(--letter-spacing-spacious)] leading-[var(--line-height-buttons)] group-disabled:text-[color:var(--content-disabled)]">
                {badgeLabel ?? "1"}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
