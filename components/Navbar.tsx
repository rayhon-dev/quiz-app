import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-card)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-3xl items-center px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-dark)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-sm font-extrabold sm:h-9 sm:w-9">
            T
          </span>
          <span className="text-base font-bold sm:text-lg">Test savollari</span>
        </Link>
      </div>
    </header>
  );
}
