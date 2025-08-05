import { MessageImageThumbnail } from "@/components/atoms/MessageImageThumbnail/MessageImageThumbnail";
import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatMessageTime } from "@/utils/FormatTime/formatTime";

export const Message = ({
  authorImage,
  authorName,
  createdAt,
  body,
  imageUrl,
}) => {
  return (
    <div className="group flex items-start sapce-x-3 p-3 px-5 hover:bg-slate-100 transition-colors duration-200">
      <div className="flex-shrink-0 ">
        <Avatar className="size-10 ring-2 ring-white shadow-sm">
          <AvatarImage src={authorImage} className="rounded-full" />
          <AvatarFallback className="rounded-full bg-gradient-to-br from-theme-indigo to-theme-indigo/60 text-white font-semibold text-sm">
            {authorName?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-900 text-sm hover:underline cursor-pointer ml-1">
            {authorName}
          </span>
          <span className="text-xs text-slate-500 ">
            {createdAt ? formatMessageTime(createdAt) : "Just now"}
          </span>
        </div>
        <div className="prose prose-sm max-w-none">
          <MessageRenderer value={body} />
        </div>

        {imageUrl && (
          <div className="mt-3">
            <MessageImageThumbnail url={imageUrl} />
          </div>
        )}
      </div>
    </div>
  );
};
