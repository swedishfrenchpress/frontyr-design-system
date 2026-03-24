"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-[var(--padding-9xl)]">
      {/* Form section */}
      <div className="flex flex-col gap-[var(--padding-4xl)]">
        {/* Heading */}
        <h1 className="font-[family-name:var(--family-headings),serif] font-[var(--weight-regular)] text-[length:32px] leading-[40px] tracking-[-0.3px] text-[color:var(--content-primary)]">
          Sign in to Acme 24/7 Banking
        </h1>

        {/* Form controls */}
        <div className="flex flex-col gap-[var(--padding-xl)] items-center w-full">
          {/* Google sign-in */}
          <button className="flex items-center justify-center gap-[var(--padding-md)] w-full h-[32px] px-[var(--padding-lg)] py-[var(--padding-md)] rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--background-primary)] cursor-pointer transition-[background-color] duration-300 hover:bg-[var(--input-hover-dark)]">
            <img src="/images/google-icon.svg" alt="" className="size-4" />
            <span className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-button)] leading-[15px] text-[color:var(--content-primary)]">
              Sign in with Google
            </span>
          </button>

          {/* OR separator */}
          <p className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-super-tiny)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-primary)] text-center w-full">
            or
          </p>

          {/* Email input */}
          <TextInput
            placeholder="satoshi@acmebank.com"
            size="md"
          />

          {/* Continue button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => router.push("/login/check-inbox")}
          >
            Continue with email
          </Button>
        </div>
      </div>

      {/* Legal text */}
      <p className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-super-tiny)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-secondary)]">
        By continuing, you agree to Acme Bank&apos;s{" "}
        <span className="text-[color:var(--content-primary)] font-[var(--weight-medium)]">Consumer Terms</span>
        {" "}and{" "}
        <span className="text-[color:var(--content-primary)] font-[var(--weight-medium)]">usage policy</span>
        , and acknowledge their{" "}
        <span className="text-[color:var(--content-primary)] font-[var(--weight-medium)]">privacy policy.</span>
      </p>
    </div>
  );
}
