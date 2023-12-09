import { Link, RichTextEditor } from "@mantine/tiptap";
import { Content } from "@tiptap/core";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function TaskContent({
  content,
}: {
  content: Content | string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content,
    editable: false,
  });

  useEffect(() => {
    if (editor) {
      try {
        if (typeof content === "string") {
          const json = JSON.parse(content);
          editor.commands.setContent(json);
        } else {
          editor.commands.setContent(content);
        }
      } catch (Error) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
