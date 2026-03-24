import type { Story } from "@ladle/react";
import * as React from "react";
import { Button } from "./button";
import { IconAdd } from "@/components/icons";

/** Focus ring styles from Figma Components/Focus token */
const focusShadow =
  "inset 0px 0px 0px 1px #ffffff, inset 0px -1px 0px 0px #0000001a, 0px 1px 2px 0px #0000000a, 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #0968f680";
const destructiveFocusShadow =
  "inset 0px 0px 0px 1px #ffffff, inset 0px -1px 0px 0px #0000001a, 0px 1px 2px 0px #0000000d, 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #d50b0b80";

const SectionLabel = ({ children }: { children: string }) => (
  <p className="font-['Lexend',sans-serif] text-[10px] text-[var(--content-secondary)] uppercase tracking-[0.3px]">
    {children}
  </p>
);

/* ---------- Interactive default ---------- */

export const Default: Story<{
  variant: "primary" | "secondary" | "destructive";
  size: "sm" | "lg";
  buttonType: "text" | "text-icon" | "icon-only" | "text-shortcut" | "badge";
  disabled: boolean;
  loading: boolean;
  label: string;
  badgeLabel: string;
}> = ({ variant, size, buttonType, disabled, loading, label, badgeLabel }) => (
  <Button
    variant={variant}
    size={size}
    buttonType={buttonType}
    disabled={disabled}
    loading={loading}
    icon={
      buttonType === "text-icon" || buttonType === "icon-only" ? (
        <IconAdd />
      ) : undefined
    }
    shortcut={buttonType === "text-shortcut" ? "⌘⇧" : undefined}
    badgeLabel={buttonType === "badge" ? badgeLabel : undefined}
    aria-label={buttonType === "icon-only" ? label : undefined}
  >
    {buttonType !== "icon-only" && buttonType !== "badge" ? label : undefined}
  </Button>
);

Default.args = {
  variant: "primary",
  size: "lg",
  buttonType: "text",
  disabled: false,
  loading: false,
  label: "Label",
  badgeLabel: "1",
};

Default.argTypes = {
  variant: {
    control: { type: "select" },
    options: ["primary", "secondary", "destructive"],
  },
  size: {
    control: { type: "select" },
    options: ["sm", "lg"],
  },
  buttonType: {
    control: { type: "select" },
    options: ["text", "text-icon", "icon-only", "text-shortcut", "badge"],
  },
};

/* ---------- Individual stories ---------- */

export const Primary: Story = () => (
  <Button variant="primary">Label</Button>
);

export const Secondary: Story = () => (
  <Button variant="secondary">Label</Button>
);

export const Destructive: Story = () => (
  <Button variant="destructive">Label</Button>
);

export const SmallPrimary: Story = () => (
  <Button variant="primary" size="sm">Label</Button>
);

export const SmallSecondary: Story = () => (
  <Button variant="secondary" size="sm">Label</Button>
);

export const SmallDestructive: Story = () => (
  <Button variant="destructive" size="sm">Label</Button>
);

export const TextWithIcon: Story = () => (
  <Button variant="primary" buttonType="text-icon" icon={<IconAdd />}>
    Label
  </Button>
);

export const IconOnly: Story = () => (
  <Button
    variant="primary"
    buttonType="icon-only"
    icon={<IconAdd />}
    aria-label="Add item"
  />
);

export const TextWithShortcut: Story = () => (
  <Button variant="secondary" buttonType="text-shortcut" shortcut="⌘⇧">
    Label
  </Button>
);

export const Badge: Story = () => (
  <Button variant="secondary" buttonType="badge" badgeLabel="1" />
);

export const BadgeMultiDigit: Story = () => (
  <Button variant="secondary" buttonType="badge" badgeLabel="12" />
);

export const Loading: Story = () => (
  <Button variant="primary" loading>Label</Button>
);

export const LoadingDestructive: Story = () => (
  <Button variant="destructive" loading>Label</Button>
);

export const LoadingSecondary: Story = () => (
  <Button variant="secondary" loading>Label</Button>
);

export const Disabled: Story = () => (
  <Button variant="primary" disabled>Label</Button>
);

export const DisabledSecondary: Story = () => (
  <Button variant="secondary" disabled>Label</Button>
);

export const DisabledDestructive: Story = () => (
  <Button variant="destructive" disabled>Label</Button>
);

/* ---------- Focus states (visible ring) ---------- */

export const FocusPrimary: Story = () => (
  <Button variant="primary" style={{ boxShadow: focusShadow }}>
    Label
  </Button>
);

export const FocusSecondary: Story = () => (
  <Button
    variant="secondary"
    className="border-transparent"
    style={{ boxShadow: focusShadow }}
  >
    Label
  </Button>
);

export const FocusDestructive: Story = () => (
  <Button
    variant="destructive"
    style={{ boxShadow: destructiveFocusShadow }}
  >
    Label
  </Button>
);

/* ---------- Complete matrix ---------- */

