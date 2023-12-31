import { API_URL } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AchievementDetailed } from "./types";

export function useAchievements() {
  const { data, isLoading, error } = useQuery<AchievementDetailed[]>({
    queryKey: ["/achievements"],
  });

  return {
    achievements:
      data &&
      data.map((info) => ({
        ...info,
        achievement: {
          ...info.achievement,
          image: `${API_URL}/${info.achievement.image}`,
        },
      })),
    achievementsLoading: isLoading,
    achievementsError: error,
  };
}
