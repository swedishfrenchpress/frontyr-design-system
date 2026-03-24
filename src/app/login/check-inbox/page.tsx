"use client";

import { Button } from "@/components/ui/button";
import { Renew } from "@carbon/icons-react";

/** Dark dot loader — 3x3 grid with varying opacity, 8px squares */
function DotLoaderDark() {
  const opacities = [0.1, 0.4, 1, 0.4, 0.1, 0.4, 0.1, 0.4, 0.1];
  return (
    <span className="inline-grid grid-cols-3 p-2 shrink-0">
      {opacities.map((op, i) => (
        <span
          key={i}
          className="size-2 bg-[var(--content-primary)]"
          style={{ opacity: op }}
        />
      ))}
    </span>
  );
}

export default function CheckInboxPage() {
  return (
    <div className="flex flex-col gap-[var(--padding-xl)]">
      {/* Top section */}
      <div className="flex flex-col gap-[var(--padding-4xl)]">
        {/* Instructions */}
        <div className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-regular)] leading-[24px] text-[color:var(--content-primary)]">
          <p>We&apos;ve sent you a magic link to jason@grazianos.com.</p>
          <p>Click the link to continue.</p>
        </div>

        {/* Loader + heading */}
        <div className="flex items-center gap-[var(--padding-lg)]">
          <DotLoaderDark />
          <h1 className="font-[family-name:var(--family-headings),serif] font-[var(--weight-regular)] text-[length:32px] leading-[40px] tracking-[-0.3px] text-[color:var(--content-primary)]">
            Please check your inbox
          </h1>
        </div>
      </div>

      {/* Send again button */}
      <Button
        variant="secondary"
        size="lg"
        buttonType="text-icon"
        icon={<Renew size={16} />}
        className="self-start"
      >
        Send again
      </Button>
    </div>
  );
}
