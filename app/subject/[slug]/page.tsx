import Link from "next/link";
import { notFound } from "next/navigation";
import SectionCard from "@/components/SectionCard";
import {
  getSections,
  getSubjectName,
  getSubjectQuestions,
} from "@/lib/questions";

interface SubjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { slug } = await params;
  const subjectName = getSubjectName(slug);
  const questions = getSubjectQuestions(slug);

  if (!subjectName || !questions) {
    notFound();
  }

  const sections = getSections(questions.length);

  return (
    <div>
      <Link
        href="/"
        className="mb-6 inline-flex items-center text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
      >
        <svg
          className="mr-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Bosh sahifa
      </Link>

      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-extrabold leading-snug text-[var(--color-text)] sm:text-2xl">
          {subjectName}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)] sm:text-base">
          Jami {questions.length} ta savol · {sections.length} ta bo&apos;lim
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {sections.map((section, index) => {
          const questionCount = section.end - section.start + 1;
          return (
            <SectionCard
              key={section.number}
              subjectSlug={slug}
              number={section.number}
              label={section.label}
              questionCount={questionCount}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}
