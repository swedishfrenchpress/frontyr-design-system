"use client";

import { useState } from "react";
import { SidebarNav, type NavItem } from "@/components/ui/sidebar-nav";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Modal } from "@/components/ui/modal";
import {
  Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableCellBadge, TablePagination,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Home, UserMultiple, Settings, OverflowMenuVertical, User, WarningAlt } from "@carbon/icons-react";
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

  // Change role modal
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const currentRole = "account_manager";

  const roles = [
    {
      id: "admin",
      name: "Admin",
      desc: "Full system access with the ability to manage all users, settings, and configurations.",
      perms: [
        { label: "All permissions", granted: true },
        { label: "Staff management", granted: true },
        { label: "Settings", granted: true },
      ],
      warning: "Admin has full system access including the ability to delete accounts and modify security settings.",
    },
    {
      id: "account_manager",
      name: "Account Manager",
      desc: "Manage client accounts, process transactions, and view account details.",
      perms: [
        { label: "View accounts", granted: true },
        { label: "Account opening", granted: true },
        { label: "Transactions", granted: true },
        { label: "Staff management", granted: false },
      ],
      warning: null,
    },
    {
      id: "operations_manager",
      name: "Operations Manager",
      desc: "Approve transactions and manage operational workflows. No direct account access.",
      perms: [
        { label: "Approvals", granted: true },
        { label: "Transaction monitoring", granted: true },
        { label: "View accounts", granted: false },
        { label: "Account opening", granted: false },
      ],
      warning: "This will revoke account access. Erik will no longer be able to view or manage client accounts.",
    },
    {
      id: "compliance_officer",
      name: "Compliance Officer",
      desc: "Read-only access for audit trails, compliance reports, and transaction monitoring.",
      perms: [
        { label: "Audit logs", granted: true },
        { label: "Transaction monitoring", granted: true },
        { label: "Account opening", granted: false },
        { label: "Approvals", granted: false },
      ],
      warning: "This will significantly reduce access. Erik will only have read-only permissions for auditing purposes.",
    },
  ];

  const selectedRoleData = roles.find((r) => r.id === selectedRole);

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
                <Avatar initials="EC" size="lg" />
                <div className="flex items-center gap-[var(--padding-md)]">
                  <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-semibold)] text-[length:var(--size-regular)] text-[color:var(--content-primary)]">
                    Erik Cativo
                  </span>
                  <Pill label="Active" color="green" size="md" />
                </div>
              </div>
              <Button variant="primary" size="lg" onClick={() => { setSelectedRole(null); setShowModal(true); }}>Change role</Button>
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
                <TableHead width="20%">Date</TableHead>
                <TableHead width="15%">Status</TableHead>
                <TableHead width="25%">Customer</TableHead>
                <TableHead width="20%">Reference</TableHead>
                <TableHead width="10%">Amount</TableHead>
                <TableHead width="10%" align="right">Actions</TableHead>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell width="20%" description="01:04 PM">03/19/2026</TableCell>
                  <TableCellBadge width="15%" label="Completed" color="green" />
                  <TableCell width="25%" description="sarah@grazianos.com">Sarah Mitchell</TableCell>
                  <TableCell width="20%">TXN-20260319-001</TableCell>
                  <TableCell width="10%">$12,500.00</TableCell>
                  <TableCell width="10%" align="right">
                    <div className="flex items-center justify-end gap-[var(--padding-md)] w-full">
                      <button className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-primary)] cursor-pointer hover:text-[color:var(--content-secondary)] transition-[color] duration-300">
                        View
                      </button>
                      <button className="text-[color:var(--content-primary)] cursor-pointer">
                        <OverflowMenuVertical size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="20%" description="09:32 AM">03/19/2026</TableCell>
                  <TableCellBadge width="15%" label="Completed" color="green" />
                  <TableCell width="25%" description="jason@grazianos.com">Jason Williams</TableCell>
                  <TableCell width="20%">TXN-20260319-002</TableCell>
                  <TableCell width="10%">$8,200.00</TableCell>
                  <TableCell width="10%" align="right">
                    <div className="flex items-center justify-end gap-[var(--padding-md)] w-full">
                      <button className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-primary)] cursor-pointer hover:text-[color:var(--content-secondary)] transition-[color] duration-300">
                        View
                      </button>
                      <button className="text-[color:var(--content-primary)] cursor-pointer">
                        <OverflowMenuVertical size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="20%" description="04:15 PM">03/18/2026</TableCell>
                  <TableCellBadge width="15%" label="Pending" color="yellow" />
                  <TableCell width="25%" description="marco@acmebank.com">Marco Rivera</TableCell>
                  <TableCell width="20%">TXN-20260318-007</TableCell>
                  <TableCell width="10%">$45,000.00</TableCell>
                  <TableCell width="10%" align="right">
                    <div className="flex items-center justify-end gap-[var(--padding-md)] w-full">
                      <button className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-primary)] cursor-pointer hover:text-[color:var(--content-secondary)] transition-[color] duration-300">
                        View
                      </button>
                      <button className="text-[color:var(--content-primary)] cursor-pointer">
                        <OverflowMenuVertical size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width="20%" description="11:48 AM">03/18/2026</TableCell>
                  <TableCellBadge width="15%" label="Completed" color="green" />
                  <TableCell width="25%" description="sarah@grazianos.com">Sarah Mitchell</TableCell>
                  <TableCell width="20%">TXN-20260318-003</TableCell>
                  <TableCell width="10%">$3,750.00</TableCell>
                  <TableCell width="10%" align="right">
                    <div className="flex items-center justify-end gap-[var(--padding-md)] w-full">
                      <button className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-primary)] cursor-pointer hover:text-[color:var(--content-secondary)] transition-[color] duration-300">
                        View
                      </button>
                      <button className="text-[color:var(--content-primary)] cursor-pointer">
                        <OverflowMenuVertical size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TablePagination total={12} page={1} pageSize={4} />
            </Table>
        </main>
      </div>

      {/* Change role modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div>
            {/* Header */}
            <div className="px-[var(--padding-2xl)] pt-[var(--padding-2xl)]">
              <h2 className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-semibold)] text-[length:18px] leading-[24px] text-[color:var(--content-primary)] mb-1">
                Change role
              </h2>
              <p className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] leading-[var(--line-height-small-text)] text-[color:var(--content-secondary)]">
                Update the role for Erik Cativo.{" "}
                <a href="#" className="text-[color:var(--content-primary)]">
                  Learn about roles
                </a>
              </p>
            </div>

            {/* Current role indicator */}
            <div className="flex items-center gap-[var(--padding-sm)] px-[var(--padding-2xl)] mt-[var(--padding-lg)]">
              <User size={14} className="text-[color:var(--content-secondary)] shrink-0" />
              <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] text-[color:var(--content-secondary)]">
                Current role: Account Manager
              </span>
            </div>

            {/* Role list */}
            <div className="flex flex-col gap-[var(--padding-md)] px-[var(--padding-2xl)] py-[var(--padding-xl)]">
              {roles.map((role) => {
                const isCurrent = role.id === currentRole;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    disabled={isCurrent}
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "text-left rounded-[var(--radius-sm)] p-[var(--padding-xl)] border transition-[border-color,background-color] duration-200",
                      isCurrent && "opacity-45 pointer-events-none",
                      isSelected
                        ? "border-[var(--border-medium)]"
                        : "border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:bg-[rgba(0,0,0,0.012)]"
                    )}
                  >
                    {/* Role top: name + radio */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-semibold)] text-[length:var(--size-small)] text-[color:var(--content-primary)]">
                        {role.name}
                        {isCurrent && (
                          <span className="font-[var(--weight-regular)] text-[color:var(--content-secondary)] text-[length:var(--size-button)] ml-1">
                            (current)
                          </span>
                        )}
                      </span>
                      {/* Radio indicator */}
                      <span className={cn(
                        "size-[18px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-[border-color] duration-200",
                        isSelected ? "border-[var(--content-primary)]" : "border-[var(--border-medium)]"
                      )}>
                        <span className={cn(
                          "size-2 rounded-full bg-[var(--content-primary)] transition-transform duration-200",
                          isSelected ? "scale-100" : "scale-0"
                        )} />
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] leading-[1.4] text-[color:var(--content-secondary)] mb-[var(--padding-md)]">
                      {role.desc}
                    </p>

                    {/* Permission tags */}
                    <div className="flex flex-wrap gap-[5px]">
                      {role.perms.map((p) => (
                        <Pill
                          key={p.label}
                          label={p.label}
                          color={p.granted ? "green" : "gray"}
                          size="sm"
                          className={!p.granted ? "line-through decoration-[rgba(0,0,0,0.25)]" : ""}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Warning callout */}
            {selectedRoleData?.warning && (
              <div className="flex items-start gap-[var(--padding-md)] mx-[var(--padding-2xl)] px-[var(--padding-lg)] py-[var(--padding-md)] bg-[var(--background-warning)] border border-[rgba(138,109,0,0.2)] rounded-[var(--radius-sm)]">
                <WarningAlt size={14} className="text-[color:var(--content-warning-text)] shrink-0 mt-[1px]" />
                <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] leading-[1.45] text-[color:var(--content-warning-text)]">
                  {selectedRoleData.warning}
                </span>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-[var(--padding-md)] px-[var(--padding-2xl)] py-[var(--padding-xl)]">
              <Button variant="secondary" size="lg" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" size="lg" disabled={!selectedRole}>Update role</Button>
            </div>
          </div>
      </Modal>
    </div>
  );
}
