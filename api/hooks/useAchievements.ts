import { useQuery } from "@tanstack/react-query";
import { Achievement } from "../types";
import { API_URL } from "@/lib/api";

export function useAchievements() {
  const { data, isLoading, error } = useQuery<Achievement[]>({
    queryKey: ["/achievements"],
  });

  return {
    achievements:
      data &&
      data.map((achievement) => ({
        ...achievement,
        image: `${API_URL}/${achievement.image}`,
      })),
    achievementsLoading: isLoading,
    achievementsError: error,
  };
}
