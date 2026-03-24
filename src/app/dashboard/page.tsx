"use client";

import { useState } from "react";
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
  TableCellAction,
  TablePagination,
} from "@/components/ui/table";
import { IconAdd } from "@/components/icons";
import { Search, UserMultiple, CheckmarkOutline, Time, ChevronDown, Draggable, OverflowMenuVertical, Close, Filter, Dashboard as DashboardIcon, Settings, Send, Star } from "@carbon/icons-react";

/* ---- Nav items ---- */

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <DashboardIcon size={16} /> },
  { label: "Users", icon: <UserMultiple size={16} />, active: true },
  { label: "Transactions", icon: <Send size={16} /> },
  { label: "Customers", icon: <UserMultiple size={16} /> },
  { label: "Settings", icon: <Settings size={16} /> },
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
        <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-super-tiny)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-secondary)]">
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

const Logo = () => <Star size={24} />;

/* ---- Page ---- */

export default function DashboardPage() {
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
    <div className="flex h-screen bg-[var(--background-secondary)]">
      {/* Sidebar */}
      <SidebarNav
        variant="classic"
        items={navItems}
        logo={<Logo />}
        userName="Hi, Alex"
        onToggle={() => {}}
        onUserMenuClick={() => {}}
        className="bg-[var(--background-primary)] shrink-0"
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-[var(--padding-2xl)] bg-[var(--background-primary)] shrink-0">
          <div />
          <div className="flex items-center gap-[var(--padding-md)] w-[240px] h-8 px-[var(--padding-lg)] rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--background-primary)]">
            <Search size={16} />
            <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-secondary)]">
              Search
            </span>
          </div>
          <div className="flex items-center gap-[var(--padding-md)]">
            <div className="size-6 rounded-full bg-[var(--background-tertiary)]" />
            <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-small)] text-[color:var(--content-primary)] uppercase">
              Jason Williams
            </span>
            <ChevronDown size={16} />
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto p-[var(--padding-3xl)] bg-[var(--background-primary)] m-[var(--padding-xl)] rounded-[var(--radius-lg)]">
          {/* Breadcrumbs + New User button */}
          <div className="flex items-center justify-between mb-[var(--padding-2xl)]">
            <Breadcrumbs items={[{ label: "Users" }]} />
            <Button variant="primary" buttonType="text-icon" icon={<IconAdd />}>
              New User
            </Button>
          </div>

          {/* Stat cards */}
          <div className="flex gap-[var(--padding-2xl)] mb-[var(--padding-2xl)]">
            <StatCard title="Total Users" value={44} icon={<UserMultiple size={16} />} />
            <StatCard title="Verified Users" value={44} icon={<CheckmarkOutline size={16} />} />
            <StatCard title="Unverified Users" value={44} icon={<Time size={16} />} />
          </div>

          {/* Filter row 1 */}
          <div className="flex gap-[var(--padding-xl)] mb-[var(--padding-xl)]">
            <TextInput label="First Name" placeholder="Filter by email" size="sm" className="flex-1" value={filters.firstName} onChange={updateFilter("firstName")} />
            <TextInput label="Last Name" placeholder="Filter by phone" size="sm" className="flex-1" value={filters.lastName} onChange={updateFilter("lastName")} />
            <TextInput label="Email" placeholder="Filter by username" size="sm" className="flex-1" value={filters.email} onChange={updateFilter("email")} />
          </div>

          {/* Filter row 2 */}
          <div className="flex items-end gap-[var(--padding-xl)] mb-[var(--padding-2xl)]">
            <TextInput label="From Date" placeholder="MM-DD-YYYY" size="sm" className="w-[368px] shrink-0" value={filters.fromDate} onChange={updateFilter("fromDate")} />
            <TextInput label="To Date" placeholder="MM-DD-YYYY" size="sm" className="w-[368px] shrink-0" value={filters.toDate} onChange={updateFilter("toDate")} />
            <div className="flex-1" />
            <div className="flex items-center gap-[var(--padding-md)] pb-[var(--padding-md)]">
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
                  <TableCellAction
                    width="16.67%"
                    actions={[{ label: "View" }]}
                  />
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
