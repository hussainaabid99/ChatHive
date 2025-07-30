import { ChannelHeader } from "@/components/molecules/Channel/ChannelHeader";
import { ChatInput } from "@/components/molecules/ChatInput/ChatInput";
import { Message } from "@/components/molecules/Message/Message";
import { useGetChannelById } from "@/hooks/apis/channels/useGetChannelById";
import { useGetChannelMessages } from "@/hooks/apis/channels/useGetChannelMessages";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export const Channel = () => {
  const { channelId } = useParams();

  const queryClient = useQueryClient();

  const { isFetching, isError, channelDetails } = useGetChannelById(channelId);
  const { messageList, setMessageList } = useChannelMessages();

  const { joinChannel } = useSocket();

  const { messages, isSuccess } = useGetChannelMessages(channelId);

  const messageContainerListRef = useRef(null);

  useEffect(() => {
    if (messageContainerListRef.current) {
      messageContainerListRef.current.scrollTop =
        messageContainerListRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [`getPaginatedMessages`],
    });
  }, [channelId]);

  useEffect(() => {
    if (!isFetching && !isError) {
      joinChannel(channelId);
    }
  }, [isFetching, isError, joinChannel, channelId]);

  useEffect(() => {
    if (isSuccess) {
      console.log("Channel Messages fetched");
      setMessageList(messages);
    }
  }, [messages, setMessageList, isSuccess, channelId]);

  if (isFetching) {
    return (
      <div
        className="flex items-center justify-center h-full w-full
      "
      >
        <Loader2Icon className="animate-spin text-muted-foreground size-10" />
      </div>
    );
  }

  console.log("messageList", messageList);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-muted-foreground">
        <TriangleAlertIcon className=" size-10" />
        <span className="text-md mt-1">Channel Not Found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen ">
      <ChannelHeader name={channelDetails?.name} channelId={channelId} />
      <div
        className="flex-1 overflow-y-auto p-2 space-y-2"
        ref={messageContainerListRef}
      >
        {messageList
          ?.slice()
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .map((message) => {
            return (
              <Message
                key={message._id}
                body={message.body}
                authorImage={message.senderId?.avatar}
                authorName={message.senderId?.username}
                createdAt={message.createdAt}
              />
            );
          })}
      </div>
      <ChatInput />
    </div>
  );
};
