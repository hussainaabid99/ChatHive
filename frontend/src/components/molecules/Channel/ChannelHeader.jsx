import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateChannel } from "@/hooks/apis/channels/useUpdateChannel";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router-dom";

export const ChannelHeader = ({ name, channelId }) => {
  const [rename, setRename] = useState(name);
  const { workspaceId } = useParams();

  const { isPending, isSuccess, error, updateChannelMutation } =
    useUpdateChannel(channelId);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  async function handleUpdateName(e) {
    e.preventDefault();
    try {
      await updateChannelMutation(rename);
      queryClient.invalidateQueries({
        queryKey: [`get-channel-${channelId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`fetchWorkspaceById-${workspaceId}`],
      });
      toast({
        title: "Successfully updated channel name!",
        variant: "success",
      });
      setRename(name);
    } catch (error) {
      console.log("Error in handleUpdateName", error);
      toast({
        title: `Error! ${error?.response?.data?.message}`,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="bg-white border-b h-[50px] flex items-center px-4 overflow-hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-lg font-semibold px-2 w-auto overflow-hidden"
          >
            <span>#{name}</span>
            <FaChevronDown className="size-3 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>#{name}</DialogTitle>
          </DialogHeader>
          <Dialog>
            <div className="px-4 pb-4 flex flex-col gap-y-2">
              <DialogTrigger>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel name</p>
                    <p className="text-sm font-semibold">Edit</p>
                  </div>
                  <p className="text-sm text-muted-foreground flex justify-start items-center">
                    {name}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Channel Name</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleUpdateName}>
                  <Input
                    value={rename}
                    onChange={(e) => setRename(e.target.value)}
                    required
                    autoFocus
                    placeholder="Enter new channel name"
                    minLength={3}
                    maxLength={50}
                    disabled={isPending}
                  />

                  <DialogFooter>
                    <Button variant="outline" disabled={isPending}>
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      type="submit"
                      disabled={isPending}
                    >
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </div>
          </Dialog>
        </DialogContent>
      </Dialog>
    </div>
  );
};
