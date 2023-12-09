export type AccountInfo = {
  user_id: number;
  achievements: Achievement[];
};

export type Achievement = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type AchievementDetailed = {
  achievement: Achievement;
  percent: number;
};
