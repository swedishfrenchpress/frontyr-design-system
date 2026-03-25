export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--background-secondary)] overflow-hidden relative">
      {/* Left side */}
      <div className="relative flex flex-col w-[46%] shrink-0 h-full">
        {/* ACME BANK logo */}
        <div className="flex items-center px-6 pt-6">
          <img src="/images/acme-bank-logo.png" alt="ACME BANK" className="h-5" />
        </div>

        {/* Page content — vertically centered */}
        <div className="flex-1 flex items-center px-[calc(7.69%+21px)]">
          <div className="w-[420px]">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="px-[calc(7.69%+21px)] pb-10">
          <p className="font-[family-name:var(--family-labels-links),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-super-tiny)] leading-[var(--line-height-small-text)] uppercase text-[color:var(--content-secondary)]">
            Need help logging in?{" "}
            <span className="text-[color:var(--content-primary)] font-[var(--weight-medium)]">
              contact support.
            </span>
          </p>
        </div>
      </div>

      {/* Right side — white panel */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[720px] h-[900px] rounded-[var(--radius-lg)] bg-[var(--background-primary)] shadow-[var(--shadows-elevation1)] overflow-hidden">
        <div className="flex flex-col gap-[var(--padding-3xl)] p-12 pt-14">
          {/* Marketing headings */}
          <div className="flex flex-col gap-[var(--padding-3xl)] w-[528px]">
            <div className="font-[family-name:var(--family-headings),serif] font-[var(--weight-regular)] text-[length:32px] leading-[40px] tracking-[-0.3px] text-[color:var(--content-primary)]">
              <p>Move dollars instantly, 24/7.</p>
              <p>Settle in USDC across major networks.</p>
            </div>
            <p className="font-[family-name:var(--family-body),sans-serif] font-[var(--weight-regular)] text-[length:var(--size-regular)] leading-[24px] text-[color:var(--content-secondary)]">
              24/7 banking connects your accounts to always-on stablecoin rails, so payments clear in seconds, not business days.
              <br /><br />
              No banking hours.<br />
              No batch windows.<br />
              Just money that moves when you need it to.
            </p>
          </div>

          {/* Dashboard preview */}
          <div className="relative w-[938px] h-[595px]">
            <img
              src="/images/dashboard-preview.png"
              alt="Dashboard preview"
              className="w-full h-full object-cover"
            />
            {/* Gradient fade */}
            <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-b from-transparent to-[var(--background-secondary)] backdrop-blur-[2px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
