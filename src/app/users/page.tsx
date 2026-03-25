"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SidebarNav, type NavItem } from "@/components/ui/sidebar-nav";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { Pill } from "@/components/ui/pill";
import {
  Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TablePagination,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IconAdd } from "@/components/icons";
import { Home, UserMultiple, Checkmark, Time, Settings, Search, Filter, OverflowMenuVertical } from "@carbon/icons-react";
import { PricingQuickProposal, Finance } from "@carbon/icons-react";

/* ---- Nav ---- */

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <Home size={16} />, href: "/dashboard" },
  { label: "Users", icon: <UserMultiple size={16} />, href: "/users", active: true },
  { label: "Transactions", icon: <PricingQuickProposal size={16} />, href: "/transactions" },
  { label: "Customers", icon: <Finance size={16} />, href: "/customers" },
  { label: "Settings", icon: <Settings size={16} />, href: "/settings" },
];

const Logo = () => <img src="/images/acme-bank-logo.png" alt="ACME BANK" className="h-5" />;

/* ---- Data ---- */

const users = [
  { name: "Erik Cativo", initials: "EC", email: "erik@hoseki.app", phone: "+15552348765", status: "Verified" as const, joined: "03/18/2026" },
  { name: "Sarah Chen", initials: "SC", email: "sarah@hoseki.app", phone: "+15559871234", status: "Unverified" as const, joined: "03/18/2026" },
  { name: "Marcus Webb", initials: "MW", email: "marcus@hoseki.app", phone: "+15553216789", status: "Verified" as const, joined: "03/15/2026" },
  { name: "Priya Desai", initials: "PD", email: "priya@hoseki.app", phone: "+15558904321", status: "Verified" as const, joined: "03/12/2026" },
  { name: "James Okafor", initials: "JO", email: "james@hoseki.app", phone: "+15554567890", status: "Verified" as const, joined: "03/10/2026" },
  { name: "Lena Kovacs", initials: "LK", email: "lena@hoseki.app", phone: "+15557654321", status: "Unverified" as const, joined: "03/08/2026" },
  { name: "David Park", initials: "DP", email: "david@hoseki.app", phone: "+15551239876", status: "Verified" as const, joined: "03/05/2026" },
  { name: "Amira Hassan", initials: "AH", email: "amira@hoseki.app", phone: "+15556781234", status: "Verified" as const, joined: "03/03/2026" },
];

const PER_PAGE = 4;

/* ---- Stat card ---- */

function StatCard({
  label,
  value,
  icon,
  active,
  onClick,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col gap-[var(--padding-md)] p-[var(--padding-xl)] rounded-[var(--radius-sm)] cursor-pointer text-left",
        "border bg-[var(--background-primary)] transition-[border-color] duration-300",
        active
          ? "border-[1.5px] border-[var(--content-primary)]"
          : "border border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-button)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-secondary)]">
          {label}
        </span>
        <span className="size-7 rounded-full flex items-center justify-center shrink-0">
          {icon}
        </span>
      </div>
      <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-semibold)] text-[length:28px] leading-[1.1] text-[color:var(--content-primary)]">
        {value}
      </span>
    </button>
  );
}

/* ---- Page ---- */

