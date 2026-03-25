"use client";

import { SidebarNav, type NavItem } from "@/components/ui/sidebar-nav";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Home, UserMultiple, Settings as SettingsIcon } from "@carbon/icons-react";
import { PricingQuickProposal, Finance } from "@carbon/icons-react";

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <Home size={16} />, href: "/dashboard" },
  { label: "Users", icon: <UserMultiple size={16} />, href: "/users" },
  { label: "Transactions", icon: <PricingQuickProposal size={16} />, href: "/transactions" },
  { label: "Customers", icon: <Finance size={16} />, href: "/customers" },
  { label: "Settings", icon: <SettingsIcon size={16} />, href: "/settings", active: true },
];

const Logo = () => <img src="/images/acme-bank-logo.png" alt="ACME BANK" className="h-5" />;

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-[var(--background-secondary)]">
      <SidebarNav variant="classic" items={navItems} logo={<Logo />} showFooter={false} onToggle={() => {}} className="bg-gradient-to-r from-[#f2f2f4] to-[#f9f8f6] border-r border-[var(--border-subtle)] shrink-0" />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 flex flex-col overflow-auto p-[var(--padding-3xl)] bg-[var(--background-primary)] m-[var(--padding-xl)] rounded-[var(--radius-lg)]">
          <Breadcrumbs items={[{ label: "", icon: <SettingsIcon size={16} /> }, { label: "Settings" }]} className="mb-[var(--padding-2xl)]" />
          <div className="flex-1 border border-dashed border-[var(--border-subtle)] rounded-[var(--radius-lg)]">
            <span className="inline-block m-2 font-['Geist_Mono',monospace] font-bold text-[10px] leading-[12px] tracking-[0.3px] uppercase text-[color:var(--content-secondary)]">tbd...</span>
          </div>
        </main>
      </div>
    </div>
  );
}
