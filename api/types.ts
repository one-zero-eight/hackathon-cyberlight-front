export type AccountInfo = {
  user_id: number;
  achievements: Achievement[];
  total_exp: number;
  rewards: any[];
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
