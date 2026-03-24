import type { Story } from "@ladle/react";
import * as React from "react";
import { SidebarNav, type NavItem, type NavSection } from "./sidebar-nav";

/* Placeholder logo */
const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-6">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
  </svg>
);

/* Placeholder section icons */
const MeterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1" />
    <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const DeployIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2L14 8L8 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 8H14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

/* ---- Data ---- */

const classicItems: NavItem[] = [
  { label: "Dashboard", icon: <MeterIcon /> },
  { label: "Events", icon: <GridIcon /> },
  { label: "Agents", icon: <GridIcon />, active: true },
  { label: "Playbooks", icon: <DeployIcon /> },
  { label: "Campaigns", icon: <GridIcon /> },
];

const treeSections: NavSection[] = [
  {
    label: "Monitor",
    icon: <MeterIcon />,
    items: [
      { label: "Dashboard", href: "#" },
      { label: "Call History", href: "#" },
      { label: "Live Calls", href: "#" },
    ],
  },
  {
    label: "Orchestrate",
    icon: <GridIcon />,
    items: [
      { label: "Agents", href: "#", active: true },
      { label: "Campaigns", href: "#" },
      { label: "Playbooks", href: "#" },
    ],
  },
  {
    label: "Delegate",
    icon: <DeployIcon />,
    items: [
      { label: "Phone Numbers", href: "#" },
      { label: "Voice Library", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
];

const NavWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="h-[700px] border border-[var(--border-subtle)] rounded-[var(--radius-md)]">
    {children}
  </div>
);

/* ---- Stories ---- */

export const Classic: Story = () => (
  <NavWrapper>
    <SidebarNav
      variant="classic"
      items={classicItems}
      logo={<Logo />}
      userName="Hi, Alex"
      onToggle={() => {}}
      onUserMenuClick={() => {}}
    />
  </NavWrapper>
);

export const TreeOpen: Story = () => (
  <NavWrapper>
    <SidebarNav
      variant="tree"
      sections={treeSections}
      logo={<Logo />}
      userName="Hi, Alex"
      onToggle={() => {}}
      onUserMenuClick={() => {}}
    />
  </NavWrapper>
);

export const TreeCollapsed: Story = () => (
  <NavWrapper>
    <SidebarNav
      variant="tree"
      collapsed
      sections={treeSections}
      logo={<Logo />}
      userName="Hi, Alex"
      onToggle={() => {}}
    />
  </NavWrapper>
);

export const AllVariants: Story = () => (
  <div className="flex gap-8 p-6">
    <div>
      <p className="font-['Lexend',sans-serif] text-[10px] text-[var(--content-secondary)] uppercase tracking-[0.3px] mb-3">
        Classic
      </p>
      <NavWrapper>
        <SidebarNav
          variant="classic"
          items={classicItems}
          logo={<Logo />}
          userName="Hi, Alex"
          onToggle={() => {}}
          onUserMenuClick={() => {}}
        />
      </NavWrapper>
    </div>
    <div>
      <p className="font-['Lexend',sans-serif] text-[10px] text-[var(--content-secondary)] uppercase tracking-[0.3px] mb-3">
        Tree (Open)
      </p>
      <NavWrapper>
        <SidebarNav
          variant="tree"
          sections={treeSections}
          logo={<Logo />}
          userName="Hi, Alex"
          onToggle={() => {}}
          onUserMenuClick={() => {}}
        />
      </NavWrapper>
    </div>
    <div>
      <p className="font-['Lexend',sans-serif] text-[10px] text-[var(--content-secondary)] uppercase tracking-[0.3px] mb-3">
        Tree (Collapsed)
      </p>
      <NavWrapper>
        <SidebarNav
          variant="tree"
          collapsed
          sections={treeSections}
          logo={<Logo />}
          onToggle={() => {}}
        />
      </NavWrapper>
    </div>
  </div>
);

/* ---- Dark mode ---- */

const DarkWrapper = ({ children }: { children: React.ReactNode }) => (
  <div data-theme="dark" className="bg-[var(--background-primary)] text-[color:var(--content-primary)] p-6 rounded-lg">
    {children}
  </div>
);

export const DarkMode: Story = () => (
  <DarkWrapper>
    <div className="flex gap-8">
      <NavWrapper>
        <SidebarNav
          variant="classic"
          items={classicItems}
          logo={<Logo />}
          userName="Hi, Alex"
          onToggle={() => {}}
          onUserMenuClick={() => {}}
        />
      </NavWrapper>
      <NavWrapper>
        <SidebarNav
          variant="tree"
          sections={treeSections}
          logo={<Logo />}
          userName="Hi, Alex"
          onToggle={() => {}}
          onUserMenuClick={() => {}}
        />
      </NavWrapper>
    </div>
  </DarkWrapper>
);

export default {
  title: "Components / Sidebar Nav",
};
