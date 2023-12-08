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
      editor.commands.setContent(task.content);
    }
  }, [editor, task]);

  return <CustomEditor editor={editor} />;
}
