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
import { Hash, Users, Settings } from "lucide-react";
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
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 h-14 flex items-center px-6 shadow-sm">
      <div className="flex items-center space-x-4 w-full ">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-lg font-semibold px-3 hover:bg-slate-100 rounded-lg  transition-colors"
            >
              <Hash className="size-4 mr-2 text-theme-medium" />
              <span className="text-slate-900">{name}</span>
              <FaChevronDown className="size-3 ml-2 text-slate-500 " />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-0">
                <Hash className="size-4 mr-1 text-theme-medium" />
                <span>{name}</span>
              </DialogTitle>
            </DialogHeader>
            <Dialog>
              <div className="space-y-4">
                <DialogTrigger asChild>
                  <div className="p-4 bg-slate rounded-lg border cursor-pointer hover:bg-slate-50 trasnition-colors">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-semibold text-slate-900">
                        Channel name
                      </p>
                      <p className="text-sm font-medium">Edit</p>
                    </div>
                    <p className="text-sm text-slate-600">{name}</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Channel Name</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4" onSubmit={handleUpdateName}>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Channel Name
                      </label>
                      <Input
                        value={rename}
                        onChange={(e) => setRename(e.target.value)}
                        required
                        autoFocus
                        placeholder="Enter new channel name"
                        minLength={3}
                        maxLength={50}
                        disabled={isPending}
                        className="border-slate-300 focus:border-theme-indigo focus:ring-theme-indigo/20"
                      />
                    </div>

                    <DialogFooter>
                      <Button variant="outline" disabled={isPending}>
                        Cancel
                      </Button>
                      <Button
                        variant="default"
                        type="submit"
                        disabled={isPending}
                        className="bg-theme-indigo hover:bg-theme-medium transition-colors"
                      >
                        {isPending ? "Saving..." : "Save"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </div>
            </Dialog>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
