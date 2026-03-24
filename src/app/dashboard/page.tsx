"use client";

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

/* ---- Inline icons ---- */

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1" />
    <path d="M2 14C2 11.5 4.5 9.5 8 9.5S14 11.5 14 14" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
    <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
    <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DragIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4 text-[color:var(--content-icon)]">
    <circle cx="6" cy="5" r="1" fill="currentColor" />
    <circle cx="10" cy="5" r="1" fill="currentColor" />
    <circle cx="6" cy="8" r="1" fill="currentColor" />
    <circle cx="10" cy="8" r="1" fill="currentColor" />
    <circle cx="6" cy="11" r="1" fill="currentColor" />
    <circle cx="10" cy="11" r="1" fill="currentColor" />
  </svg>
);

const OverflowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
    <circle cx="8" cy="4" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="8" cy="12" r="1" fill="currentColor" />
  </svg>
);

/* ---- Nav items ---- */

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <UsersIcon /> },
  { label: "Users", icon: <UsersIcon />, active: true },
  { label: "Transactions", icon: <CheckCircleIcon /> },
  { label: "Customers", icon: <UsersIcon /> },
  { label: "Settings", icon: <ClockIcon /> },
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
        <DragIcon />
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

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-6">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
  </svg>
);

/* ---- Page ---- */

export default function DashboardPage() {
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
            <SearchIcon />
            <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-secondary)]">
              Search
            </span>
          </div>
          <div className="flex items-center gap-[var(--padding-md)]">
            <div className="size-6 rounded-full bg-[var(--background-tertiary)]" />
            <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-small)] text-[color:var(--content-primary)] uppercase">
              Jason Williams
            </span>
            <ChevronDownIcon />
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
            <StatCard title="Total Users" value={44} icon={<UsersIcon />} />
            <StatCard title="Verified Users" value={44} icon={<CheckCircleIcon />} />
            <StatCard title="Unverified Users" value={44} icon={<ClockIcon />} />
          </div>

          {/* Filter row 1 */}
          <div className="flex gap-[var(--padding-xl)] mb-[var(--padding-xl)]">
            <TextInput label="First Name" placeholder="Filter by email" size="sm" className="flex-1" />
            <TextInput label="Last Name" placeholder="Filter by phone" size="sm" className="flex-1" />
            <TextInput label="Email" placeholder="Filter by username" size="sm" className="flex-1" />
          </div>

          {/* Filter row 2 */}
          <div className="flex items-end gap-[var(--padding-xl)] mb-[var(--padding-2xl)]">
            <TextInput label="From Date" placeholder="MM-DD-YYYY" size="sm" className="w-[368px] shrink-0" />
            <TextInput label="To Date" placeholder="MM-DD-YYYY" size="sm" className="w-[368px] shrink-0" />
            <div className="flex-1" />
            <div className="flex items-center gap-[var(--padding-md)] pb-[var(--padding-md)]">
              <Button variant="secondary" size="sm" buttonType="text-icon" icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
                  <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }>
                Clear
              </Button>
              <Button variant="primary" size="sm" buttonType="text-icon" icon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
                  <path d="M2 3H14L9 9V13L7 14V9L2 3Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
