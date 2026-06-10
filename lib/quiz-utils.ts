import type { Question, QuizQuestion, ShuffledOption } from "./types";

const LABELS = ["A", "B", "C", "D"] as const;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function prepareQuizQuestions(questions: Question[]): QuizQuestion[] {
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.map((question) => {
    const indexed = question.options.map((text, originalIndex) => ({
      text,
      originalIndex,
    }));
    const shuffled = shuffleArray(indexed);
    const shuffledOptions: ShuffledOption[] = shuffled.map((opt, i) => ({
      label: LABELS[i],
      text: opt.text,
      originalIndex: opt.originalIndex,
    }));
    return { question, shuffledOptions };
  });
}
