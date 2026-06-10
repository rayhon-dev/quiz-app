import SubjectCard from "@/components/SubjectCard";
import { getSubjects } from "@/lib/questions";

export default function HomePage() {
  const subjects = getSubjects();

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-extrabold text-[var(--color-text)] sm:text-2xl">
          Fanlarni tanlang
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)] sm:text-base">
          Test topshirish uchun fanni tanlang
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {subjects.map((subject, index) => (
          <SubjectCard
            key={subject.slug}
            name={subject.name}
            slug={subject.slug}
            count={subject.count}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
