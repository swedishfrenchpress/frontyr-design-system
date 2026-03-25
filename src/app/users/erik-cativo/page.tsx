"use client";

import { useState } from "react";
import { SidebarNav, type NavItem } from "@/components/ui/sidebar-nav";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { Switch } from "@/components/ui/switch";
import {
  Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCellBadge, TableCellAction, TablePagination,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Home, UserMultiple, Settings } from "@carbon/icons-react";
import { PricingQuickProposal, Finance } from "@carbon/icons-react";

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <Home size={16} />, href: "/dashboard" },
  { label: "Users", icon: <UserMultiple size={16} />, href: "/users", active: true },
  { label: "Transactions", icon: <PricingQuickProposal size={16} />, href: "/transactions" },
  { label: "Customers", icon: <Finance size={16} />, href: "/customers" },
  { label: "Settings", icon: <Settings size={16} />, href: "/settings" },
];

const Logo = () => <img src="/images/acme-bank-logo.png" alt="ACME BANK" className="h-5" />;

/* Labeled field (label + value stacked) */
function LabeledField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-super-tiny)] leading-[var(--line-height-small-text)] uppercase tracking-[0.04em] text-[color:var(--content-secondary)] mb-1">
        {label}
      </span>
      <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] leading-[var(--line-height-small-text)] text-[color:var(--content-primary)]">
        {value}
      </span>
    </div>
  );
}

/* Permission/method row */
function PermRow({
  label,
  description,
  checked,
  onToggle,
  limitValue,
  onLimitChange,
  isFirst,
}: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
  limitValue?: string;
  onLimitChange?: (v: string) => void;
  isFirst?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center px-[var(--padding-2xl)] py-[var(--padding-lg)] gap-[var(--padding-xl)]",
        "transition-colors duration-200 hover:bg-[rgba(0,0,0,0.015)]",
        !isFirst && "border-t border-[var(--border-subtle)]"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] leading-[var(--line-height-small-text)] text-[color:var(--content-primary)]">
          {label}
        </div>
        <div className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] leading-[var(--line-height-tiny-text)] text-[color:var(--content-secondary)] mt-[1px]">
          {description}
        </div>
      </div>
      {limitValue !== undefined && (
        <input
          type="text"
          value={limitValue}
          onChange={(e) => onLimitChange?.(e.target.value)}
          className={cn(
            "w-[140px] text-right font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] leading-[var(--line-height-small-text)]",
            "px-[var(--padding-lg)] py-[var(--padding-sm)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)]",
            "bg-[var(--background-primary)] text-[color:var(--content-primary)]",
            "outline-none transition-[border-color,opacity] duration-300",
            "focus:border-[var(--border-strong)]",
            !checked && "opacity-25 pointer-events-none"
          )}
        />
      )}
      <Switch
        checked={checked}
        onChange={onToggle}
      />
    </div>
  );
}

