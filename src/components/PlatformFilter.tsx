import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-8 flex flex-col items-center gap-5">
      <div
        role="tablist"
        aria-label="Filter by platform"
        className="inline-flex flex-wrap justify-center p-1 rounded-full border border-[var(--border)] bg-[var(--social-bg)]"
      >
        {PLATFORMS.map((p) => {
          const isSelected = selected === p;
          const tabClass = isSelected
            ? "px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer bg-[var(--text-h)] text-[var(--bg)]"
            : "px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer text-[var(--text)] hover:text-[var(--text-h)]";
          return (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onChange(p)}
              className={tabClass}
            >
              {getPlatformLabel(p)}
            </button>
          );
        })}
      </div>

      <div className="relative w-full max-w-md">
        <label htmlFor="profile-search" className="sr-only">
          Search by username or name
        </label>
        <input
          id="profile-search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by username or name..."
          className="w-full border border-[var(--border)] bg-[var(--bg)] rounded-full px-4 py-3 text-sm text-[var(--text-h)] placeholder:text-[var(--text)] focus:outline-none focus:border-[var(--accent-border)] focus:ring-2 focus:ring-[var(--accent-bg)] transition"
        />
      </div>
    </div>
  );
}