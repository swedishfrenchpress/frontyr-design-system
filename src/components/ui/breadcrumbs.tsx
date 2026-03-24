import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Component: Breadcrumbs
 * Figma source: node 123:380
 * Font: Lexend (--family-labels-links), Medium 500, 12px, uppercase
 * Separator: "/" in --content-disabled, 14px
 */

interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Link target — omit for the current (last) page */
  href?: string;
  /** Optional 16x16 leading icon */
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Collapse middle items when count exceeds this (default: no collapse) */
  maxItems?: number;
  className?: string;
}

const EllipsisIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-4"
  >
    <circle cx="3" cy="8" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="13" cy="8" r="1" fill="currentColor" />
  </svg>
);

const Separator = () => (
  <li
    role="presentation"
    aria-hidden="true"
    className="flex items-center justify-center min-h-5 min-w-5 font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-disabled)] tracking-[var(--letter-spacing-tight)] leading-[var(--line-height-tiny-text)] uppercase text-center"
  >
    /
  </li>
);

const BreadcrumbLink = ({
  item,
  isCurrent,
}: {
  item: BreadcrumbItem;
  isCurrent: boolean;
}) => {
  const textClasses = cn(
    "font-[family-name:var(--family-labels-links),sans-serif]",
    "text-[length:var(--size-button)] leading-[var(--line-height-small-text)] uppercase whitespace-nowrap",
    isCurrent
      ? "font-[var(--weight-medium)] text-[color:var(--content-primary)]"
      : "font-[var(--weight-medium)] text-[color:var(--content-secondary)] hover:underline hover:font-[var(--weight-regular)] hover:tracking-[var(--letter-spacing-spacious)]"
  );

  const content = (
    <>
      {item.icon && (
        <span className="shrink-0 [&>svg]:size-4">{item.icon}</span>
      )}
      <span>{item.label}</span>
    </>
  );

  if (isCurrent) {
    return (
      <li aria-current="page">
        <span className={cn("inline-flex items-center gap-[var(--padding-md)]", textClasses)}>
          {content}
        </span>
      </li>
    );
  }

  return (
    <li>
      <a
        href={item.href ?? "#"}
        className={cn("inline-flex items-center gap-[var(--padding-md)]", textClasses)}
      >
        {content}
      </a>
    </li>
  );
};

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, maxItems, className }, ref) => {
    if (items.length === 0) return null;

    let visibleItems = items;
    let showOverflow = false;

    if (maxItems && items.length > maxItems && maxItems >= 2) {
      const tail = maxItems - 1;
      visibleItems = [items[0], ...items.slice(-tail)];
      showOverflow = true;
    }

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center gap-[var(--padding-xs)]">
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;
            const isFirst = index === 0;

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                {/* Show overflow indicator after the first item */}
                {showOverflow && index === 1 && (
                  <>
                    <Separator />
                    <li>
                      <span className="inline-flex items-center text-[color:var(--content-secondary)]">
                        <EllipsisIcon />
                      </span>
                    </li>
                  </>
                )}
                {/* Separator before all items except the first */}
                {!isFirst && <Separator />}
                <BreadcrumbLink item={item} isCurrent={isLast} />
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
export type { BreadcrumbsProps, BreadcrumbItem };
