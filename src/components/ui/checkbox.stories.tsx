import type { Story } from "@ladle/react";
import * as React from "react";
import { Checkbox } from "./checkbox";

const SectionLabel = ({ children }: { children: string }) => (
  <p className="font-['Lexend',sans-serif] text-[10px] text-[var(--content-secondary)] uppercase tracking-[0.3px]">
    {children}
  </p>
);

/* ---------- Interactive default ---------- */

export const Default: Story<{
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  label: string;
  description: string;
  showLabel: boolean;
  showDescription: boolean;
}> = ({
  checked,
  indeterminate,
  disabled,
  label,
  description,
  showLabel,
  showDescription,
}) => (
  <Checkbox
    checked={checked}
    indeterminate={indeterminate}
    disabled={disabled}
    label={showLabel ? label : undefined}
    description={showLabel && showDescription ? description : undefined}
    onChange={() => {}}
  />
);

Default.args = {
  checked: false,
  indeterminate: false,
  disabled: false,
  label: "Label",
  description: "Description text",
  showLabel: true,
  showDescription: true,
};

/* ---------- Individual stories ---------- */

export const Unchecked: Story = () => (
  <Checkbox checked={false} onChange={() => {}} />
);

export const Indeterminate: Story = () => (
  <Checkbox indeterminate onChange={() => {}} />
);

export const Checked: Story = () => (
  <Checkbox checked onChange={() => {}} />
);

export const DisabledUnchecked: Story = () => (
  <Checkbox checked={false} disabled onChange={() => {}} />
);

export const DisabledIndeterminate: Story = () => (
  <Checkbox indeterminate disabled onChange={() => {}} />
);

export const DisabledChecked: Story = () => (
  <Checkbox checked disabled onChange={() => {}} />
);

/* ---------- With label ---------- */

export const WithLabel: Story = () => (
  <Checkbox
    checked={false}
    label="Label"
    description="Description text"
    onChange={() => {}}
  />
);

export const WithLabelChecked: Story = () => (
  <Checkbox
    checked
    label="Label"
    description="Description text"
    onChange={() => {}}
  />
);

export const WithLabelIndeterminate: Story = () => (
  <Checkbox
    indeterminate
    label="Label"
    description="Description text"
    onChange={() => {}}
  />
);

export const WithLabelDisabled: Story = () => (
  <Checkbox
    checked={false}
    disabled
    label="Label"
    description="Description text"
    onChange={() => {}}
  />
);

export const WithLabelDisabledChecked: Story = () => (
  <Checkbox
    checked
    disabled
    label="Label"
    description="Description text"
    onChange={() => {}}
  />
);

export const LabelOnly: Story = () => (
  <Checkbox checked={false} label="Label" onChange={() => {}} />
);

/* ---------- Complete matrix ---------- */

export const AllVariants: Story = () => (
  <div className="flex flex-col gap-10 p-6">
    {/* Checkbox only */}
    <div>
      <SectionLabel>Checkbox — Enabled</SectionLabel>
      <div className="mt-2 flex items-center gap-12">
        <Checkbox checked={false} onChange={() => {}} />
        <Checkbox indeterminate onChange={() => {}} />
        <Checkbox checked onChange={() => {}} />
      </div>
    </div>

    <div>
      <SectionLabel>Checkbox — Disabled</SectionLabel>
      <div className="mt-2 flex items-center gap-12">
        <Checkbox checked={false} disabled onChange={() => {}} />
        <Checkbox indeterminate disabled onChange={() => {}} />
        <Checkbox checked disabled onChange={() => {}} />
      </div>
    </div>

    {/* With label */}
    <div>
      <SectionLabel>With label — Active</SectionLabel>
      <div className="mt-2 flex items-start gap-12">
        <Checkbox
          checked={false}
          label="Label"
          description="Description text"
          onChange={() => {}}
        />
        <Checkbox
          indeterminate
          label="Label"
          description="Description text"
          onChange={() => {}}
        />
        <Checkbox
          checked
          label="Label"
          description="Description text"
          onChange={() => {}}
        />
      </div>
    </div>

    <div>
      <SectionLabel>With label — Disabled</SectionLabel>
      <div className="mt-2 flex items-start gap-12">
        <Checkbox
          checked={false}
          disabled
          label="Label"
          description="Description text"
          onChange={() => {}}
        />
        <Checkbox
          indeterminate
          disabled
          label="Label"
          description="Description text"
          onChange={() => {}}
        />
        <Checkbox
          checked
          disabled
          label="Label"
          description="Description text"
          onChange={() => {}}
        />
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
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-12">
        <Checkbox checked={false} onChange={() => {}} />
        <Checkbox indeterminate onChange={() => {}} />
        <Checkbox checked onChange={() => {}} />
      </div>
      <div className="flex items-center gap-12">
        <Checkbox checked={false} disabled onChange={() => {}} />
        <Checkbox indeterminate disabled onChange={() => {}} />
        <Checkbox checked disabled onChange={() => {}} />
      </div>
      <div className="flex items-start gap-12">
        <Checkbox checked={false} label="Label" description="Description text" onChange={() => {}} />
        <Checkbox indeterminate label="Label" description="Description text" onChange={() => {}} />
        <Checkbox checked label="Label" description="Description text" onChange={() => {}} />
      </div>
    </div>
  </DarkWrapper>
);

export default {
  title: "Components / Checkbox",
};