export const AllVariantsLarge: Story = () => (
  <div className="flex flex-col gap-6 p-6">
    {/* Default */}
    <div>
      <SectionLabel>Default</SectionLabel>
      <div className="mt-2 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Button variant="primary">Label</Button>
          <Button variant="primary" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="primary" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive">Label</Button>
          <Button variant="destructive" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Label</Button>
          <Button variant="secondary" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="secondary" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
          <Button variant="secondary" buttonType="text-shortcut" shortcut="⌘⇧">Label</Button>
          <Button variant="secondary" buttonType="badge" badgeLabel="1" />
        </div>
      </div>
    </div>

    {/* Loading */}
    <div>
      <SectionLabel>Loading</SectionLabel>
      <div className="mt-2 flex items-center gap-8">
        <Button variant="primary" loading>Label</Button>
        <Button variant="destructive" loading>Label</Button>
        <Button variant="secondary" loading>Label</Button>
      </div>
    </div>

    {/* Hover (static preview) */}
    <div>
      <SectionLabel>Hover (preview)</SectionLabel>
      <div className="mt-2 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Button variant="primary" className="bg-[color-mix(in_srgb,var(--content-primary)_92%,var(--content-on-primary))]">Label</Button>
          <Button variant="primary" className="bg-[color-mix(in_srgb,var(--content-primary)_92%,var(--content-on-primary))]" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="primary" className="bg-[color-mix(in_srgb,var(--content-primary)_92%,var(--content-on-primary))]" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" className="bg-[color-mix(in_srgb,var(--background-attention)_92%,var(--content-on-primary))]">Label</Button>
          <Button variant="destructive" className="bg-[color-mix(in_srgb,var(--background-attention)_92%,var(--content-on-primary))]" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="bg-[var(--input-hover-dark)]">Label</Button>
          <Button variant="secondary" className="bg-[var(--input-hover-dark)]" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="secondary" className="bg-[var(--input-hover-dark)]" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
          <Button variant="secondary" className="bg-[var(--input-hover-dark)]" buttonType="text-shortcut" shortcut="⌘⇧">Label</Button>
          <Button variant="secondary" className="bg-[var(--input-hover-dark)]" buttonType="badge" badgeLabel="1" />
        </div>
      </div>
    </div>

    {/* Focus */}
    <div>
      <SectionLabel>Focus</SectionLabel>
      <div className="mt-2 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Button variant="primary" style={{ boxShadow: focusShadow }}>Label</Button>
          <Button variant="primary" buttonType="text-icon" icon={<IconAdd />} style={{ boxShadow: focusShadow }}>Label</Button>
          <Button variant="primary" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" style={{ boxShadow: focusShadow }} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" style={{ boxShadow: destructiveFocusShadow }}>Label</Button>
          <Button variant="destructive" buttonType="text-icon" icon={<IconAdd />} style={{ boxShadow: destructiveFocusShadow }}>Label</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="border-transparent" style={{ boxShadow: focusShadow }}>Label</Button>
          <Button variant="secondary" className="border-transparent" buttonType="text-icon" icon={<IconAdd />} style={{ boxShadow: focusShadow }}>Label</Button>
          <Button variant="secondary" className="border-transparent" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" style={{ boxShadow: focusShadow }} />
          <Button variant="secondary" className="border-transparent" buttonType="text-shortcut" shortcut="⌘⇧" style={{ boxShadow: focusShadow }}>Label</Button>
          <Button variant="secondary" className="border-transparent" buttonType="badge" badgeLabel="1" style={{ boxShadow: focusShadow }} />
        </div>
      </div>
    </div>

    {/* Disabled */}
    <div>
      <SectionLabel>Disabled</SectionLabel>
      <div className="mt-2 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Button variant="primary" disabled>Label</Button>
          <Button variant="primary" disabled buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="primary" disabled buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" disabled>Label</Button>
          <Button variant="destructive" disabled buttonType="text-icon" icon={<IconAdd />}>Label</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" disabled>Label</Button>
          <Button variant="secondary" disabled buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="secondary" disabled buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
          <Button variant="secondary" disabled buttonType="text-shortcut" shortcut="⌘⇧">Label</Button>
          <Button variant="secondary" disabled buttonType="badge" badgeLabel="1" />
        </div>
      </div>
    </div>
  </div>
);

