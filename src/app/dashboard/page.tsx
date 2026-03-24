"use client";

import { SidebarNav, type NavItem } from "@/components/ui/sidebar-nav";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Search, ChevronDown, Home, UserMultiple, Settings } from "@carbon/icons-react";
import { PricingQuickProposal, Finance } from "@carbon/icons-react";

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <Home size={16} />, href: "/dashboard", active: true },
  { label: "Users", icon: <UserMultiple size={16} />, href: "/users" },
  { label: "Transactions", icon: <PricingQuickProposal size={16} />, href: "/transactions" },
  { label: "Customers", icon: <Finance size={16} />, href: "/customers" },
  { label: "Settings", icon: <Settings size={16} />, href: "/settings" },
];

const Logo = () => (
  <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-semibold)] text-[length:var(--size-button)] tracking-[var(--letter-spacing-spacious)] uppercase text-[color:var(--content-primary)] whitespace-nowrap">
    ACMEBANK
  </span>
);

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[var(--background-secondary)]">
      {/* Sidebar */}
      <SidebarNav
        variant="classic"
        items={navItems}
        logo={<Logo />}
        showFooter={false}
        onToggle={() => {}}
        className="bg-[var(--background-secondary)] border-r border-[var(--border-subtle)] shrink-0"
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-[var(--padding-2xl)] shrink-0">
          <div />
          <div className="flex items-center gap-[var(--padding-md)] w-[240px] h-8 px-[var(--padding-lg)] rounded-[var(--radius-sm)] border-[0.5px] border-[var(--border-subtle)] bg-[var(--input-hover-dark)]">
            <Search size={14} className="text-[color:var(--content-secondary)]" />
            <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-secondary)]">
              Search
            </span>
          </div>
          <div className="flex items-center gap-[var(--padding-md)]">
            <div className="size-6 rounded-full bg-[var(--background-tertiary)]" />
            <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-primary)] tracking-[-0.3px] uppercase">
              Jason Williams
            </span>
            <ChevronDown size={16} />
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 flex flex-col overflow-auto p-[var(--padding-3xl)] bg-[var(--background-primary)] m-[var(--padding-xl)] rounded-[var(--radius-lg)]">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "", icon: <Home size={16} /> },
              { label: "Dashboard" },
            ]}
            className="mb-[var(--padding-2xl)]"
          />

          {/* Empty TBD container */}
          <div className="flex-1 border border-dashed border-[var(--border-subtle)] rounded-[var(--radius-lg)]">
            <span className="inline-block m-2 font-['Geist_Mono',monospace] font-bold text-[10px] leading-[12px] tracking-[0.3px] uppercase text-[color:var(--content-secondary)]">
              tbd...
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
