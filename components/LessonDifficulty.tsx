import { ComponentProps } from "react";
import { Rating, Tooltip } from "@mantine/core";

export type LessonDifficultyProps = {
  difficulty: number;
  maximumDifficulty: number;
  editable?: boolean;
  withTooltip?: boolean;
};

export default function LessonDifficulty({
  difficulty,
  maximumDifficulty,
  editable,
  withTooltip,
  ...rest
}: ComponentProps<typeof Rating> & LessonDifficultyProps) {
  const rating = (
    <Rating
      value={difficulty}
      color="grape"
      size="sm"
      count={maximumDifficulty}
      readOnly={!editable}
      emptySymbol={getRatingEmptyIcon}
      fullSymbol={getRatingFullIcon}
      {...rest}
    />
  );

  if (withTooltip) {
    return (
      <Tooltip
        label="Сложность урока по 10-ти бальной шкале"
        position="bottom"
        withArrow
      >
        {rating}
      </Tooltip>
    );
  } else {
    return rating;
  }
}

function getRatingEmptyIcon() {
  return (
    <span className="icon-[mdi--asterisk] mt-[6px] text-lg text-dark-200 dark:text-dark-400" />
  );
}

function getRatingFullIcon() {
  return (
    <span className="icon-[mdi--asterisk] mt-[6px] text-lg text-yellow-800" />
  );
}
