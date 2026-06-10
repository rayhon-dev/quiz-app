import Link from "next/link";

interface SectionCardProps {
  subjectSlug: string;
  number: number;
  label: string;
  questionCount: number;
  index: number;
}

export default function SectionCard({
  subjectSlug,
  number,
  label,
  questionCount,
  index,
}: SectionCardProps) {
  return (
    <Link
      href={`/quiz/${subjectSlug}/${number}`}
      className="animate-fade-up group flex min-h-14 items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 shadow-sm transition-all active:scale-[0.98] hover:border-[var(--color-primary)] hover:shadow-md sm:px-5 sm:py-4"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div>
        <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] sm:text-base">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-[var(--color-muted)]">
          {questionCount} ta savol
        </p>
      </div>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-sm font-bold text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-white">
        {number}
      </span>
    </Link>
  );
}
