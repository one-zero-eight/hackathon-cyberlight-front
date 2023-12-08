export type Lesson = {
  id: number;
  difficulty: number;
  tasks: Task[];
};

export type Task = {
  id: number;
  reward?: number;
  content: string;
  type: "empty" | "instant" | "radio" | "multichoice" | "input";
  choices?: string[];
  correct_choices?: string[];
  input_answers?: string[];
};
