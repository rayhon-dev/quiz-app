import { readFileSync } from "fs";
import { join } from "path";
import type { Question, QuestionsData } from "./types";

let cachedData: QuestionsData | null = null;

export function getQuestionsData(): QuestionsData {
  if (!cachedData) {
    const filePath = join(process.cwd(), "questions_all.json");
    const raw = readFileSync(filePath, "utf-8");
    cachedData = JSON.parse(raw) as QuestionsData;
  }
  return cachedData;
}

export function getSubjects(): { name: string; slug: string; count: number }[] {
  const data = getQuestionsData();
  return Object.entries(data).map(([name, questions]) => ({
    name,
    slug: encodeSubjectSlug(name),
    count: questions.length,
  }));
}

export function encodeSubjectSlug(name: string): string {
  return Buffer.from(name, "utf-8").toString("base64url");
}

export function decodeSubjectSlug(slug: string): string | null {
  try {
    return Buffer.from(slug, "base64url").toString("utf-8");
  } catch {
    return null;
  }
}

export function getSubjectQuestions(slug: string): Question[] | null {
  const name = decodeSubjectSlug(slug);
  if (!name) return null;
  const data = getQuestionsData();
  return data[name] ?? null;
}

export function getSubjectName(slug: string): string | null {
  return decodeSubjectSlug(slug);
}

export const QUESTIONS_PER_SECTION = 25;

export function getSections(questionCount: number): {
  number: number;
  start: number;
  end: number;
  label: string;
}[] {
  const sectionCount = Math.ceil(questionCount / QUESTIONS_PER_SECTION);
  return Array.from({ length: sectionCount }, (_, i) => {
    const start = i * QUESTIONS_PER_SECTION + 1;
    const end = Math.min((i + 1) * QUESTIONS_PER_SECTION, questionCount);
    return {
      number: i + 1,
      start,
      end,
      label: `Bo'lim ${i + 1}: Savol ${start}–${end}`,
    };
  });
}

export function getSectionQuestions(
  questions: Question[],
  sectionNumber: number
): Question[] {
  const startIndex = (sectionNumber - 1) * QUESTIONS_PER_SECTION;
  return questions.slice(startIndex, startIndex + QUESTIONS_PER_SECTION);
}