export const AllVariantsSmall: Story = () => (
  <div className="flex flex-col gap-6 p-6">
    {/* Default — Small */}
    <div>
      <SectionLabel>Default — Small</SectionLabel>
      <div className="mt-2 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm">Label</Button>
          <Button variant="primary" size="sm" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="primary" size="sm" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm">Label</Button>
          <Button variant="destructive" size="sm" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">Label</Button>
          <Button variant="secondary" size="sm" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="secondary" size="sm" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
          <Button variant="secondary" size="sm" buttonType="text-shortcut" shortcut="⌘⇧">Label</Button>
          <Button variant="secondary" size="sm" buttonType="badge" badgeLabel="1" />
        </div>
      </div>
    </div>

    {/* Loading — Small */}
    <div>
      <SectionLabel>Loading — Small</SectionLabel>
      <div className="mt-2 flex items-center gap-8">
        <Button variant="primary" size="sm" loading>Label</Button>
        <Button variant="destructive" size="sm" loading>Label</Button>
        <Button variant="secondary" size="sm" loading>Label</Button>
      </div>
    </div>

    {/* Hover — Small */}
    <div>
      <SectionLabel>Hover — Small (preview)</SectionLabel>
      <div className="mt-2 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" className="bg-[color-mix(in_srgb,var(--content-primary)_92%,var(--content-on-primary))]">Label</Button>
          <Button variant="primary" size="sm" className="bg-[color-mix(in_srgb,var(--content-primary)_92%,var(--content-on-primary))]" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="primary" size="sm" className="bg-[color-mix(in_srgb,var(--content-primary)_92%,var(--content-on-primary))]" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm" className="bg-[color-mix(in_srgb,var(--background-attention)_92%,var(--content-on-primary))]">Label</Button>
          <Button variant="destructive" size="sm" className="bg-[color-mix(in_srgb,var(--background-attention)_92%,var(--content-on-primary))]" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="bg-[var(--input-hover-dark)]">Label</Button>
          <Button variant="secondary" size="sm" className="bg-[var(--input-hover-dark)]" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="secondary" size="sm" className="bg-[var(--input-hover-dark)]" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
          <Button variant="secondary" size="sm" className="bg-[var(--input-hover-dark)]" buttonType="text-shortcut" shortcut="⌘⇧">Label</Button>
          <Button variant="secondary" size="sm" className="bg-[var(--input-hover-dark)]" buttonType="badge" badgeLabel="1" />
        </div>
      </div>
    </div>

    {/* Focus — Small */}
    <div>
      <SectionLabel>Focus — Small</SectionLabel>
      <div className="mt-2 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" style={{ boxShadow: focusShadow }}>Label</Button>
          <Button variant="primary" size="sm" buttonType="text-icon" icon={<IconAdd />} style={{ boxShadow: focusShadow }}>Label</Button>
          <Button variant="primary" size="sm" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" style={{ boxShadow: focusShadow }} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm" style={{ boxShadow: destructiveFocusShadow }}>Label</Button>
          <Button variant="destructive" size="sm" buttonType="text-icon" icon={<IconAdd />} style={{ boxShadow: destructiveFocusShadow }}>Label</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="border-transparent" style={{ boxShadow: focusShadow }}>Label</Button>
          <Button variant="secondary" size="sm" className="border-transparent" buttonType="text-icon" icon={<IconAdd />} style={{ boxShadow: focusShadow }}>Label</Button>
          <Button variant="secondary" size="sm" className="border-transparent" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" style={{ boxShadow: focusShadow }} />
          <Button variant="secondary" size="sm" className="border-transparent" buttonType="text-shortcut" shortcut="⌘⇧" style={{ boxShadow: focusShadow }}>Label</Button>
          <Button variant="secondary" size="sm" className="border-transparent" buttonType="badge" badgeLabel="1" style={{ boxShadow: focusShadow }} />
        </div>
      </div>
    </div>

    {/* Disabled — Small */}
    <div>
      <SectionLabel>Disabled — Small</SectionLabel>
      <div className="mt-2 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" disabled>Label</Button>
          <Button variant="primary" size="sm" disabled buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="primary" size="sm" disabled buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm" disabled>Label</Button>
          <Button variant="destructive" size="sm" disabled buttonType="text-icon" icon={<IconAdd />}>Label</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" disabled>Label</Button>
          <Button variant="secondary" size="sm" disabled buttonType="text-icon" icon={<IconAdd />}>Label</Button>
          <Button variant="secondary" size="sm" disabled buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
          <Button variant="secondary" size="sm" disabled buttonType="text-shortcut" shortcut="⌘⇧">Label</Button>
          <Button variant="secondary" size="sm" disabled buttonType="badge" badgeLabel="1" />
        </div>
      </div>
    </div>
  </div>
);

/* ---------- Dark mode preview ---------- */

const DarkWrapper = ({ children }: { children: React.ReactNode }) => (
  <div data-theme="dark" className="bg-[var(--background-primary)] text-[color:var(--content-primary)] p-6 rounded-lg">
    {children}
  </div>
);

export const DarkModeVariants: Story = () => (
  <DarkWrapper>
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="primary">Label</Button>
        <Button variant="primary" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
        <Button variant="primary" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="destructive">Label</Button>
        <Button variant="destructive" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary">Label</Button>
        <Button variant="secondary" buttonType="text-icon" icon={<IconAdd />}>Label</Button>
        <Button variant="secondary" buttonType="icon-only" icon={<IconAdd />} aria-label="Add" />
        <Button variant="secondary" buttonType="text-shortcut" shortcut="⌘⇧">Label</Button>
        <Button variant="secondary" buttonType="badge" badgeLabel="1" />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="primary" disabled>Label</Button>
        <Button variant="destructive" disabled>Label</Button>
        <Button variant="secondary" disabled>Label</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="primary" loading>Label</Button>
        <Button variant="destructive" loading>Label</Button>
        <Button variant="secondary" loading>Label</Button>
      </div>
    </div>
  </DarkWrapper>
);

export default {
  title: "Components / Button",
};
