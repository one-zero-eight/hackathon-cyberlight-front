import { useQuery } from "@tanstack/react-query";
import { AccountInfo } from "../types";
import { API_URL } from "@/lib/api";

export function useAccountInfo() {
  const { data, isLoading, error } = useQuery<AccountInfo>({
    queryKey: ["/personal_account"],
  });

  const account: AccountInfo | undefined = data
    ? {
        ...data,
        achievements: data.achievements.map((achievement) => ({
          ...achievement,
          image: `${API_URL}/${achievement.image}`,
        })),
      }
    : undefined;

  return {
    account,
    accountLoading: isLoading,
    accountError: error,
  };
}
