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
  date_end: string;
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
  const { data: myCyberPass } = useQuery<PersonalCyberPass>({
    queryKey: ["/personal_account/battle-pass"],
  });
  const { data: cyberPasses } = useQuery<CyberPass[]>({
    queryKey: ["/battle-passes/"],
  });
  const currentCyberPass = cyberPasses?.find(
    (pass) => pass.id === myCyberPass?.battle_pass_id,
  );

  if (
    !account ||
    !myCyberPass ||
    !currentCyberPass ||
    currentCyberPass.levels.length < 1
  ) {
    return {
      currentCyberPass: undefined,
      currentLevelIdx: undefined,
      currentLevel: undefined,
      currentLevelProgress: undefined,
    };
  }

  const levelsTotal = currentCyberPass.levels.length;
  let currentLevelIdx = 0;
  for (let i = 0; i < levelsTotal; i++) {
    if (myCyberPass.experience < currentCyberPass.levels[i].experience) {
      currentLevelIdx = i;
      break;
    }
  }
  const currentLevel = currentCyberPass.levels[currentLevelIdx];

  if (myCyberPass.experience >= currentLevel.experience) {
    currentLevelIdx = levelsTotal - 1;
    return {
      currentCyberPass,
      currentLevelIdx,
      currentLevel,
      currentLevelProgress: 1,
    };
  }

  const currentLevelProgressStart =
    currentLevelIdx === 0
      ? 0
      : currentCyberPass.levels[currentLevelIdx - 1].experience;
  const currentLevelProgress =
    (myCyberPass.experience - currentLevelProgressStart) /
    (currentLevel.experience - currentLevelProgressStart);

  return {
    currentCyberPass,
    currentLevelIdx,
    currentLevel,
    currentLevelProgress,
  };
}
