import type { Story } from "@ladle/react";
import * as React from "react";
import { useState } from "react";
import { Modal } from "./modal";
import { Button } from "./button";

/* ---------- Interactive default ---------- */

export const Default: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="px-[var(--padding-2xl)] pt-[var(--padding-2xl)]">
          <h2 className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-semibold)] text-[length:18px] leading-[24px] text-[color:var(--content-primary)] mb-1">
            Modal title
          </h2>
          <p className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-secondary)]">
            This is a reusable modal component with a blurred overlay.
          </p>
        </div>
        <div className="px-[var(--padding-2xl)] py-[var(--padding-xl)]">
          <p className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-primary)]">
            Modal content goes here. Click the overlay or the cancel button to close.
          </p>
        </div>
        <div className="flex items-center justify-end gap-[var(--padding-md)] px-[var(--padding-2xl)] py-[var(--padding-xl)]">
          <Button variant="secondary" size="lg" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" size="lg">Confirm</Button>
        </div>
      </Modal>
    </div>
  );
};

/* ---------- Custom width ---------- */

export const WideModal: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Button variant="secondary" size="lg" onClick={() => setOpen(true)}>
        Open wide modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} width="720px">
        <div className="p-[var(--padding-2xl)]">
          <h2 className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-semibold)] text-[length:18px] leading-[24px] text-[color:var(--content-primary)] mb-[var(--padding-md)]">
            Wide modal
          </h2>
          <p className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-small)] text-[color:var(--content-secondary)]">
            This modal uses a custom width of 720px.
          </p>
        </div>
        <div className="flex items-center justify-end gap-[var(--padding-md)] px-[var(--padding-2xl)] pb-[var(--padding-2xl)]">
          <Button variant="secondary" size="lg" onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default {
  title: "Components / Modal",
};
