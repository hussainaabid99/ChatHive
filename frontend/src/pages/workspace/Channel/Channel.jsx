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
    queryClient.invalidateQueries("getPaginatedMessages");
  }, [channelId]);

  useEffect(() => {
    if (!isFetching && !isError) {
      joinChannel(channelId);
    }
  }, [isFetching, isError, joinChannel, channelId]);

  useEffect(() => {
    if (isSuccess) {
      console.log("Channel Messages fetched");
      setMessageList(messages.reverse());
    }
  }, [messages, setMessageList, isSuccess, channelId]);

  if (isFetching) {
    return (
      <div
        className="flex items-center justify-center h-full w-full bg-gradient-to-br from-slate-100 to-white
      "
      >
        <Loader2Icon className="animate-spin text-theme-indigo size-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-slate-50 to-white">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="p-4 bg-red-50 rounded-full">
            <TriangleAlertIcon className="size-12 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Channel Not Found
            </h3>
            <p className="text-slate-600">
              The channel you're looking for doesn't exist or you don't have
              access.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-white">
      <ChannelHeader name={channelDetails?.name} channelId={channelId} />
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth"
        ref={messageContainerListRef}
      >
        {messageList?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="p-4 bg-theme-light/20 rounded-full">
              <svg
                className="size-12 text-theme-medium"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No messages yet
              </h3>
              <p className="text-slate-600">
                Be the first to start the conversation!
              </p>
            </div>
          </div>
        ) : (
          messageList?.map((message) => (
            <Message
              key={message._id}
              body={message.body}
              authorImage={message.senderId?.avatar}
              authorName={message.senderId?.username}
              createdAt={message.createdAt}
              imageUrl={message?.image}
            />
          ))
        )}
      </div>
      <div className="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
        <ChatInput />
      </div>
    </div>
  );
};
