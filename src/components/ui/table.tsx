import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowsVertical, Checkmark, ChevronLeft, ChevronRight } from "@carbon/icons-react";

/**
 * Component: Table (composable sub-component system)
 * Figma source: node 123:395
 * Cell height: 64px, border-bottom --border-subtle, px --padding-xl, py --padding-lg
 */

/* ---- Table root ---- */

const Table = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {children}
    </div>
  )
);
Table.displayName = "Table";

/* ---- TableHeader (wraps head cells in a row) ---- */

const TableHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} role="row" className={cn("flex w-full", className)} {...props}>
      {children}
    </div>
  )
);
TableHeader.displayName = "TableHeader";

/* ---- TableHead (header cell) ---- */

interface TableHeadProps extends React.ComponentProps<"div"> {
  align?: "left" | "center" | "right";
  sortable?: boolean;
  onSort?: () => void;
  width?: string | number;
}

const TableHead = React.forwardRef<HTMLDivElement, TableHeadProps>(
  ({ className, children, align = "left", sortable, onSort, width, ...props }, ref) => (
    <div
      ref={ref}
      role="columnheader"
      className={cn(
        "flex items-center h-[var(--icons-4xl)] min-w-[124px] px-[var(--padding-xl)] py-[var(--padding-lg)]",
        "bg-[var(--background-primary)] border-b border-[var(--border-subtle)]",
        "font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)]",
        "text-[length:var(--size-button)] leading-[var(--line-height-small-text)] uppercase",
        "text-[color:var(--content-secondary)]",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        sortable && "cursor-pointer hover:text-[color:var(--content-primary)]",
        className
      )}
      style={width ? { width: typeof width === "number" ? `${width}px` : width } : undefined}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <span className="truncate">{children}</span>
      {sortable && (
        <span className="ml-[var(--padding-md)] text-[color:var(--content-icon)]">
          <ArrowsVertical size={16} />
        </span>
      )}
    </div>
  )
);
TableHead.displayName = "TableHead";

/* ---- TableBody ---- */

const TableBody = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} role="rowgroup" className={cn("flex flex-col w-full", className)} {...props}>
      {children}
    </div>
  )
);
TableBody.displayName = "TableBody";

/* ---- TableRow ---- */

const TableRow = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="row"
      className={cn("flex w-full hover:bg-[var(--input-hover-dark)] transition-colors", className)}
      {...props}
    >
      {children}
    </div>
  )
);
TableRow.displayName = "TableRow";

/* ---- TableCell ---- */

interface TableCellProps extends React.ComponentProps<"div"> {
  align?: "left" | "center" | "right";
  description?: string;
  icon?: React.ReactNode;
  width?: string | number;
}

const TableCell = React.forwardRef<HTMLDivElement, TableCellProps>(
  ({ className, children, align = "left", description, icon, width, ...props }, ref) => (
    <div
      ref={ref}
      role="cell"
      className={cn(
        "flex items-center gap-[var(--padding-xl)] h-[var(--icons-4xl)] min-w-[124px] px-[var(--padding-xl)] py-[var(--padding-lg)]",
        "bg-[var(--background-primary)] border-b border-[var(--border-subtle)]",
        "font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)]",
        "text-[length:var(--size-small)] leading-[var(--line-height-small-text)]",
        "text-[color:var(--content-primary)]",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        className
      )}
      style={width ? { width: typeof width === "number" ? `${width}px` : width } : undefined}
      {...props}
    >
      <div className={cn("flex-1 min-w-0", align === "right" && "text-right", align === "center" && "text-center")}>
        <div className="truncate">{children}</div>
        {description && (
          <div className="truncate text-[length:var(--size-button)] leading-[var(--line-height-tiny-text)] text-[color:var(--content-secondary)]">
            {description}
          </div>
        )}
      </div>
      {icon && (
        <span className="shrink-0 [&>svg]:size-4 text-[color:var(--content-icon)]">
          {icon}
        </span>
      )}
    </div>
  )
);
TableCell.displayName = "TableCell";

/* ---- TableCellAction ---- */

interface TableCellActionProps extends React.ComponentProps<"div"> {
  actions?: { label: string; onClick?: () => void }[];
  width?: string | number;
}

