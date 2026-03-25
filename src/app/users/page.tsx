"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarNav, type NavItem } from "@/components/ui/sidebar-nav";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellBadge,
  TablePagination,
} from "@/components/ui/table";
import { IconAdd } from "@/components/icons";
import { UserMultiple, Checkmark, CheckmarkOutline, Time, Draggable, OverflowMenuVertical, Close, Filter, Home, Settings } from "@carbon/icons-react";
import { PricingQuickProposal, Finance } from "@carbon/icons-react";

/* ---- Nav items ---- */

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <Home size={16} />, href: "/dashboard" },
  { label: "Users", icon: <UserMultiple size={16} />, href: "/users", active: true },
  { label: "Transactions", icon: <PricingQuickProposal size={16} />, href: "/transactions" },
  { label: "Customers", icon: <Finance size={16} />, href: "/customers" },
  { label: "Settings", icon: <Settings size={16} />, href: "/settings" },
];

/* ---- Stat card ---- */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[var(--padding-lg)] p-[var(--padding-xl)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] w-[180px]">
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-button)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-secondary)]">
          {title}
        </span>
        <Draggable size={16} />
      </div>
      <div className="flex items-center justify-between">
        <Button variant="secondary" buttonType="icon-only" icon={icon} aria-label={title} />
        <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-x-large)] leading-[var(--line-height-regular-text)] text-[color:var(--content-primary)]">
          {value}
        </span>
      </div>
    </div>
  );
}

/* ---- Demo data ---- */

const users = [
  { name: "Erik Cativo", email: "erik@hoseki.app", phone: "+15552348765", status: "Verified" as const, date: "03/18/2026" },
  { name: "Erik Cativo", email: "erik@hoseki.app", phone: "+15552348765", status: "Unverified" as const, date: "03/18/2026" },
  { name: "Erik Cativo", email: "erik@hoseki.app", phone: "+15552348765", status: "Verified" as const, date: "03/18/2026" },
  { name: "Erik Cativo", email: "erik@hoseki.app", phone: "+15552348765", status: "Verified" as const, date: "03/18/2026" },
];

/* ---- Logo ---- */

const Logo = () => <img src="/images/acme-bank-logo.png" alt="ACME BANK" className="h-5" />;

/* ---- Page ---- */

export default function DashboardPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    fromDate: "",
    toDate: "",
  });

  const hasFilters = Object.values(filters).some((v) => v.trim() !== "");

  const updateFilter = (key: keyof typeof filters) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  const clearFilters = () =>
    setFilters({ firstName: "", lastName: "", email: "", fromDate: "", toDate: "" });

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#f2f2f4] to-[#f9f8f6]">
      {/* Sidebar */}
      <SidebarNav
        variant="classic"
        items={navItems}
        logo={<Logo />}
        showFooter={false}
        onToggle={() => {}}
        className="shrink-0"
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content area */}
        <main className="flex-1 flex flex-col overflow-auto p-[var(--padding-3xl)] bg-[var(--background-primary)] m-[var(--padding-xl)] rounded-[var(--radius-lg)]">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: "", icon: <UserMultiple size={16} /> }, { label: "Users" }]} className="mb-[var(--padding-2xl)]" />

          {/* New User button */}
          <div className="flex justify-end mb-[var(--padding-2xl)]">
            <Button variant="primary" buttonType="text-icon" icon={<IconAdd />}>
              New User
            </Button>
          </div>

          {/* Stat cards */}
          <div className="flex gap-[var(--padding-2xl)] mb-[var(--padding-2xl)]">
            <StatCard title="Total Users" value={44} icon={<UserMultiple size={16} />} />
            <StatCard title="Verified Users" value={44} icon={<Checkmark size={16} />} />
            <StatCard title="Unverified Users" value={44} icon={<Time size={16} />} />
          </div>

          {/* Filter row 1 */}
          <div className="grid grid-cols-3 gap-[var(--padding-xl)] mb-[var(--padding-xl)]">
            <TextInput label="First Name" placeholder="Filter by email" size="sm" value={filters.firstName} onChange={updateFilter("firstName")} />
            <TextInput label="Last Name" placeholder="Filter by phone" size="sm" value={filters.lastName} onChange={updateFilter("lastName")} />
            <TextInput label="Email" placeholder="Filter by username" size="sm" value={filters.email} onChange={updateFilter("email")} />
          </div>

          {/* Filter row 2 */}
          <div className="grid grid-cols-3 items-end gap-[var(--padding-xl)] mb-[var(--padding-2xl)]">
            <TextInput label="From Date" placeholder="MM-DD-YYYY" size="sm" value={filters.fromDate} onChange={updateFilter("fromDate")} />
            <TextInput label="To Date" placeholder="MM-DD-YYYY" size="sm" value={filters.toDate} onChange={updateFilter("toDate")} />
            <div className="flex items-center justify-end gap-[var(--padding-md)] pb-[var(--padding-md)]">
              <Button variant="secondary" size="sm" buttonType="text-icon" disabled={!hasFilters} onClick={clearFilters} icon={
                <Close size={16} />
              }>
                Clear
              </Button>
              <Button variant="primary" size="sm" buttonType="text-icon" disabled={!hasFilters} icon={
                <Filter size={16} />
              }>
                Filter
              </Button>
            </div>
          </div>

          {/* Active Users section */}
          <h2 className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-small)] leading-[var(--line-height-small-text)] text-[color:var(--content-primary)] mb-[var(--padding-lg)]">
            Active Users
          </h2>

          {/* Users table */}
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
              {users.map((user, i) => (
                <TableRow key={i}>
                  <TableCell width="16.67%">{user.name}</TableCell>
                  <TableCell width="16.67%">{user.email}</TableCell>
                  <TableCell width="16.67%">{user.phone}</TableCell>
                  <TableCellBadge
                    width="16.67%"
                    label={user.status}
                    color={user.status === "Verified" ? "green" : "yellow"}
                  />
                  <TableCell width="16.67%">{user.date}</TableCell>
                  <TableCell width="16.67%" align="right">
                    <div className="flex items-center justify-end gap-[var(--padding-md)] w-full">
                      <button
                        onClick={() => router.push("/users/erik-cativo")}
                        className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-primary)] cursor-pointer hover:text-[color:var(--content-secondary)] transition-[color] duration-300"
                      >
                        View
                      </button>
                      <button className="text-[color:var(--content-primary)] cursor-pointer">
                        <OverflowMenuVertical size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TablePagination total={15} page={1} pageSize={4} />
          </Table>
        </main>
      </div>
    </div>
  );
}
