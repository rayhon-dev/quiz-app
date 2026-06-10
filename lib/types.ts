export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  correct_answer: string;
}

export type QuestionsData = Record<string, Question[]>;

export interface ShuffledOption {
  label: "A" | "B" | "C" | "D";
  text: string;
  originalIndex: number;
}

export interface QuizQuestion {
  question: Question;
  shuffledOptions: ShuffledOption[];
}
