import * as React from "react";
import { OverflowMenuHorizontal } from "@carbon/icons-react";
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
      : "font-[var(--weight-medium)] text-[color:var(--content-secondary)] hover:text-[color:var(--content-primary)] transition-[color,opacity] duration-200"
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
      <li aria-current="page" className="flex items-center">
        <span className={cn("inline-flex items-center gap-[var(--padding-md)]", textClasses)}>
          {content}
        </span>
      </li>
    );
  }

  return (
    <li className="flex items-center">
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
                        <OverflowMenuHorizontal size={16} />
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
