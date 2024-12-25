"use client";

import { useState, useRef, useEffect } from "react";

const CustomRichTextEditor = ({
  setDescription,
  description,
  setImage,
  setValue,
  image,
}: {
  setDescription: any;
  description: string;
  setImage: any;
  setValue: any;
  image: any;
}) => {
  const [content, setContent] = useState<string>(description); // Initialize content with description
  const [isEmpty, setIsEmpty] = useState(description.trim() === ""); // Track if the editor is empty
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Handle the image insertion
  const insertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      const imageTag = `<img src="${imageUrl}" alt="${file.name}" style="max-width: 100%; height: auto;" />`;
      setContent((prevContent) => prevContent + imageTag); // Update content with the new image tag
      setIsEmpty(false);
      setImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  // Apply formatting to selected text (Bold, Italic, Underline)
  const toggleFormat = (command: string, e: React.MouseEvent) => {
    // Prevent form submission or other unwanted behavior
    e.preventDefault();

    const editor = editorRef.current;
    if (!editor) return;

    // Apply the format command to selected text using execCommand
    document.execCommand(command, false, undefined);

    // Ensure the cursor stays at the end after formatting
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      range.collapse(false); // Collapse the range to the end of the selection (cursor at the end)
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // Update the content state after formatting
    setContent(editor.innerHTML);
    setIsEmpty(editor.innerHTML.trim() === "");
  };

  // Handle typing in the editor (sync with state)
  const handleTyping = () => {
    const editor = editorRef.current;
    if (editor) {
      const newContent = editor.innerHTML;
      setContent(newContent); // Update the content state with the latest HTML
      setIsEmpty(newContent.trim() === ""); // Check if content is empty
      setDescription(newContent); // Sync the content with setDescription (with HTML tags)
    }
  };

  // Prevent default behavior of the editor to avoid unwanted side effects like reversing text
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action (like a <br> being inserted)

      const editor = editorRef.current;
      if (editor) {
        const selection = window.getSelection();
        if (selection) {
          const range = selection.getRangeAt(0);
          const newP = document.createElement("p");

          // Check if we're currently inside a <p> tag
          const currentNode = range.startContainer;
          if (currentNode.nodeName !== "P") {
            // If we're not inside a <p>, create a new <p> tag for the current content
            range.deleteContents();
            range.insertNode(newP);
            range.setStart(newP, 0);
            range.setEnd(newP, 0);
          } else {
            // If we're inside a <p>, just add a line break (<br>) instead of a new <p>
            const br = document.createElement("br");
            range.insertNode(br);
          }

          editor.focus();
        }
      }

      // Update the content after the new paragraph or line break is inserted
      setContent(editorRef.current?.innerHTML || "");
    }
  };

  useEffect(() => {
    // Ensure that the initial content is set correctly in the editor
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
    setValue(content);
  }, [content]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Blog Description</h2>

      {/* Toolbar */}
      <div className="mb-4 flex gap-2">
        <button
          className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={(e) => toggleFormat("bold", e)} // pass event to prevent default
        >
          Bold
        </button>
        <button
          className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={(e) => toggleFormat("italic", e)} // pass event to prevent default
        >
          Italic
        </button>
        <button
          className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={(e) => toggleFormat("underline", e)} // pass event to prevent default
        >
          Underline
        </button>

        {/* Image Insert Button */}
        <button
          className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => fileInputRef.current?.click()}
        >
          Insert Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={insertImage}
        />
      </div>

      {/* Editable Content Area */}
      <div
        ref={editorRef}
        className="border p-4 min-h-[150px] rounded-md bg-white shadow-sm focus:outline-none w-full"
        contentEditable={true}
        dir="ltr" // Ensure text is written left to right
        onInput={handleTyping} // Handle content input
        onKeyDown={handleKeyDown} // Handle key down events for special behavior
        style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
      />

      {/* Preview */}
      {/* <div className="mt-6 border p-4 bg-gray-100 rounded-md">
        <h3 className="font-semibold text-lg mb-2">Content Preview</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div> */}
    </div>
  );
};

export default CustomRichTextEditor;
