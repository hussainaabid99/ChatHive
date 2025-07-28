import { Editor } from "@/components/atoms/Editor/Editor";

export const ChatInput = () => {
  function formSubmit({ body }) {
    console.log(body);
  }

  return (
    <div className="px-5 w-full">
      <Editor
        // placeholder="Type a message.."
        onSubmit={formSubmit}
        // onCancel={() => {}}
        // disabled={false}
        // defaultValue={""}
      />
    </div>
  );
};
