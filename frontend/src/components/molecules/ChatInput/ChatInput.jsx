import { Editor } from "@/components/atoms/Editor/Editor";
import { useAuth } from "@/hooks/context/useAuth";
import useCurrentWorkspace from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocket";

export const ChatInput = () => {
  const { socket, currentChannel } = useSocket();
  const { currentWorkspace } = useCurrentWorkspace();
  const { auth } = useAuth();

  async function handleSubmit({ body }) {
    socket?.emit(
      "newMessage",
      {
        channelId: currentChannel,
        body,
        senderId: auth?.user?.id,
        workspaceId: currentWorkspace._id,
      },
      (data) => console.log("Message sent successfully", data)
    );
  }

  return (
    <div className="py-2 w-full px-2">
      <Editor
        // placeholder="Type a message.."
        onSubmit={handleSubmit}
        // onCancel={() => {}}
        // disabled={false}
        // defaultValue={""}
      />
    </div>
  );
};
