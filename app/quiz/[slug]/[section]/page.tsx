import Link from "next/link";
import { notFound } from "next/navigation";
import QuizClient from "@/components/QuizClient";
import {
  getSectionQuestions,
  getSubjectName,
  getSubjectQuestions,
} from "@/lib/questions";

interface QuizPageProps {
  params: Promise<{ slug: string; section: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug, section: sectionParam } = await params;
  const sectionNumber = parseInt(sectionParam, 10);
  const subjectName = getSubjectName(slug);
  const allQuestions = getSubjectQuestions(slug);

  if (
    !subjectName ||
    !allQuestions ||
    isNaN(sectionNumber) ||
    sectionNumber < 1
  ) {
    notFound();
  }

  const questions = getSectionQuestions(allQuestions, sectionNumber);

  if (questions.length === 0) {
    notFound();
  }

  return (
    <div>
      <Link
        href={`/subject/${slug}`}
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
        Bo&apos;limlarga qaytish
      </Link>

      <QuizClient
        key={`${slug}-${sectionNumber}`}
        subjectSlug={slug}
        subjectName={subjectName}
        sectionNumber={sectionNumber}
        questions={questions}
      />
    </div>
  );
}
