"use client";

import { SidebarNav, type NavItem } from "@/components/ui/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, Dashboard as DashboardIcon, UserMultiple, Settings, ImageCopy } from "@carbon/icons-react";
import { Meter, PricingQuickProposal, Finance } from "@carbon/icons-react";

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <DashboardIcon size={16} /> },
  { label: "Users", icon: <UserMultiple size={16} /> },
  { label: "Transactions", icon: <PricingQuickProposal size={16} /> },
  { label: "Customers", icon: <Finance size={16} /> },
  { label: "Settings", icon: <Settings size={16} /> },
];

const Logo = () => (
  <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-semibold)] text-[length:var(--size-button)] tracking-[var(--letter-spacing-spacious)] uppercase text-[color:var(--content-primary)] whitespace-nowrap">
    ACMEBANK
  </span>
);

export default function OnboardingPage() {
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
        <main className="flex-1 overflow-auto p-[var(--padding-3xl)] bg-[var(--background-primary)] m-[var(--padding-xl)] rounded-[var(--radius-lg)]">
          <div className="max-w-[640px] mx-auto pt-[var(--padding-4xl)]">
            {/* Heading */}
            <h1 className="font-[family-name:var(--family-headings),serif] font-[var(--weight-regular)] text-[length:32px] leading-[40px] tracking-[-0.3px] text-[color:var(--content-primary)] mb-[var(--padding-xl)]">
              Welcome to 24/7 payments
            </h1>

            {/* Body text */}
            <div className="flex flex-col gap-[var(--padding-3xl)] mb-[var(--padding-3xl)]">
              <div className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-regular)] leading-[24px] text-[color:var(--content-secondary)]">
                <p className="mb-6">
                  This is your admin portal for managing always-on banking for your business customers.
                </p>
                <p>
                  From here you can onboard customers, manage your team, and monitor activity.
                </p>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-[var(--padding-md)] w-full">
                <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-button)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-primary)] whitespace-nowrap relative pb-2">
                  Manager users
                  <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#D4A017] rounded-full" />
                </span>
                <span className="flex-1 border-t border-dashed border-[var(--border-subtle)]" />
                <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-button)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-secondary)] whitespace-nowrap">
                  Invite customers
                </span>
                <span className="flex-1 border-t border-dashed border-[var(--border-subtle)]" />
                <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-button)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-secondary)] whitespace-nowrap">
                  View Transactions
                </span>
              </div>
            </div>

            {/* Placeholder area */}
            <div className="flex items-center justify-center w-full h-[240px] bg-[var(--background-secondary)] border-[0.5px] border-[var(--border-subtle)] rounded-[var(--radius-lg)] mb-[var(--padding-3xl)]">
              <ImageCopy size={32} className="text-[color:var(--content-secondary)] opacity-40" />
            </div>

            {/* Get Started button */}
            <div className="flex justify-end">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
