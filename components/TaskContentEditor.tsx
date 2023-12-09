import CustomEditor from "@/components/CustomEditor";
import { Lesson } from "@/lib/lesson";
import { useQuery } from "@tanstack/react-query";
import { Editor } from "@tiptap/react";
import React, { useEffect } from "react";

export default function TaskContentEditor({
  lessonId,
  taskId,
  editor,
}: {
  lessonId: number;
  taskId: number;
  editor: Editor;
}) {
  const { data: lesson } = useQuery<Lesson>({
    queryKey: [`/lessons/${lessonId}`],
  });
  const task = lesson?.tasks.filter((task) => task.id === taskId)[0];

  useEffect(() => {
    if (editor && task) {
      try {
        if (typeof task.content === "string") {
          const json = JSON.parse(task.content);
          editor.commands.setContent(json);
        } else {
          editor.commands.setContent(task.content);
        }
      } catch (Error) {
        editor.commands.setContent(task.content);
      }
    }
  }, [editor, task]);

  return <CustomEditor editor={editor} />;
}
