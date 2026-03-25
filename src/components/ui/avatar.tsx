import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Component: Avatar (Initials)
 * Figma source: node 179:17313
 * Circle with background and centered uppercase initials.
 */

const avatarVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full shrink-0",
    "bg-[var(--background-secondary)]",
    "font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)]",
    "uppercase tracking-[var(--letter-spacing-spacious)]",
    "text-[color:var(--content-secondary)]",
  ],
  {
    variants: {
      size: {
        xs: "size-6 text-[length:var(--size-super-tiny)]",
        sm: "size-8 text-[length:var(--size-button)]",
        md: "size-10 text-[length:var(--size-small)]",
        lg: "size-12 text-[length:var(--size-small)]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

interface AvatarProps
  extends Omit<React.ComponentProps<"span">, "children">,
    VariantProps<typeof avatarVariants> {
  /** Two-letter initials */
  initials: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, initials, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      {initials}
    </span>
  )
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
export type { AvatarProps };
