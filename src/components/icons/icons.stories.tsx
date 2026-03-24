import type { Story } from "@ladle/react";
import * as React from "react";
import * as CarbonIcons from "@carbon/icons-react";

// Get all icon components (start with uppercase, skip the base "Icon" component)
const allIconEntries = Object.entries(CarbonIcons).filter(
  ([name, component]) =>
    /^[A-Z]/.test(name) &&
    name !== "Icon" &&
    typeof component === "object"
) as [string, React.ComponentType<{ size?: number }>][];

/* ---------- Searchable gallery ---------- */

export const IconGallery: Story = () => {
  const [search, setSearch] = React.useState("");
  const [size, setSize] = React.useState(20);
  const [copied, setCopied] = React.useState("");

  const filtered = search
    ? allIconEntries.filter(([name]) =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    : allIconEntries.slice(0, 200);

  const copyName = (name: string) => {
    navigator.clipboard.writeText(`import { ${name} } from "@carbon/icons-react";`);
    setCopied(name);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div>
      {/* Search + size controls */}
      <div className="flex items-center gap-[var(--padding-lg)] mb-[var(--padding-xl)] sticky top-0 bg-[var(--background-primary)] py-[var(--padding-md)] z-10">
        <div className="flex items-center gap-[var(--padding-md)] flex-1 h-10 px-[var(--padding-lg)] rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--background-primary)]">
          <CarbonIcons.Search size={16} className="text-[color:var(--content-icon)] shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${allIconEntries.length} icons...`}
            className="flex-1 bg-transparent outline-none font-[family-name:var(--family-body),sans-serif] text-[length:var(--size-small)] text-[color:var(--content-primary)] placeholder:text-[color:var(--content-secondary)]"
          />
          {search && (
            <button onClick={() => setSearch("")} className="cursor-pointer text-[color:var(--content-icon)]">
              <CarbonIcons.Close size={16} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-[var(--padding-sm)]">
          {[16, 20, 24, 32].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-[var(--padding-md)] py-[var(--padding-xs)] rounded-[var(--radius-sm)] text-[length:var(--size-super-tiny)] font-[family-name:var(--family-labels-links),sans-serif] uppercase cursor-pointer transition-colors ${
                size === s
                  ? "bg-[var(--content-primary)] text-[color:var(--content-on-primary)]"
                  : "bg-[var(--background-secondary)] text-[color:var(--content-secondary)] hover:bg-[var(--input-hover-dark)]"
              }`}
            >
              {s}px
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="font-[family-name:var(--family-body),sans-serif] text-[length:var(--size-button)] text-[color:var(--content-secondary)] mb-[var(--padding-lg)]">
        {search
          ? `${filtered.length} icons matching "${search}"`
          : `Showing first 200 of ${allIconEntries.length} icons — search to find more`}
      </p>

      {/* Icon grid */}
      <div className="flex flex-wrap gap-1">
        {filtered.map(([name, IconComponent]) => (
          <button
            key={name}
            onClick={() => copyName(name)}
            className="flex flex-col items-center gap-[var(--padding-sm)] p-[var(--padding-md)] rounded-[var(--radius-sm)] hover:bg-[var(--background-secondary)] transition-colors w-[88px] cursor-pointer"
            title={`Click to copy import for ${name}`}
          >
            <IconComponent size={size} />
            <span className={`text-[9px] text-center truncate w-full font-[family-name:var(--family-body),sans-serif] ${
              copied === name ? "text-[color:var(--content-success)]" : "text-[color:var(--content-secondary)]"
            }`}>
              {copied === name ? "Copied!" : name}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[color:var(--content-secondary)] text-[length:var(--size-small)] font-[family-name:var(--family-body),sans-serif]">
          No icons found for &quot;{search}&quot;
        </p>
      )}
    </div>
  );
};

/* ---------- Size comparison ---------- */

export const Sizes: Story = () => {
  const icons = [
    CarbonIcons.Add,
    CarbonIcons.Search,
    CarbonIcons.Close,
    CarbonIcons.ChevronRight,
    CarbonIcons.Settings,
    CarbonIcons.User,
  ];

  return (
    <div className="flex flex-col gap-[var(--padding-2xl)] p-[var(--padding-xl)]">
      {[16, 20, 24, 32].map((size) => (
        <div key={size}>
          <p className="font-[family-name:var(--family-labels-links),sans-serif] text-[length:var(--size-super-tiny)] text-[color:var(--content-secondary)] uppercase mb-[var(--padding-md)]">
            {size}px
          </p>
          <div className="flex items-center gap-[var(--padding-xl)]">
            {icons.map((Icon, i) => (
              <Icon key={i} size={size} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------- Color tokens ---------- */

export const Colors: Story = () => (
  <div className="flex items-center gap-[var(--padding-2xl)] p-[var(--padding-xl)]">
    <div className="flex flex-col items-center gap-[var(--padding-sm)]">
      <CarbonIcons.Add size={24} className="text-[color:var(--content-primary)]" />
      <span className="text-[9px] text-[color:var(--content-secondary)]">primary</span>
    </div>
    <div className="flex flex-col items-center gap-[var(--padding-sm)]">
      <CarbonIcons.Add size={24} className="text-[color:var(--content-secondary)]" />
      <span className="text-[9px] text-[color:var(--content-secondary)]">secondary</span>
    </div>
    <div className="flex flex-col items-center gap-[var(--padding-sm)]">
      <CarbonIcons.Add size={24} className="text-[color:var(--content-disabled)]" />
      <span className="text-[9px] text-[color:var(--content-secondary)]">disabled</span>
    </div>
    <div className="flex flex-col items-center gap-[var(--padding-sm)]">
      <CarbonIcons.Add size={24} className="text-[color:var(--content-accent)]" />
      <span className="text-[9px] text-[color:var(--content-secondary)]">accent</span>
    </div>
    <div className="flex flex-col items-center gap-[var(--padding-sm)]">
      <CarbonIcons.Add size={24} className="text-[color:var(--content-attention)]" />
      <span className="text-[9px] text-[color:var(--content-secondary)]">attention</span>
    </div>
    <div className="flex flex-col items-center gap-[var(--padding-sm)]">
      <CarbonIcons.Add size={24} className="text-[color:var(--content-success)]" />
      <span className="text-[9px] text-[color:var(--content-secondary)]">success</span>
    </div>
  </div>
);

export default {
  title: "Foundation / Icons",
};
