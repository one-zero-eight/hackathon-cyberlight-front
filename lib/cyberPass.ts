import { useAccountInfo } from "@/api/hooks/useAccountInfo";
import { useQuery } from "@tanstack/react-query";

export type PersonalCyberPass = {
  experience: number;
  battle_pass_id: number;
  personal_account_id: number;
};

export type CyberPass = {
  id: number;
  is_active: boolean;
  levels: CyberPassLevel[];
};

export type CyberPassLevel = {
  id: number;
  experience: number;
  value: number;
  rewards: CyberPassReward[];
};

export type CyberPassReward = {
  id: number;
  type: "none" | "xp" | "item";
  name: string;
  content: string;
  image?: string;
};

export function useCyberPass() {
  const { account } = useAccountInfo();
  const { data } = useQuery<PersonalCyberPass>({
    queryKey: ["/personal_account/battle-passes/"],
  });
  const { data: cyberPasses } = useQuery<CyberPass[]>({
    queryKey: ["/battle-passes/"],
  });
  const currentCyberPass = cyberPasses?.find(
    (pass) => pass.id === data?.battle_pass_id,
  );

  if (!account || !data || !currentCyberPass) {
    return {
      currentCyberPass: undefined,
      currentLevel: undefined,
      progress: undefined,
    };
  }

  const currentLevel = currentCyberPass.levels.find(
    (level) => level.experience <= data.experience,
  );

  if (!currentLevel) {
    return {
      currentCyberPass,
      currentLevel: undefined,
      progress: undefined,
    };
  }

  const progress =
    (data.experience - currentLevel.experience) /
    (currentLevel.experience -
      currentCyberPass.levels[currentCyberPass.levels.length - 1].experience);

  return {
    currentCyberPass,
    currentLevel,
    progress,
  };
}
