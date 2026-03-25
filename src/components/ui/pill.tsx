import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Component: Pill
 * A rounded-full status/label pill with color variants and three sizes.
 */

const pillVariants = cva(
  [
    "inline-flex items-center rounded-full whitespace-nowrap",
    "font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)]",
  ],
  {
    variants: {
      color: {
        green: "bg-[var(--bg-badge-green)] text-[color:var(--content-success)]",
        red: "bg-[var(--bg-badge-red)] text-[color:var(--content-attention)]",
        yellow: "bg-[var(--bg-badge-yellow)] text-[color:var(--content-warning-text)]",
        blue: "bg-[var(--bg-badge-blue)] text-[color:var(--content-accent)]",
        gray: "bg-[var(--bg-badge-gray)] text-[color:var(--content-secondary)]",
        default: "bg-[var(--bg-badge-default)] text-[color:var(--content-primary)]",
      },
      size: {
        sm: "px-[var(--padding-md)] py-[1px] text-[length:var(--size-super-tiny)]",
        md: "px-[var(--padding-lg)] py-[var(--padding-xs)] text-[length:var(--size-button)]",
        lg: "px-[var(--padding-xl)] py-[var(--padding-sm)] text-[length:var(--size-small)]",
      },
    },
    defaultVariants: {
      color: "green",
      size: "md",
    },
  }
);

interface PillProps
  extends Omit<React.ComponentProps<"span">, "color">,
    VariantProps<typeof pillVariants> {
  /** Pill label text */
  label: string;
}

const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ className, color, size, label, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(pillVariants({ color, size }), className)}
      {...props}
    >
      {label}
    </span>
  )
);

Pill.displayName = "Pill";

export { Pill, pillVariants };
export type { PillProps };
