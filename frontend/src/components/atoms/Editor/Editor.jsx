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
              handler: () => {
                return;
              },
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
    <div className="flex flex-col">
      <div className="flex flex-col border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white ">
        <div className="h-full ql-custom" ref={containerRef} />
        {image && (
          <div className="p-2">
            <div className="relative size-[120px] flex items-center justify-center group/image">
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl z-20">
                  <Loader2Icon className="animate-spin size-6 text-white" />
                </div>
              )}
              <button
                className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-1 -right-1 text-white size-6 z-10 border-2 border-white items-center justify-center"
                onClick={() => {
                  setImage(null);
                  imageInputRef.current.value = "";
                }}
              >
                <XIcon className="size-4" />
              </button>
              <img
                src={URL.createObjectURL(image)}
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={!isToolbarVisible ? "Show toolbar" : "Hide toolbar"}
            side="bottom"
            align="center"
          >
            <Button
              size="iconSm"
              variant="ghost"
              disabled={false}
              onClick={toggleToolbar}
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
            >
              <ImageIcon className="size-4" />
            </Button>
          </Hint>
          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Hint label="Send Message">
            <Button
              size="iconSm"
              disabled={false}
              className="ml-auto bg-green-500 hover:bg-green-600 text-white px-6"
              onClick={async () => {
                const messageContent = JSON.stringify(
                  quillRef.current.getContents()
                );
                await onSubmit({ body: messageContent, image: image });
                quillRef.current.setContents(defaultValueRef.current);
                setImage(null);
                imageInputRef.current.value = "";
              }}
            >
              <SendHorizonal className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
      <p className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <strong>Shift + return</strong> &nbsp; to add a new line
      </p>
    </div>
  );
};