const TableCellAction = React.forwardRef<HTMLDivElement, TableCellActionProps>(
  ({ className, actions = [], width, ...props }, ref) => (
    <div
      ref={ref}
      role="cell"
      className={cn(
        "flex items-center justify-end gap-[var(--padding-xl)] h-[var(--icons-4xl)] min-w-[124px] px-[var(--padding-xl)] py-[var(--padding-lg)]",
        "bg-[var(--background-primary)] border-b border-[var(--border-subtle)]",
        className
      )}
      style={width ? { width: typeof width === "number" ? `${width}px` : width } : undefined}
      {...props}
    >
      <div className="flex items-center gap-[var(--padding-md)]">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={cn(
              "inline-flex items-center justify-center h-[32px] px-[var(--padding-lg)] rounded-[var(--radius-sm)]",
              "border border-[var(--border-subtle)] bg-[var(--background-primary)]",
              "font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)]",
              "text-[length:var(--size-button)] leading-[var(--line-height-buttons)] tracking-[var(--letter-spacing-spacious)]",
              "uppercase text-[color:var(--content-primary)]",
              "cursor-pointer hover:bg-[var(--input-hover-dark)] transition-colors"
            )}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
);
TableCellAction.displayName = "TableCellAction";

/* ---- TableCellIcon ---- */

interface TableCellIconProps extends React.ComponentProps<"div"> {
  icon?: React.ReactNode;
  width?: string | number;
}

const TableCellIcon = React.forwardRef<HTMLDivElement, TableCellIconProps>(
  ({ className, icon, width, ...props }, ref) => (
    <div
      ref={ref}
      role="cell"
      className={cn(
        "flex items-center justify-center h-[var(--icons-4xl)] min-w-[124px] px-[var(--padding-xl)] py-[var(--padding-lg)]",
        "bg-[var(--background-primary)] border-b border-[var(--border-subtle)]",
        "text-[color:var(--content-primary)]",
        className
      )}
      style={width ? { width: typeof width === "number" ? `${width}px` : width } : undefined}
      {...props}
    >
      {icon ?? <Checkmark size={16} />}
    </div>
  )
);
TableCellIcon.displayName = "TableCellIcon";

/* ---- TableCellBadge ---- */

interface TableCellBadgeProps extends React.ComponentProps<"div"> {
  label: string;
  color?: "green" | "red" | "yellow" | "blue" | "gray" | "default";
  align?: "left" | "center" | "right";
  width?: string | number;
}

const badgeColorMap = {
  green: "bg-[var(--bg-badge-green)] text-[color:var(--content-success)]",
  red: "bg-[var(--bg-badge-red)] text-[color:var(--content-attention)]",
  yellow: "bg-[var(--bg-badge-yellow)] text-[color:var(--content-warning-text)]",
  blue: "bg-[var(--bg-badge-blue)] text-[color:var(--content-accent)]",
  gray: "bg-[var(--bg-badge-gray)] text-[color:var(--content-secondary)]",
  default: "bg-[var(--bg-badge-default)] text-[color:var(--content-primary)]",
};

const TableCellBadge = React.forwardRef<HTMLDivElement, TableCellBadgeProps>(
  ({ className, label, color = "green", align = "left", width, ...props }, ref) => (
    <div
      ref={ref}
      role="cell"
      className={cn(
        "flex items-center h-[var(--icons-4xl)] min-w-[124px] px-[var(--padding-xl)] py-[var(--padding-lg)]",
        "bg-[var(--background-primary)] border-b border-[var(--border-subtle)]",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        className
      )}
      style={width ? { width: typeof width === "number" ? `${width}px` : width } : undefined}
      {...props}
    >
      <span
        className={cn(
          "inline-flex items-center h-6 px-[var(--padding-md)] py-[var(--padding-xs)] rounded-[var(--radius-sm)]",
          "border border-[var(--transparent-black-8)]",
          "font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)]",
          "text-[length:var(--size-small)] leading-[var(--line-height-small-text)] whitespace-nowrap",
          badgeColorMap[color]
        )}
      >
        {label}
      </span>
    </div>
  )
);
TableCellBadge.displayName = "TableCellBadge";

/* ---- TablePagination ---- */

interface TablePaginationProps extends React.ComponentProps<"div"> {
  total: number;
  page: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
}

const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(
  ({ className, total, page, pageSize, onPageChange, ...props }, ref) => {
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between h-[var(--icons-4xl)] px-[var(--padding-xl)] py-[var(--padding-lg)]",
          "font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)]",
          "text-[length:var(--size-button)] leading-[var(--line-height-tiny-text)]",
          "text-[color:var(--content-secondary)]",
          className
        )}
        {...props}
      >
        <span>
          Showing {start}–{end} of {total} items
        </span>
        <div className="flex items-center gap-[var(--padding-md)]">
          <span className="uppercase tracking-[var(--letter-spacing-spacious)]">
            {page}/{totalPages}
          </span>
          <button
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
            className="size-8 inline-flex items-center justify-center rounded-[var(--radius-sm)] text-[color:var(--content-primary)] disabled:text-[color:var(--content-disabled)] cursor-pointer disabled:cursor-not-allowed hover:bg-[var(--input-hover-dark)] transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages}
            className="size-8 inline-flex items-center justify-center rounded-[var(--radius-sm)] text-[color:var(--content-primary)] disabled:text-[color:var(--content-disabled)] cursor-pointer disabled:cursor-not-allowed hover:bg-[var(--input-hover-dark)] transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }
);
TablePagination.displayName = "TablePagination";

export {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellAction,
  TableCellIcon,
  TableCellBadge,
  TablePagination,
};
