import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useListStore } from "@/store/useListStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  const itemCount = useListStore((state) => state.items.length);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 backdrop-blur bg-[var(--bg)]/90 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="text-base sm:text-lg font-semibold text-[var(--text-h)] no-underline"
          >
            Influencer Search
          </Link>
          <Link
            to="/list"
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[var(--border)] text-sm text-[var(--text-h)] no-underline hover:border-[var(--accent-border)] hover:text-[var(--accent)] transition-colors"
          >
            My List
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[var(--accent)] text-white text-xs">
              {itemCount}
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {title && (
          <div className="mb-8 text-center">
            <h1 className="!text-3xl sm:!text-5xl">{title}</h1>
            {subtitle && (
              <p className="text-[var(--text)] mt-2 text-sm sm:text-base">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}