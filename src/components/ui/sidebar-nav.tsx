import * as React from "react";
import { Grid, OverflowMenuVertical } from "@carbon/icons-react";
import { cn } from "@/lib/utils";

/**
 * Component: SidebarNav
 * Figma source: node 230:699
 * Variants: Classic (flat links), Tree (grouped sections), Collapsed (logo only)
 */

/* ---- Types ---- */

export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface NavSection {
  label: string;
  icon?: React.ReactNode;
  items: NavItem[];
}

export interface SidebarNavProps {
  /** "classic" = flat list with icons, "tree" = grouped sections with sub-links */
  variant?: "classic" | "tree";
  /** Collapsed state (tree only) — shows only logo + toggle */
  collapsed?: boolean;
  /** Flat nav items (classic variant) */
  items?: NavItem[];
  /** Grouped nav sections (tree variant) */
  sections?: NavSection[];
  /** Logo element */
  logo?: React.ReactNode;
  /** User display name for footer */
  userName?: string;
  /** Show/hide footer */
  showFooter?: boolean;
  /** Callback when collapse toggle is clicked */
  onToggle?: () => void;
  /** Callback when user overflow menu is clicked */
  onUserMenuClick?: () => void;
  className?: string;
}

/* ---- Sub-components ---- */

const NavLink = ({ item }: { item: NavItem }) => (
  <a
    href={item.href ?? "#"}
    className={cn(
      "flex items-center gap-[var(--padding-md)] p-[var(--padding-md)]",
      "font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)]",
      "text-[length:var(--size-button)] leading-[var(--line-height-buttons)] tracking-[var(--letter-spacing-spacious)] uppercase whitespace-nowrap",
      "rounded-[var(--radius-md)] transition-colors",
      "hover:bg-[var(--input-hover-dark)]",
      item.active
        ? "text-[color:var(--content-primary)]"
        : "text-[color:var(--content-primary)]"
    )}
  >
    {item.icon && (
      <span className="shrink-0 [&>svg]:size-4 text-[color:var(--content-primary)]">
        {item.icon}
      </span>
    )}
    <span>{item.label}</span>
  </a>
);

const NavSubLink = ({ item }: { item: NavItem }) => (
  <a
    href={item.href ?? "#"}
    className={cn(
      "flex items-center p-[var(--padding-md)] rounded-[var(--radius-md)]",
      "font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)]",
      "text-[length:var(--size-button)] leading-[var(--line-height-buttons)] tracking-[var(--letter-spacing-spacious)] uppercase whitespace-nowrap",
      "transition-colors hover:bg-[var(--input-hover-dark)]",
      item.active
        ? "text-[color:var(--content-primary)]"
        : "text-[color:var(--content-secondary)]"
    )}
  >
    {item.label}
  </a>
);

const NavSectionGroup = ({ section }: { section: NavSection }) => (
  <div className="flex flex-col gap-[var(--padding-sm)] items-start w-full">
    {/* Section header */}
    <div className="flex items-center gap-[var(--padding-md)] p-[var(--padding-md)]">
      {section.icon && (
        <span className="shrink-0 [&>svg]:size-4 text-[color:var(--content-primary)]">
          {section.icon}
        </span>
      )}
      <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] leading-[var(--line-height-buttons)] tracking-[var(--letter-spacing-spacious)] uppercase whitespace-nowrap text-[color:var(--content-primary)]">
        {section.label}
      </span>
    </div>
    {/* Sub-links with left border */}
    <div className="pl-[var(--padding-xl)] w-full">
      <div className="border-l border-[var(--border-subtle)] pl-[var(--padding-xl)] flex flex-col gap-[var(--padding-xs)]">
        {section.items.map((item) => (
          <NavSubLink key={item.label} item={item} />
        ))}
      </div>
    </div>
  </div>
);

/* ---- Main component ---- */

const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  (
    {
      variant = "tree",
      collapsed = false,
      items = [],
      sections = [],
      logo,
      userName,
      showFooter = true,
      onToggle,
      onUserMenuClick,
      className,
    },
    ref
  ) => {
    const isCollapsed = variant === "tree" && collapsed;

    return (
      <nav
        ref={ref}
        aria-label="Sidebar navigation"
        className={cn(
          "flex flex-col h-full w-[247px]",
          className
        )}
      >
        {/* Logo + toggle */}
        <div className="flex items-center gap-[var(--padding-xl)] px-[var(--padding-2xl)] py-[var(--padding-xl)]">
          {logo && <div className="shrink-0 size-6">{logo}</div>}
          {onToggle && (
            <button
              onClick={onToggle}
              className="shrink-0 size-4 text-[color:var(--content-primary)] cursor-pointer"
              aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
            >
              {isCollapsed ? <Grid size={16} /> : <Grid size={16} />}
            </button>
          )}
        </div>

        {/* Nav content */}
        {!isCollapsed && (
          <div className="flex-1 flex flex-col overflow-y-auto pl-[var(--padding-xl)] pr-[var(--padding-2xl)] pt-[var(--padding-2xl)]">
            {variant === "classic" ? (
              /* Classic: flat links */
              <div className="flex flex-col gap-[var(--padding-sm)]">
                {items.map((item) => (
                  <NavLink key={item.label} item={item} />
                ))}
              </div>
            ) : (
              /* Tree: grouped sections */
              <div className="flex flex-col gap-[var(--padding-xl)]">
                {sections.map((section) => (
                  <NavSectionGroup key={section.label} section={section} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Spacer when collapsed */}
        {isCollapsed && <div className="flex-1" />}

        {/* Footer */}
        {showFooter && userName && !isCollapsed && (
          <div className="flex items-center justify-between p-[var(--padding-2xl)]">
            <span className="flex-1 font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-small)] leading-[var(--line-height-small-text)] text-[color:var(--content-primary)]">
              {userName}
            </span>
            {onUserMenuClick && (
              <button
                onClick={onUserMenuClick}
                className="shrink-0 text-[color:var(--content-primary)] cursor-pointer"
                aria-label="User menu"
              >
                <OverflowMenuVertical size={16} />
              </button>
            )}
          </div>
        )}
      </nav>
    );
  }
);

SidebarNav.displayName = "SidebarNav";

export { SidebarNav };
