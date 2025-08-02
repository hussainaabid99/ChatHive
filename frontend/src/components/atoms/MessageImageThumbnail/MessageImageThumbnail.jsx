import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const MessageImageThumbnail = ({ url }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden cursor-zoom-in border rounded-lg max-w-[370px]">
          <img src={url} className="rounded-md object-cover size-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-screen max-h-screen border-none bg-transparent p-0 shadow-none flex justify-center text-white">
        <img
          src={url}
          className="rounded-md object-cover max-w-[95vw] max-h-[95vh] items-center"
        />
      </DialogContent>
    </Dialog>
  );
};
