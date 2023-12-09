import { useAccountInfo } from "@/api/hooks/useAccountInfo";
import { useQuery } from "@tanstack/react-query";

export type PersonalCyberPass = {
  experience: number;
  battle_pass_id: number;
  personal_account_id: number;
};

export type CyberPass = {
  id: number;
  name: string;
  date_start: string;
  is_active: boolean;
  levels: CyberPassLevel[];
};

export type CyberPassLevel = {
  id: number;
  battle_pass_id: number;
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
    queryKey: ["/personal_account/battle-pass"],
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
      currentLevelValue: undefined,
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
      currentLevelValue: 0,
      progress: 0,
    };
  }

  const progress =
    (data.experience - currentLevel.experience) /
    (currentLevel.experience -
      currentCyberPass.levels[currentCyberPass.levels.length - 1].experience);

  return {
    currentCyberPass,
    currentLevel,
    currentLevelValue: currentLevel.value,
    progress,
  };
}