export default function UserDetailPage() {
  const [perms, setPerms] = useState({
    view: true,
    open: true,
    monitor: true,
    staff: false,
  });

  const [methods, setMethods] = useState({
    ach: { on: true, limit: "$50,000.00" },
    wire: { on: true, limit: "$100,000.00" },
    usdc: { on: true, limit: "$250,000.00" },
  });

  const togglePerm = (key: keyof typeof perms) =>
    setPerms((p) => ({ ...p, [key]: !p[key] }));

  const toggleMethod = (key: keyof typeof methods) =>
    setMethods((m) => ({ ...m, [key]: { ...m[key], on: !m[key].on } }));

  const setLimit = (key: keyof typeof methods, limit: string) =>
    setMethods((m) => ({ ...m, [key]: { ...m[key], limit } }));

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#f2f2f4] to-[#f9f8f6]">
      <SidebarNav variant="classic" items={navItems} logo={<Logo />} showFooter={false} onToggle={() => {}} className="shrink-0" />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 flex flex-col overflow-auto p-[var(--padding-3xl)] bg-[var(--background-primary)] m-[var(--padding-xl)] rounded-[var(--radius-lg)]">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: "", icon: <UserMultiple size={16} /> },
            { label: "Users", href: "/users" },
            { label: "Erik Cativo" },
          ]} className="mb-[var(--padding-2xl)]" />

          {/* Profile card */}
          <div className="border border-[var(--border-subtle)] rounded-[var(--radius-sm)] p-[var(--padding-2xl)] mb-[var(--padding-xl)]">
            {/* Top: avatar + name + badge + change role */}
            <div className="flex items-center justify-between mb-[var(--padding-xl)]">
              <div className="flex items-center gap-[var(--padding-lg)]">
                <div className="size-11 rounded-full bg-[var(--background-tertiary)] flex items-center justify-center shrink-0">
                  <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-semibold)] text-[length:var(--size-small)] text-[color:var(--content-secondary)]">EC</span>
                </div>
                <div className="flex items-center gap-[var(--padding-md)]">
                  <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-semibold)] text-[length:var(--size-regular)] text-[color:var(--content-primary)]">
                    Erik Cativo
                  </span>
                  <Pill label="Active" color="green" size="md" />
                </div>
              </div>
              <Button variant="secondary" size="lg">Change role</Button>
            </div>

            {/* Meta row */}
            <div className="border-t border-[var(--border-subtle)] pt-[var(--padding-xl)] grid grid-cols-5">
              <LabeledField label="Role" value="Account Manager" />
              <LabeledField label="Email" value="erik@hoseki.app" />
              <LabeledField label="Phone" value="+15552348765" />
              <LabeledField label="Joined date" value="03/18/2026" />
              <LabeledField label="Last active" value="03/23/2026 09:30" />
            </div>
          </div>

          {/* Access controls card */}
          <div className="border border-[var(--border-subtle)] rounded-[var(--radius-sm)] overflow-hidden mb-[var(--padding-xl)]">
            {/* Header */}
            <div className="flex items-center justify-between px-[var(--padding-2xl)] py-[var(--padding-xl)] border-b border-[var(--border-subtle)]">
              <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-semibold)] text-[length:var(--size-small)] text-[color:var(--content-primary)]">
                Access controls
              </span>
              <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] text-[color:var(--content-secondary)]">
                Account Manager
              </span>
            </div>

            {/* Permissions section */}
            <div className="px-[var(--padding-2xl)] pt-[var(--padding-md)] pb-[var(--padding-xs)]">
              <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-super-tiny)] leading-[var(--line-height-small-text)] uppercase tracking-[0.05em] text-[color:var(--content-secondary)]">
                Permissions
              </span>
            </div>
            <PermRow label="View accounts" description="Read-only access to all accounts" checked={perms.view} onToggle={() => togglePerm("view")} isFirst />
            <PermRow label="Account opening" description="Create and onboard new accounts" checked={perms.open} onToggle={() => togglePerm("open")} />
            <PermRow label="Transaction monitoring" description="View and flag transactions" checked={perms.monitor} onToggle={() => togglePerm("monitor")} />
            <PermRow label="Staff management" description="Add, remove, and manage team members" checked={perms.staff} onToggle={() => togglePerm("staff")} />

            {/* Payment methods section */}
            <div className="border-t border-[var(--border-subtle)] px-[var(--padding-2xl)] pt-[var(--padding-md)] pb-[var(--padding-xs)]">
              <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-super-tiny)] leading-[var(--line-height-small-text)] uppercase tracking-[0.05em] text-[color:var(--content-secondary)]">
                Payment methods & limits
              </span>
            </div>
            <PermRow label="ACH" description="Domestic bank transfers" checked={methods.ach.on} onToggle={() => toggleMethod("ach")} limitValue={methods.ach.limit} onLimitChange={(v) => setLimit("ach", v)} isFirst />
            <PermRow label="Wire" description="Domestic and international wires" checked={methods.wire.on} onToggle={() => toggleMethod("wire")} limitValue={methods.wire.limit} onLimitChange={(v) => setLimit("wire", v)} />
            <PermRow label="USDC" description="Stablecoin payments" checked={methods.usdc.on} onToggle={() => toggleMethod("usdc")} limitValue={methods.usdc.limit} onLimitChange={(v) => setLimit("usdc", v)} />
          </div>

          {/* Recent Activity */}
            <Table title="Recent activity" className="border border-[var(--border-subtle)] rounded-[var(--radius-sm)] overflow-clip">
              <TableHeader>
                <TableHead width="16.67%">Name</TableHead>
                <TableHead width="16.67%">Email</TableHead>
                <TableHead width="16.67%">Phone</TableHead>
                <TableHead width="16.67%">Status</TableHead>
                <TableHead width="16.67%">Joined Date</TableHead>
                <TableHead width="16.67%" align="right">Actions</TableHead>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell width="16.67%">Erik Cativo</TableCell>
                  <TableCell width="16.67%">erik@hoseki.app</TableCell>
                  <TableCell width="16.67%">+15552348765</TableCell>
                  <TableCellBadge width="16.67%" label="Verified" color="green" />
                  <TableCell width="16.67%">03/18/2026</TableCell>
                  <TableCellAction width="16.67%" actions={[{ label: "View" }]} />
                </TableRow>
                <TableRow>
                  <TableCell width="16.67%">Erik Cativo</TableCell>
                  <TableCell width="16.67%">erik@hoseki.app</TableCell>
                  <TableCell width="16.67%">+15552348765</TableCell>
                  <TableCellBadge width="16.67%" label="Unverified" color="yellow" />
                  <TableCell width="16.67%">03/18/2026</TableCell>
                  <TableCellAction width="16.67%" actions={[{ label: "View" }]} />
                </TableRow>
              </TableBody>
              <TablePagination total={2} page={1} pageSize={10} />
            </Table>
        </main>
      </div>
    </div>
  );
}
