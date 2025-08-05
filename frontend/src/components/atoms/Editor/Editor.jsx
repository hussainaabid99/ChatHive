import "quill/dist/quill.snow.css";

import Quill from "quill";
import { useEffect, useState, useRef } from "react";
import { ImageIcon, Loader2Icon, SendHorizonal, XIcon } from "lucide-react";
import { PiTextAa } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Hint } from "../Hint/Hint";

export const Editor = ({
  // variant = "create",
  onSubmit,
  // onCancel,
  uploading,
  setUploading,
  // disabled,
  // defaultValue,
}) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [image, setImage] = useState(null);

  const containerRef = useRef(); // reqd to initialize the editor
  const defaultValueRef = useRef();
  const quillRef = useRef();
  const imageInputRef = useRef(null);

  function toggleToolbar() {
    setIsToolbarVisible(!isToolbarVisible);
    const toolbar = containerRef.current.querySelector(".ql-toolbar");
    if (toolbar) {
      toolbar.classList.toggle("hidden");
    }
  }

  async function handleSendMessage() {
    const messageContent = JSON.stringify(quillRef.current.getContents());
    await onSubmit({ body: messageContent, image: image });
    quillRef.current.setContents(defaultValueRef.current);
    setImage(null);
    imageInputRef.current.value = "";
  }

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options = {
      theme: "snow",
      placeholder: "Message",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => handleSendMessage(),
            },
          },
          shift_enter: {
            key: "Enter",
            shiftKey: true,
            handler: () => {
              quill.insertText(quill.getSelection()?.index || 0, "\n"); //insert a new line
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);

    quillRef.current = quill;
    quillRef.current.focus();

    quill.setContents(defaultValueRef.current);
  }, []);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col border border-slate rounded-xl overflow-hidden  focus-within:border-slate-300 bg-white shadow-sm">
        <div className="h-full ql-custom" ref={containerRef} />
        {image && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <div className="relative inline-block">
              <div className="relative size-32 flex items-center justify-center group/image">
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl z-20 backdrop-blur-sm">
                    <Loader2Icon className="animate-spin size-8 text-theme-indigo" />
                  </div>
                )}
                <button
                  className="hidden group-hover/image:flex rounded-full bg-red-500 hover:bg-red-600 absolute -top-1 -right-2 text-white size-6 z-10 border-2 border-white items-center justify-center transition-colors"
                  onClick={() => {
                    setImage(null);
                    imageInputRef.current.value = "";
                  }}
                >
                  <XIcon className="size-3" />
                </button>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="rounded-xl overflow-hidden border object-cover  shadow-md"
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center px-4 py-2 bg-slate-50/50">
          <div className="flex items-center space-x-1">
            <Hint
              label={!isToolbarVisible ? "Show formatting" : "Hide formatting"}
              side="bottom"
              align="center"
            >
              <Button
                size="iconSm"
                variant="ghost"
                disabled={false}
                onClick={toggleToolbar}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              >
                <PiTextAa className="size-4" />
              </Button>
            </Hint>
            <Hint label="Image">
              <Button
                size="iconSm"
                variant="ghost"
                disabled={false}
                onClick={() => {
                  imageInputRef.current.click();
                }}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          </div>
          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
          <div className="ml-auto">
            <Hint label="Send Message (Enter)">
              <Button
                size="sm"
                disabled={uploading}
                className="bg-theme-indigo hover:bg-theme-medium/90 text-white px-6 py-2 rounded-lg shadow-sm transition-all duration-200"
                onClick={handleSendMessage}
              >
                <SendHorizonal className="size-4" />
              </Button>
            </Hint>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <span>
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono">
            Enter
          </kbd>{" "}
          to send
        </span>
        <span>
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono">
            Shift + Enter
          </kbd>{" "}
          for new line
        </span>
      </div>
    </div>
  );
};
