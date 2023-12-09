import { AccountInfo } from "@/lib/types";

export type Lesson = {
  id: number;
  difficulty: number;
  alias: string;
  title?: string;
  content?: string;
  tasks: Task[];
  condition_type: "nothing" | "min_level" | "reward" | "battlepass";
  recommended_level?: number;
  min_level?: number;
  reward_id?: number;
  battlepass_id?: number;
};

export type Task = {
  id: number;
  reward?: number;
  title?: string;
  alias: string;
  content: string;
  type: "empty" | "instant" | "radio" | "multichoice" | "input";
  choices?: string[];
  correct_choices?: number[];
  input_answers?: string[];
  exp?: number;
};

export function isAvailable(lesson: Lesson, account?: AccountInfo) {
  if (lesson.condition_type === "nothing") {
    return true;
  }

  if (lesson.condition_type === "min_level" && account) {
    return account.total_exp >= lesson.min_level!;
  }

  if (lesson.condition_type === "reward" && account) {
    return account.rewards.find((r) => r.id === lesson.reward_id) !== undefined;
  }

  if (lesson.condition_type === "battlepass" && account) {
    return false;
  }

  return false;
}
