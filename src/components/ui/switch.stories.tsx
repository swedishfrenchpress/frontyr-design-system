import type { Story } from "@ladle/react";
import * as React from "react";
import { Switch } from "./switch";

const SectionLabel = ({ children }: { children: string }) => (
  <p className="font-['Lexend',sans-serif] text-[10px] text-[var(--content-secondary)] uppercase tracking-[0.3px]">
    {children}
  </p>
);

/* ---------- Interactive default ---------- */

export const Default: Story<{
  checked: boolean;
  disabled: boolean;
  label: string;
  description: string;
  showLabel: boolean;
  showDescription: boolean;
  labelPosition: "left" | "right";
}> = ({
  checked,
  disabled,
  label,
  description,
  showLabel,
  showDescription,
  labelPosition,
}) => (
  <Switch
    checked={checked}
    disabled={disabled}
    label={showLabel ? label : undefined}
    description={showLabel && showDescription ? description : undefined}
    labelPosition={labelPosition}
    onChange={() => {}}
  />
);

Default.args = {
  checked: false,
  disabled: false,
  label: "Label",
  description: "Description text goes here",
  showLabel: true,
  showDescription: true,
  labelPosition: "left",
};

/* ---------- Individual stories ---------- */

export const Off: Story = () => (
  <Switch checked={false} onChange={() => {}} />
);

export const On: Story = () => (
  <Switch checked onChange={() => {}} />
);

export const DisabledOff: Story = () => (
  <Switch checked={false} disabled onChange={() => {}} />
);

export const DisabledOn: Story = () => (
  <Switch checked disabled onChange={() => {}} />
);

/* ---------- With label ---------- */

export const WithLabelOff: Story = () => (
  <Switch
    checked={false}
    label="Label"
    description="Description text goes here"
    onChange={() => {}}
  />
);

export const WithLabelOn: Story = () => (
  <Switch
    checked
    label="Label"
    description="Description text goes here"
    onChange={() => {}}
  />
);

export const LabelRight: Story = () => (
  <div className="flex flex-col gap-6">
    <Switch
      checked={false}
      label="Label"
      description="Description text goes here"
      labelPosition="right"
      onChange={() => {}}
    />
    <Switch
      checked
      label="Label"
      description="Description text goes here"
      labelPosition="right"
      onChange={() => {}}
    />
  </div>
);

/* ---------- Complete matrix ---------- */

export const AllVariants: Story = () => (
  <div className="flex flex-col gap-10 p-6">
    {/* Switch only */}
    <div>
      <SectionLabel>Switch — Enabled</SectionLabel>
      <div className="mt-2 flex items-center gap-12">
        <Switch checked={false} onChange={() => {}} />
        <Switch checked onChange={() => {}} />
      </div>
    </div>

    <div>
      <SectionLabel>Switch — Disabled</SectionLabel>
      <div className="mt-2 flex items-center gap-12">
        <Switch checked={false} disabled onChange={() => {}} />
        <Switch checked disabled onChange={() => {}} />
      </div>
    </div>

    {/* With label — position left */}
    <div>
      <SectionLabel>With label — Position Left</SectionLabel>
      <div className="mt-2 flex items-start gap-12">
        <Switch checked={false} label="Label" description="Description text goes here" onChange={() => {}} />
        <Switch checked label="Label" description="Description text goes here" onChange={() => {}} />
      </div>
    </div>

    <div>
      <SectionLabel>With label — Position Right</SectionLabel>
      <div className="mt-2 flex items-start gap-12">
        <Switch checked={false} label="Label" description="Description text goes here" labelPosition="right" onChange={() => {}} />
        <Switch checked label="Label" description="Description text goes here" labelPosition="right" onChange={() => {}} />
      </div>
    </div>

    <div>
      <SectionLabel>With label — Disabled</SectionLabel>
      <div className="mt-2 flex items-start gap-12">
        <Switch checked={false} disabled label="Label" description="Description text goes here" onChange={() => {}} />
        <Switch checked disabled label="Label" description="Description text goes here" onChange={() => {}} />
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
        <Switch checked={false} onChange={() => {}} />
        <Switch checked onChange={() => {}} />
      </div>
      <div className="flex items-center gap-12">
        <Switch checked={false} disabled onChange={() => {}} />
        <Switch checked disabled onChange={() => {}} />
      </div>
      <div className="flex items-start gap-12">
        <Switch checked={false} label="Label" description="Description text goes here" onChange={() => {}} />
        <Switch checked label="Label" description="Description text goes here" onChange={() => {}} />
      </div>
    </div>
  </DarkWrapper>
);

export default {
  title: "Components / Switch",
};
