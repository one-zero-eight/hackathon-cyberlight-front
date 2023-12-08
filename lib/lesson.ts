export type Lesson = {
  id: number;
  difficulty: number;
  alias: string;
  title?: string;
  content?: string;
  tasks: Task[];
};

export type Task = {
  id: number;
  reward?: number;
  title?: string;
  alias: string;
  content: string;
  type: "empty" | "instant" | "radio" | "multichoice" | "input";
  choices?: string[];
  correct_choices?: string[];
  input_answers?: string[];
};
