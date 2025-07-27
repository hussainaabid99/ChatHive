import { ChatInput } from "@/components/molecules/ChatInput/ChatInput";
import { useGetChannelById } from "@/hooks/apis/channels/useGetChannelById";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export const Channel = () => {
  const { channelId } = useParams();

  const { isFetching, isError, channelDetails, error } =
    useGetChannelById(channelId);

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

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-muted-foreground">
        <TriangleAlertIcon className=" size-10" />
        <span className="text-md mt-1">Channel Not Found</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};
