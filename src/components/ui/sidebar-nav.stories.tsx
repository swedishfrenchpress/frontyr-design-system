import type { Story } from "@ladle/react";
import * as React from "react";
import { SidebarNav, type NavItem, type NavSection } from "./sidebar-nav";
import { Star, Dashboard, Grid as GridIcon, Send, Settings, UserMultiple } from "@carbon/icons-react";

const Logo = () => <Star size={24} />;

const MeterIcon = () => <Dashboard size={16} />;

const GridIconLocal = () => <GridIcon size={16} />;

const DeployIcon = () => <Send size={16} />;

/* ---- Data ---- */

const classicItems: NavItem[] = [
  { label: "Dashboard", icon: <Dashboard size={16} /> },
  { label: "Events", icon: <GridIconLocal /> },
  { label: "Agents", icon: <GridIconLocal />, active: true },
  { label: "Playbooks", icon: <DeployIcon /> },
  { label: "Campaigns", icon: <GridIconLocal /> },
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
    icon: <GridIconLocal />,
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
