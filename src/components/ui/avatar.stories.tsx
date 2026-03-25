import type { Story } from "@ladle/react";
import * as React from "react";
import { Avatar } from "./avatar";

const SectionLabel = ({ children }: { children: string }) => (
  <p className="font-['Lexend',sans-serif] text-[10px] text-[var(--content-secondary)] uppercase tracking-[0.3px]">
    {children}
  </p>
);

/* ---------- Interactive default ---------- */

export const Default: Story<{
  initials: string;
  size: "xs" | "sm" | "md" | "lg";
}> = ({ initials, size }) => (
  <Avatar initials={initials} size={size} />
);

Default.args = {
  initials: "EC",
  size: "sm",
};

/* ---------- All sizes ---------- */

export const Sizes: Story = () => (
  <div className="flex flex-col gap-8 p-6">
    <div>
      <SectionLabel>All sizes</SectionLabel>
      <div className="mt-2 flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Avatar initials="EC" size="xs" />
          <span className="text-[10px] text-[var(--content-secondary)]">xs (24)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar initials="EC" size="sm" />
          <span className="text-[10px] text-[var(--content-secondary)]">sm (32)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar initials="EC" size="md" />
          <span className="text-[10px] text-[var(--content-secondary)]">md (40)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar initials="EC" size="lg" />
          <span className="text-[10px] text-[var(--content-secondary)]">lg (48)</span>
        </div>
      </div>
    </div>
  </div>
);

/* ---------- Multiple users ---------- */

export const UserList: Story = () => (
  <div className="flex flex-col gap-8 p-6">
    <div>
      <SectionLabel>User list example</SectionLabel>
      <div className="mt-2 flex items-center gap-4">
        <Avatar initials="EC" size="sm" />
        <Avatar initials="SC" size="sm" />
        <Avatar initials="MW" size="sm" />
        <Avatar initials="PD" size="sm" />
        <Avatar initials="JO" size="sm" />
        <Avatar initials="LK" size="sm" />
      </div>
    </div>
    <div>
      <SectionLabel>Profile header</SectionLabel>
      <div className="mt-2 flex items-center gap-4">
        <Avatar initials="EC" size="lg" />
        <div>
          <div className="font-[family-name:var(--family-body),sans-serif] font-medium text-[16px] text-[color:var(--content-primary)]">Erik Cativo</div>
          <div className="font-[family-name:var(--family-body),sans-serif] text-[12px] text-[color:var(--content-secondary)]">erik@hoseki.app</div>
        </div>
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
    <div className="flex items-center gap-4">
      <Avatar initials="EC" size="xs" />
      <Avatar initials="SC" size="sm" />
      <Avatar initials="MW" size="md" />
      <Avatar initials="PD" size="lg" />
    </div>
  </DarkWrapper>
);

export default {
  title: "Components / Avatar",
};
