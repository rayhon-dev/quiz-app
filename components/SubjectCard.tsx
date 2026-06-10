import Link from "next/link";

interface SubjectCardProps {
  name: string;
  slug: string;
  count: number;
  index: number;
}

export default function SubjectCard({
  name,
  slug,
  count,
  index,
}: SubjectCardProps) {
  return (
    <Link
      href={`/subject/${slug}`}
      className="animate-fade-up group block rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm transition-all active:scale-[0.98] hover:border-[var(--color-primary)] hover:shadow-md sm:p-6"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <h2 className="text-base font-bold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-primary)] sm:text-lg">
        {name}
      </h2>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        {count} ta savol
      </p>
      <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--color-primary)]">
        Boshlash
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
