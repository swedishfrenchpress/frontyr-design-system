"use client";

import { SidebarNav, type NavItem } from "@/components/ui/sidebar-nav";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCellBadge, TableCellAction, TablePagination,
} from "@/components/ui/table";
import { Home, UserMultiple, Settings, OverflowMenuVertical } from "@carbon/icons-react";
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
      <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-super-tiny)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-secondary)]">
        {label}
      </span>
      <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] leading-[var(--line-height-small-text)] text-[color:var(--content-primary)]">
        {value}
      </span>
    </div>
  );
}

export default function UserDetailPage() {
  return (
    <div className="flex h-screen bg-gradient-to-r from-[#f2f2f4] to-[#f9f8f6]">
      <SidebarNav variant="classic" items={navItems} logo={<Logo />} showFooter={false} onToggle={() => {}} className="shrink-0" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Content */}
        <main className="flex-1 flex flex-col overflow-auto p-[var(--padding-3xl)] bg-[var(--background-primary)] m-[var(--padding-xl)] rounded-[var(--radius-lg)]">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { label: "", icon: <UserMultiple size={16} /> },
            { label: "Users", href: "/users" },
            { label: "Erik Cativo" },
          ]} className="mb-[var(--padding-2xl)]" />

          {/* Change Role button */}
          <div className="flex justify-end mb-[var(--padding-2xl)]">
            <Button variant="primary" size="lg">Change Role</Button>
          </div>

          {/* User info card */}
          <div className="border border-[var(--border-subtle)] rounded-[var(--radius-sm)] p-[var(--padding-xl)] mb-[var(--padding-2xl)]">
            <div className="flex flex-col gap-3">
              {/* Avatar + name + badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-[var(--padding-md)]">
                  <div className="size-8 rounded-full bg-[var(--background-tertiary)] flex items-center justify-center">
                    <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] tracking-[var(--letter-spacing-spacious)] uppercase text-[color:var(--content-primary)]">EC</span>
                  </div>
                  <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] tracking-[var(--letter-spacing-spacious)] uppercase text-[color:var(--content-primary)]">Erik Cativo</span>
                </div>
                <span className="inline-flex items-center h-4 px-[var(--padding-md)] py-[var(--padding-xs)] rounded-[var(--radius-sm)] border border-[var(--transparent-black-8)] bg-[var(--bg-badge-green)] font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] leading-[var(--line-height-small-text)] text-[color:var(--content-success)]">
                  Active
                </span>
              </div>

              {/* Detail fields */}
              <div className="flex items-center justify-between">
                <LabeledField label="Role" value="Account Manager" />
                <LabeledField label="Email" value="erik@hoseki.app" />
                <LabeledField label="Phone" value="+15552348765" />
                <LabeledField label="Joined Date" value="03/18/2026" />
                <LabeledField label="Last Active" value="03/23/2026 09:30" />
              </div>
            </div>
          </div>

          {/* Access Controls + Transaction Limits */}
          <div className="flex flex-col gap-3 mb-[var(--padding-2xl)]">
            {/* Section headings */}
            <div className="flex gap-6">
              <p className="w-[417px] font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-small)] leading-[var(--line-height-small-text)] text-[color:var(--content-primary)]">
                Access Controls
              </p>
              <p className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-small)] leading-[var(--line-height-small-text)] text-[color:var(--content-primary)]">
                Transaction Limits
              </p>
            </div>

            {/* Two columns */}
            <div className="flex gap-6">
              {/* Left: Access Controls */}
              <div className="border border-[var(--border-subtle)] rounded-[var(--radius-sm)] p-[var(--padding-xl)] shrink-0">
                <div className="flex flex-col gap-[var(--padding-2xl)]">
                  {/* Permissions */}
                  <div className="flex flex-col gap-[var(--padding-md)]">
                    <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-super-tiny)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-secondary)]">
                      Permissions
                    </span>
                    <div className="flex flex-col gap-[var(--padding-xl)]">
                      <div className="flex gap-[var(--padding-3xl)]">
                        <Checkbox checked label="Account Opening" className="w-[197px]" />
                        <Checkbox checked label="View Accounts" />
                      </div>
                      <div className="flex gap-[var(--padding-3xl)]">
                        <Checkbox checked label="Transaction Monitoring" />
                        <Checkbox label="Staff Management" />
                      </div>
                    </div>
                  </div>

                  {/* Payment methods */}
                  <div className="flex flex-col gap-[var(--padding-md)]">
                    <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-super-tiny)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-secondary)]">
                      Approved payment methods
                    </span>
                    <div className="flex gap-[var(--padding-3xl)]">
                      <Checkbox checked label="ACH" />
                      <Checkbox checked label="USDC" />
                      <Checkbox checked label="Wire" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Transaction Limits */}
              <div className="flex-1 border border-[var(--border-subtle)] rounded-[var(--radius-sm)] p-[var(--padding-xl)] flex flex-col justify-between">
                <div className="flex gap-3">
                  <TextInput label="ACH Limit" defaultValue="$50,000.00" size="md" />
                  <TextInput label="Wire Limit" defaultValue="$100,000.00" size="md" />
                  <TextInput label="USDC Limit" defaultValue="$250,000.00" size="md" />
                </div>
                <div className="flex items-center justify-end gap-[var(--padding-md)]">
                  <Button variant="secondary" size="lg" disabled>Cancel</Button>
                  <Button variant="primary" size="lg" disabled>Save Changes</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-small)] leading-[var(--line-height-small-text)] text-[color:var(--content-primary)]">
              Recent Activity
            </p>
            <Table className="border border-[var(--border-subtle)] rounded-[var(--radius-sm)] overflow-clip">
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
          </div>
        </main>
      </div>
    </div>
  );
}
