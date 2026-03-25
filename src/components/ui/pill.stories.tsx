import type { Story } from "@ladle/react";
import * as React from "react";
import { Pill } from "./pill";

const SectionLabel = ({ children }: { children: string }) => (
  <p className="font-['Lexend',sans-serif] text-[10px] text-[var(--content-secondary)] uppercase tracking-[0.3px]">
    {children}
  </p>
);

/* ---------- Interactive default ---------- */

export const Default: Story<{
  label: string;
  color: "green" | "red" | "yellow" | "blue" | "gray" | "default";
  size: "sm" | "md" | "lg";
}> = ({ label, color, size }) => (
  <Pill label={label} color={color} size={size} />
);

Default.args = {
  label: "Active",
  color: "green",
  size: "md",
};

/* ---------- Sizes ---------- */

export const Sizes: Story = () => (
  <div className="flex flex-col gap-8 p-6">
    <div>
      <SectionLabel>Small</SectionLabel>
      <div className="mt-2 flex items-center gap-4">
        <Pill label="Active" color="green" size="sm" />
        <Pill label="Pending" color="yellow" size="sm" />
        <Pill label="Error" color="red" size="sm" />
        <Pill label="Info" color="blue" size="sm" />
        <Pill label="Inactive" color="gray" size="sm" />
        <Pill label="Default" color="default" size="sm" />
      </div>
    </div>
    <div>
      <SectionLabel>Medium</SectionLabel>
      <div className="mt-2 flex items-center gap-4">
        <Pill label="Active" color="green" size="md" />
        <Pill label="Pending" color="yellow" size="md" />
        <Pill label="Error" color="red" size="md" />
        <Pill label="Info" color="blue" size="md" />
        <Pill label="Inactive" color="gray" size="md" />
        <Pill label="Default" color="default" size="md" />
      </div>
    </div>
    <div>
      <SectionLabel>Large</SectionLabel>
      <div className="mt-2 flex items-center gap-4">
        <Pill label="Active" color="green" size="lg" />
        <Pill label="Pending" color="yellow" size="lg" />
        <Pill label="Error" color="red" size="lg" />
        <Pill label="Info" color="blue" size="lg" />
        <Pill label="Inactive" color="gray" size="lg" />
        <Pill label="Default" color="default" size="lg" />
      </div>
    </div>
  </div>
);

/* ---------- All colors ---------- */

export const AllColors: Story = () => (
  <div className="flex flex-col gap-8 p-6">
    <div>
      <SectionLabel>All colors — Medium</SectionLabel>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Pill label="Verified" color="green" />
        <Pill label="Unverified" color="yellow" />
        <Pill label="Rejected" color="red" />
        <Pill label="Processing" color="blue" />
        <Pill label="Archived" color="gray" />
        <Pill label="Custom" color="default" />
      </div>
    </div>
  </div>
);

/* ---------- Dark mode ---------- */

const DarkWrapper = ({ children }: { children: React.ReactNode }) => (
  <div data-theme="dark" className="bg-[var(--background-primary)] text-[color:var(--content-primary)] p-6 rounded-lg">
    {children}
  </div>
);

export const DarkMode: Story = () => (
  <DarkWrapper>
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Pill label="Active" color="green" size="sm" />
        <Pill label="Active" color="green" size="md" />
        <Pill label="Active" color="green" size="lg" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Pill label="Verified" color="green" />
        <Pill label="Pending" color="yellow" />
        <Pill label="Error" color="red" />
        <Pill label="Info" color="blue" />
        <Pill label="Inactive" color="gray" />
      </div>
    </div>
  </DarkWrapper>
);

export default {
  title: "Components / Pill",
};
