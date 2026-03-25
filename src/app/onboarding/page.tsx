"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarNav, type NavItem } from "@/components/ui/sidebar-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, UserMultiple, Settings, ImageCopy } from "@carbon/icons-react";
import { PricingQuickProposal, Finance } from "@carbon/icons-react";

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <Home size={16} />, href: "/dashboard", active: true },
  { label: "Users", icon: <UserMultiple size={16} />, href: "/users" },
  { label: "Transactions", icon: <PricingQuickProposal size={16} />, href: "/transactions" },
  { label: "Customers", icon: <Finance size={16} />, href: "/customers" },
  { label: "Settings", icon: <Settings size={16} />, href: "/settings" },
];

const Logo = () => <img src="/images/acme-bank-logo.png" alt="ACME BANK" className="h-5" />;

const steps = ["Manager users", "Invite customers", "View Transactions"];

const placeholderColors = [
  "bg-[var(--background-secondary)]",
  "bg-[var(--bg-badge-blue)]",
  "bg-[var(--bg-badge-green)]",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Progress line width: 0% at step 0, 50% at step 1, 100% at step 2
  const progressWidth = activeStep === 0 ? "0%" : activeStep === 1 ? "50%" : "100%";

  return (
    <div className="flex h-screen bg-[var(--background-secondary)]">
      {/* Sidebar */}
      <SidebarNav
        variant="classic"
        items={navItems}
        logo={<Logo />}
        showFooter={false}
        onToggle={() => {}}
        className="bg-gradient-to-r from-[#f2f2f4] to-[#f9f8f6] border-r border-[var(--border-subtle)] shrink-0"
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Content area */}
        <main className="flex-1 overflow-auto p-[var(--padding-3xl)] bg-[var(--background-primary)] m-[var(--padding-xl)] rounded-[var(--radius-lg)]">
          <div className="max-w-[640px] mx-auto pt-[var(--padding-4xl)]">
            {/* Heading */}
            <h1 className="font-[family-name:var(--family-headings),serif] font-[var(--weight-regular)] text-[length:32px] leading-[40px] tracking-[-0.3px] text-[color:var(--content-primary)] mb-[var(--padding-xl)]">
              Welcome to 24/7 payments
            </h1>

            {/* Body text */}
            <div className="flex flex-col gap-[var(--padding-3xl)] mb-[var(--padding-3xl)]">
              <div className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-regular)] leading-[24px] text-[color:var(--content-secondary)]">
                <p className="mb-6">
                  This is your admin portal for managing always-on banking for your business customers.
                </p>
                <p>
                  From here you can onboard customers, manage your team, and monitor activity.
                </p>
              </div>

              {/* Animated step indicator */}
              <div className="relative flex items-center w-full">
                {/* Dashed line — full width, behind everything */}
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-[var(--border-subtle)]" />

                {/* Orange progress line — on top of dashed line */}
                <div
                  className="absolute top-1/2 left-0 h-[2px] bg-[#D4A017] -translate-y-1/2 transition-all duration-[2500ms] ease-linear"
                  style={{ width: progressWidth }}
                />

                {/* Step labels */}
                <div className="relative flex items-center justify-between w-full">
                  {steps.map((step, i) => (
                    <span
                      key={step}
                      className={cn(
                        "font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-medium)] text-[length:var(--size-button)] leading-[var(--line-height-small-text)] uppercase whitespace-nowrap px-1",
                        "bg-[var(--background-primary)]",
                        "transition-colors duration-300",
                        activeStep >= i
                          ? "text-[color:var(--content-primary)]"
                          : "text-[color:var(--content-secondary)]"
                      )}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Placeholder area — color shifts per step */}
            <div
              className={cn(
                "flex items-center justify-center w-full h-[240px] border-[0.5px] border-[var(--border-subtle)] rounded-[var(--radius-lg)] mb-[var(--padding-3xl)]",
                "transition-colors duration-700",
                placeholderColors[activeStep]
              )}
            >
              <ImageCopy size={32} className="text-[color:var(--content-secondary)] opacity-40" />
            </div>

            {/* Get Started button */}
            <div className="flex justify-end">
              <Button variant="primary" size="lg" onClick={() => router.push("/dashboard")}>
                Get Started
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
