export type Reward = {
  id: number;
  name: string;
  content: string;
  type: "none" | "xp" | "item";
  image?: string;
};