export default function UsersPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<"all" | "Verified" | "Unverified">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const verifiedCount = users.filter((u) => u.status === "Verified").length;
  const unverifiedCount = users.filter((u) => u.status === "Unverified").length;

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return users.filter((u) => {
      const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.phone.includes(q);
      const matchStatus = activeFilter === "all" || u.status === activeFilter;
      return matchSearch && matchStatus;
    });
  }, [searchQuery, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageUsers = filtered.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);

  const handleStatClick = (key: "all" | "Verified" | "Unverified") => {
    setActiveFilter((prev) => (prev === key ? "all" : key));
    setCurrentPage(0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setShowFilters(false);
    setSearchQuery("");
    setActiveFilter("all");
    setCurrentPage(0);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#f2f2f4] to-[#f9f8f6]">
      <SidebarNav variant="classic" items={navItems} logo={<Logo />} showFooter={false} onToggle={() => {}} className="shrink-0" />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="relative flex-1 flex flex-col overflow-auto p-[var(--padding-3xl)] bg-[var(--background-primary)] m-[var(--padding-xl)] rounded-[var(--radius-lg)]">
          {/* New User button — top right */}
          <div className="absolute top-[var(--padding-3xl)] right-[var(--padding-3xl)]">
            <Button variant="primary" buttonType="text-icon" icon={<IconAdd />}>
              New user
            </Button>
          </div>

          {/* Breadcrumbs */}
          <Breadcrumbs items={[{ label: "", icon: <UserMultiple size={16} /> }, { label: "Users" }]} className="mb-[var(--padding-2xl)]" />

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-[var(--padding-lg)] mb-[var(--padding-xl)]">
            <StatCard
              label="Total users"
              value={users.length}
              icon={<UserMultiple size={15} className="text-[color:var(--content-secondary)]" />}
              active={activeFilter === "all" && searchQuery === ""}
              onClick={() => handleStatClick("all")}
            />
            <StatCard
              label="Verified users"
              value={verifiedCount}
              icon={<Checkmark size={15} className="text-[color:var(--content-success)]" />}
              active={activeFilter === "Verified"}
              onClick={() => handleStatClick("Verified")}
            />
            <StatCard
              label="Unverified users"
              value={unverifiedCount}
              icon={<Time size={15} className="text-[color:var(--content-warning-text)]" />}
              active={activeFilter === "Unverified"}
              onClick={() => handleStatClick("Unverified")}
            />
          </div>

          {/* Search bar + filter toggle */}
          <div className="flex gap-[var(--padding-md)] mb-[var(--padding-xl)]">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-[var(--padding-lg)] top-1/2 -translate-y-1/2 text-[color:var(--content-secondary)] pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full h-[var(--icons-lg)] pl-[36px] pr-[var(--padding-lg)] rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--background-primary)] font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] text-[color:var(--content-primary)] placeholder:text-[color:var(--content-secondary)] outline-none transition-[border-color] duration-300 focus:border-[var(--border-strong)]"
              />
            </div>
            <Button
              variant="secondary"
              size="lg"
              buttonType="text-icon"
              icon={<Filter size={14} />}
              onClick={() => setShowFilters((v) => !v)}
              className={showFilters ? "border-[var(--content-accent)] text-[color:var(--content-accent)] bg-[var(--bg-badge-blue)]" : ""}
            >
              Filters
            </Button>
          </div>

          {/* Collapsible filter panel */}
          {showFilters && (
            <div className="border border-[var(--border-subtle)] rounded-[var(--radius-sm)] p-[var(--padding-2xl)] mb-[var(--padding-xl)] -mt-[var(--padding-md)]">
              <div className="grid grid-cols-3 gap-[var(--padding-lg)]">
                <TextInput label="First name" placeholder="Filter by first name" size="sm" />
                <TextInput label="Last name" placeholder="Filter by last name" size="sm" />
                <TextInput label="Email" placeholder="Filter by email" size="sm" />
                <TextInput label="From date" placeholder="MM-DD-YYYY" size="sm" />
                <TextInput label="To date" placeholder="MM-DD-YYYY" size="sm" />
                <div className="flex flex-col">
                  <label className="pb-[8px] font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-button)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-primary)]">
                    Status
                  </label>
                  <select className="h-[32px] px-[var(--padding-lg)] rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--background-primary)] font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] text-[color:var(--content-primary)] outline-none transition-[border-color] duration-300 focus:border-[var(--border-strong)]">
                    <option value="">All statuses</option>
                    <option>Verified</option>
                    <option>Unverified</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-[var(--padding-md)] mt-[var(--padding-xl)] pt-[var(--padding-lg)] border-t border-[var(--border-subtle)]">
                <Button variant="secondary" size="lg" onClick={clearFilters}>Clear</Button>
                <Button variant="primary" size="lg">Apply filters</Button>
              </div>
            </div>
          )}

          {/* Users table */}
          <Table title="Active Users" className="border border-[var(--border-subtle)] rounded-[var(--radius-sm)] overflow-clip">
            <TableHeader>
              <TableHead width="35%">User</TableHead>
              <TableHead width="20%">Phone</TableHead>
              <TableHead width="15%">Status</TableHead>
              <TableHead width="15%">Joined</TableHead>
              <TableHead width="15%" align="right">Actions</TableHead>
            </TableHeader>
            <TableBody>
              {pageUsers.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-[color:var(--content-secondary)] font-[family-name:var(--family-body),sans-serif] text-[length:var(--size-small)]">
                  No users match your search
                </div>
              ) : (
                pageUsers.map((user, i) => (
                  <TableRow key={`${user.email}-${i}`}>
                    <TableCell width="35%">
                      <div className="flex items-center gap-[var(--padding-lg)]">
                        <div className="size-[34px] rounded-full bg-[var(--background-tertiary)] flex items-center justify-center shrink-0">
                          <span className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-semibold)] text-[length:var(--size-button)] text-[color:var(--content-secondary)]">
                            {user.initials}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-small)] text-[color:var(--content-primary)] truncate">
                            {user.name}
                          </div>
                          <div className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] text-[color:var(--content-secondary)] truncate mt-[1px]">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell width="20%">{user.phone}</TableCell>
                    <TableCell width="15%">
                      <Pill label={user.status} color={user.status === "Verified" ? "green" : "yellow"} size="sm" />
                    </TableCell>
                    <TableCell width="15%">{user.joined}</TableCell>
                    <TableCell width="15%" align="right">
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
                ))
              )}
            </TableBody>
            <TablePagination
              total={filtered.length}
              page={currentPage + 1}
              pageSize={PER_PAGE}
              onPageChange={(p) => setCurrentPage(p - 1)}
            />
          </Table>
        </main>
      </div>
    </div>
  );
}
