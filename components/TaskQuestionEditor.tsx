import { Lesson } from "@/lib/lesson";
import { Button, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { IconCheck, IconCheckbox, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

export default function TaskQuestionEditor({
  lessonId,
  taskId,
  taskType,
  setTaskType,
  choices,
  setChoices,
  correctChoices,
  setCorrectChoices,
  exp,
  setExp,
}: {
  lessonId: number;
  taskId: number;
  taskType: string | null;
  setTaskType: any;
  choices: string[];
  setChoices: any;
  correctChoices: number[];
  setCorrectChoices: any;
  exp: number;
  setExp: any;
}) {
  const { data: lesson } = useQuery<Lesson>({
    queryKey: [`/lessons/${lessonId}`],
  });
  const task = lesson?.tasks.filter((task) => task.id === taskId)[0];

  useEffect(() => {
    if (task) {
      setTaskType(task.type);
      setExp(task.exp || 0);
      if (task.type === "radio") {
        setChoices(task.choices || []);
        setCorrectChoices(task.correct_choices || []);
      } else if (task.type === "input") {
        setChoices(task.input_answers || []);
      } else {
        // Nothing
      }
    }
  }, [setChoices, setCorrectChoices, setTaskType, task]);

  const removeChoice = (index: number) => {
    setChoices((prev: any) => prev.filter((_: any, i: any) => i !== index));
    setCorrectChoices((prev: any) => prev.filter((i: any) => i !== index));
  };

  const addChoice = () => {
    setChoices((prev: any) => prev.concat([""]));
  };

  const replaceChoiceText = (index: number, text: string) => {
    setChoices((prev: any) => {
      const arr = [...prev];
      arr[index] = text;
      return arr;
    });
  };

  const invertChoiceIsCorrect = (index: number) => {
    setCorrectChoices((prev: any) => {
      if (prev.includes(index)) {
        return prev.filter((i: any) => i !== index);
      } else {
        return prev.concat([index]);
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Select
          label="Тип задания"
          placeholder="Выберите тип задания"
          data={[
            { value: "empty", label: "Теория" },
            { value: "radio", label: "Выбор из нескольких" },
            { value: "input", label: "Текстовый ответ" },
          ]}
          value={taskType}
          onChange={setTaskType}
          allowDeselect={false}
        />
      </div>
      <div>
        <NumberInput
          label="Награда (опыт)"
          placeholder="Введите количество опыта за верный ответ"
          value={exp}
          onChange={(value) => setExp(Number(value))}
        />
      </div>
      {taskType === "radio" && (
        <div className="flex flex-col gap-2">
          <Text size="sm">Укажите варианты и правильные ответы</Text>
          {choices.map((value, key) => (
            <TextInput
              key={key}
              value={value}
              onChange={(event) =>
                replaceChoiceText(key, event.currentTarget.value)
              }
              placeholder="Введите текст варианта"
              rightSection={
                <IconTrash
                  size={16}
                  onClick={() => removeChoice(key)}
                  className="cursor-pointer hover:text-red-500"
                />
              }
              leftSection={
                correctChoices.includes(key) ? (
                  <IconCheckbox
                    size={16}
                    onClick={() => invertChoiceIsCorrect(key)}
                    className={"cursor-pointer font-bold text-green-500"}
                  />
                ) : (
                  <IconCheck
                    size={16}
                    onClick={() => invertChoiceIsCorrect(key)}
                    className={"cursor-pointer text-gray-500"}
                  />
                )
              }
            />
          ))}
          <div>
            <Button onClick={() => addChoice()} variant="outline">
              Добавить еще
            </Button>
          </div>
        </div>
      )}
      {taskType === "input" && (
        <div className="flex flex-col gap-2">
          <Text size="sm">Укажите верные ответы</Text>
          {choices.map((value, key) => (
            <TextInput
              key={key}
              value={value}
              onChange={(event) =>
                replaceChoiceText(key, event.currentTarget.value)
              }
              placeholder="Введите правильный ответ"
              rightSection={
                <IconTrash
                  size={16}
                  onClick={() => removeChoice(key)}
                  className="cursor-pointer hover:text-red-500"
                />
              }
            />
          ))}
          <div>
            <Button onClick={() => addChoice()} variant="outline">
              Добавить еще
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
