import type { Story } from "@ladle/react";
import * as React from "react";
import { TextInput } from "./text-input";

const SectionLabel = ({ children }: { children: string }) => (
  <p className="font-['Lexend',sans-serif] text-[10px] text-[var(--content-secondary)] uppercase tracking-[0.3px]">
    {children}
  </p>
);

/* ---------- Interactive ---------- */

export const Default: Story<{
  label: string;
  placeholder: string;
  helperText: string;
  size: "md" | "sm";
  disabled: boolean;
  state: "default" | "success" | "error" | "warning";
}> = ({ label, placeholder, helperText, size, disabled, state }) => (
  <div className="w-72">
    <TextInput
      label={label}
      placeholder={placeholder}
      helperText={state === "default" ? helperText : undefined}
      errorText={state === "error" ? "Error message" : undefined}
      successText={state === "success" ? "Success message" : undefined}
      warningText={state === "warning" ? "Warning message" : undefined}
      size={size}
      disabled={disabled}
    />
  </div>
);

Default.args = {
  label: "Label",
  placeholder: "Placeholder",
  helperText: "Helper text",
  size: "md",
  disabled: false,
  state: "default",
};

Default.argTypes = {
  size: { control: { type: "select" }, options: ["md", "sm"] },
  state: {
    control: { type: "select" },
    options: ["default", "success", "error", "warning"],
  },
};

/* ---------- Individual states ---------- */

export const Enabled: Story = () => (
  <div className="w-72">
    <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" />
  </div>
);

export const Filled: Story = () => (
  <div className="w-72">
    <TextInput label="Label" defaultValue="Text" helperText="Helper text" />
  </div>
);

export const Success: Story = () => (
  <div className="w-72">
    <TextInput label="Label" defaultValue="Text" successText="Success message" />
  </div>
);

export const Error: Story = () => (
  <div className="w-72">
    <TextInput label="Label" placeholder="Placeholder" errorText="Error message" />
  </div>
);

export const ErrorFilled: Story = () => (
  <div className="w-72">
    <TextInput label="Label" defaultValue="Text" errorText="Error message" />
  </div>
);

export const Warning: Story = () => (
  <div className="w-72">
    <TextInput label="Label" placeholder="Placeholder" warningText="Warning message" />
  </div>
);

export const WarningFilled: Story = () => (
  <div className="w-72">
    <TextInput label="Label" defaultValue="Text" warningText="Warning message" />
  </div>
);

export const Disabled: Story = () => (
  <div className="w-72">
    <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" disabled />
  </div>
);

/* ---------- Small ---------- */

export const SmallEnabled: Story = () => (
  <div className="w-72">
    <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" size="sm" />
  </div>
);

export const SmallError: Story = () => (
  <div className="w-72">
    <TextInput label="Label" placeholder="Placeholder" errorText="Error message" size="sm" />
  </div>
);

/* ---------- Without label/helper ---------- */

export const WithoutLabel: Story = () => (
  <div className="w-72">
    <TextInput placeholder="No label" helperText="Helper text" />
  </div>
);

export const WithoutHelper: Story = () => (
  <div className="w-72">
    <TextInput label="Label" placeholder="No helper" />
  </div>
);

/* ---------- Dark mode ---------- */

const DarkWrapper = ({ children }: { children: React.ReactNode }) => (
  <div data-theme="dark" className="bg-[var(--background-primary)] text-[color:var(--content-primary)] p-6 rounded-lg">
    {children}
  </div>
);

export const DarkModeVariants: Story = () => (
  <DarkWrapper>
    <div className="flex flex-col gap-6 w-72">
      <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" />
      <TextInput label="Label" defaultValue="Text" helperText="Helper text" />
      <TextInput label="Label" defaultValue="Text" successText="Success message" />
      <TextInput label="Label" placeholder="Placeholder" errorText="Error message" />
      <TextInput label="Label" placeholder="Placeholder" warningText="Warning message" />
      <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" disabled />
    </div>
  </DarkWrapper>
);

/* ---------- Full matrix ---------- */

export const AllVariants: Story = () => (
  <div className="flex gap-12 p-6">
    {/* Medium */}
    <div className="flex flex-col gap-6 w-72">
      <SectionLabel>Medium</SectionLabel>
      <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" />
      <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" />
      <TextInput label="Label" defaultValue="Text" helperText="Helper text" />
      <TextInput label="Label" defaultValue="Text" successText="Success message" />
      <TextInput label="Label" placeholder="Placeholder" errorText="Error message" />
      <TextInput label="Label" defaultValue="Text" errorText="Error message" />
      <TextInput label="Label" placeholder="Placeholder" warningText="Warning message" />
      <TextInput label="Label" defaultValue="Text" warningText="Warning message" />
      <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" disabled />
    </div>
    {/* Small */}
    <div className="flex flex-col gap-6 w-72">
      <SectionLabel>Small</SectionLabel>
      <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" size="sm" />
      <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" size="sm" />
      <TextInput label="Label" defaultValue="Text" helperText="Helper text" size="sm" />
      <TextInput label="Label" defaultValue="Text" successText="Success message" size="sm" />
      <TextInput label="Label" placeholder="Placeholder" errorText="Error message" size="sm" />
      <TextInput label="Label" defaultValue="Text" errorText="Error message" size="sm" />
      <TextInput label="Label" placeholder="Placeholder" warningText="Warning message" size="sm" />
      <TextInput label="Label" defaultValue="Text" warningText="Warning message" size="sm" />
      <TextInput label="Label" placeholder="Placeholder" helperText="Helper text" size="sm" disabled />
    </div>
  </div>
);

export default {
  title: "Components / Text Input",
};
