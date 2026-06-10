"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Question } from "@/lib/types";
import { prepareQuizQuestions } from "@/lib/quiz-utils";

interface QuizClientProps {
  subjectSlug: string;
  subjectName: string;
  sectionNumber: number;
  questions: Question[];
}

export default function QuizClient({
  subjectSlug,
  subjectName,
  sectionNumber,
  questions,
}: QuizClientProps) {
  const [quizKey, setQuizKey] = useState(0);

  const quizQuestions = useMemo(
    () => prepareQuizQuestions(questions),
    [questions, quizKey]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(quizQuestions.length).fill(null)
  );
  const [isFinished, setIsFinished] = useState(false);

  const current = quizQuestions[currentIndex];
  const total = quizQuestions.length;
  const progress = ((currentIndex + (isFinished ? 1 : 0)) / total) * 100;

  function handleRetry() {
    setQuizKey((k) => k + 1);
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers(new Array(questions.length).fill(null));
    setIsFinished(false);
  }

  function handleSelect(originalIndex: number) {
    if (selectedOption !== null) return;
    setSelectedOption(originalIndex);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = originalIndex;
      return next;
    });
  }

  function handleNext() {
    if (currentIndex < total - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedOption(answers[nextIndex]);
    } else {
      setIsFinished(true);
    }
  }

  const correctCount = answers.filter(
    (ans, i) => ans === quizQuestions[i].question.correct
  ).length;
  const wrongCount = total - correctCount;
  const percentage = Math.round((correctCount / total) * 100);

  if (isFinished) {
    const isGood = percentage >= 70;

    return (
      <div className="animate-fade-up px-1 sm:px-0">
        <h2 className="text-center text-xl font-extrabold text-[var(--color-text)] sm:text-2xl">
          Natija
        </h2>
        <p className="mt-1 text-center text-sm text-[var(--color-muted)] sm:text-base">
          {subjectName} · Bo&apos;lim {sectionNumber}
        </p>

        <div
          className={`mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full sm:h-28 sm:w-28 ${
            isGood ? "bg-[var(--color-primary-light)]" : "bg-amber-50"
          }`}
        >
          <span
            className={`text-2xl font-extrabold sm:text-3xl ${
              isGood ? "text-[var(--color-primary)]" : "text-amber-600"
            }`}
          >
            {percentage}%
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center sm:p-4">
            <p className="text-xl font-extrabold text-green-700 sm:text-2xl">
              {correctCount}
            </p>
            <p className="mt-0.5 text-xs text-green-600 sm:text-sm">
              To&apos;g&apos;ri
            </p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center sm:p-4">
            <p className="text-xl font-extrabold text-red-600 sm:text-2xl">
              {wrongCount}
            </p>
            <p className="mt-0.5 text-xs text-red-500 sm:text-sm">
              Noto&apos;g&apos;ri
            </p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-center sm:p-4">
            <p className="text-xl font-extrabold text-[var(--color-primary)] sm:text-2xl">
              {total}
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-muted)] sm:text-sm">
              Jami
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="min-h-12 w-full rounded-xl bg-[var(--color-primary)] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)] active:scale-[0.98]"
          >
            Qayta urinish
          </button>
          <Link
            href="/"
            className="flex min-h-12 w-full items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-3 text-base font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] active:scale-[0.98]"
          >
            Bosh sahifa
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-1 sm:px-0">
      <p className="mb-1 truncate text-center text-xs text-[var(--color-muted)] sm:text-sm">
        {subjectName}
      </p>

      <div className="mb-4 flex items-center justify-center">
        <span className="rounded-full bg-[var(--color-primary-light)] px-4 py-1.5 text-base font-bold text-[var(--color-primary)] sm:text-lg">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-[var(--color-border)] sm:mb-6">
        <div
          className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="animate-fade-up mb-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-sm sm:mb-6 sm:p-6">
        <p className="text-sm leading-relaxed font-semibold text-[var(--color-text)] sm:text-base">
          {current.question.question}
        </p>
      </div>

      <div className="flex flex-col gap-2.5 sm:gap-3">
        {current.shuffledOptions.map((option) => {
          const isSelected = selectedOption === option.originalIndex;
          const isCorrect =
            option.originalIndex === current.question.correct;
          const showResult = selectedOption !== null;

          let optionStyle =
            "border-[var(--color-border)] bg-[var(--color-card)] active:border-[var(--color-primary)]";

          if (showResult) {
            if (isCorrect) {
              optionStyle = "border-green-500 bg-green-50 text-green-900";
            } else if (isSelected && !isCorrect) {
              optionStyle = "border-red-500 bg-red-50 text-red-900";
            } else {
              optionStyle =
                "border-[var(--color-border)] bg-[var(--color-card)] opacity-50";
            }
          }

          return (
            <button
              key={option.label}
              type="button"
              disabled={selectedOption !== null}
              onClick={() => handleSelect(option.originalIndex)}
              className={`flex w-full min-h-12 items-start gap-3 rounded-xl border-2 px-3 py-3 text-left transition-all sm:px-4 sm:py-3.5 ${optionStyle} ${
                selectedOption === null ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  showResult && isCorrect
                    ? "bg-green-500 text-white"
                    : showResult && isSelected && !isCorrect
                      ? "bg-red-500 text-white"
                      : "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                }`}
              >
                {option.label}
              </span>
              <span className="pt-1 text-sm leading-relaxed sm:text-base">
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className="animate-fade-up mt-5 sm:mt-6">
          <button
            type="button"
            onClick={handleNext}
            className="min-h-12 w-full rounded-xl bg-[var(--color-primary)] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)] active:scale-[0.98] sm:w-auto sm:float-right"
          >
            {currentIndex < total - 1 ? "Keyingi savol" : "Natijani ko'rish"}
          </button>
          <div className="clear-both" />
        </div>
      )}
    </div>
  );
}
