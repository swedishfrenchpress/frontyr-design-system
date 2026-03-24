import type { Story } from "@ladle/react";
import * as React from "react";
import { Breadcrumbs } from "./breadcrumbs";
import { IconAdd } from "@/components/icons";

const SectionLabel = ({ children }: { children: string }) => (
  <p className="font-['Lexend',sans-serif] text-[10px] text-[var(--content-secondary)] uppercase tracking-[0.3px]">
    {children}
  </p>
);

const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path d="M2 3h5l1 1h6v9H2V3z" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

/* ---------- Interactive ---------- */

export const Default: Story<{
  itemCount: number;
}> = ({ itemCount }) => {
  const labels = ["Dashboard", "Settings", "Agents", "Support", "Group 1"];
  const items = labels.slice(0, itemCount).map((label, i, arr) => ({
    label,
    href: i < arr.length - 1 ? "#" : undefined,
  }));
  return <Breadcrumbs items={items} />;
};

Default.args = { itemCount: 3 };
Default.argTypes = {
  itemCount: { control: { type: "select" }, options: [2, 3, 4, 5] },
};

/* ---------- Individual ---------- */

export const TwoItems: Story = () => (
  <Breadcrumbs
    items={[
      { label: "Dashboard", href: "#" },
      { label: "Agents" },
    ]}
  />
);

export const ThreeItems: Story = () => (
  <Breadcrumbs
    items={[
      { label: "Workflows", href: "#" },
      { label: "Customer Support", href: "#" },
      { label: "Settings" },
    ]}
  />
);

export const FourItems: Story = () => (
  <Breadcrumbs
    items={[
      { label: "Workflows", href: "#" },
      { label: "Agents", href: "#" },
      { label: "Support", href: "#" },
      { label: "Group 1" },
    ]}
  />
);

export const WithIcons: Story = () => (
  <Breadcrumbs
    items={[
      { label: "Workflows", href: "#", icon: <FolderIcon /> },
      { label: "Customer Support", href: "#" },
      { label: "Settings" },
    ]}
  />
);

export const WithOverflow: Story = () => (
  <Breadcrumbs
    maxItems={3}
    items={[
      { label: "Dashboard", href: "#" },
      { label: "Settings", href: "#" },
      { label: "Agents", href: "#" },
      { label: "Support", href: "#" },
      { label: "Group 1" },
    ]}
  />
);

/* ---------- Dark mode ---------- */

const DarkWrapper = ({ children }: { children: React.ReactNode }) => (
  <div data-theme="dark" className="bg-[var(--background-primary)] text-[color:var(--content-primary)] p-6 rounded-lg">
    {children}
  </div>
);

export const DarkModeVariants: Story = () => (
  <DarkWrapper>
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "#" },
          { label: "Agents" },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Workflows", href: "#", icon: <FolderIcon /> },
          { label: "Customer Support", href: "#" },
          { label: "Settings" },
        ]}
      />
      <Breadcrumbs
        maxItems={3}
        items={[
          { label: "Dashboard", href: "#" },
          { label: "Settings", href: "#" },
          { label: "Agents", href: "#" },
          { label: "Support", href: "#" },
          { label: "Group 1" },
        ]}
      />
    </div>
  </DarkWrapper>
);

/* ---------- Full matrix ---------- */

export const AllVariants: Story = () => (
  <div className="flex flex-col gap-8 p-6">
    <div>
      <SectionLabel>2 items</SectionLabel>
      <div className="mt-2">
        <Breadcrumbs items={[{ label: "Dashboard", href: "#" }, { label: "Agents" }]} />
      </div>
    </div>
    <div>
      <SectionLabel>3 items with icon</SectionLabel>
      <div className="mt-2">
        <Breadcrumbs items={[{ label: "Workflows", href: "#", icon: <FolderIcon /> }, { label: "Customer Support", href: "#" }, { label: "Settings" }]} />
      </div>
    </div>
    <div>
      <SectionLabel>4 items</SectionLabel>
      <div className="mt-2">
        <Breadcrumbs items={[{ label: "Workflows", href: "#" }, { label: "Agents", href: "#" }, { label: "Support", href: "#" }, { label: "Group 1" }]} />
      </div>
    </div>
    <div>
      <SectionLabel>5 items with overflow (maxItems=3)</SectionLabel>
      <div className="mt-2">
        <Breadcrumbs maxItems={3} items={[{ label: "Dashboard", href: "#" }, { label: "Settings", href: "#" }, { label: "Agents", href: "#" }, { label: "Support", href: "#" }, { label: "Group 1" }]} />
      </div>
    </div>
  </div>
);

export default {
  title: "Components / Breadcrumbs",
};
