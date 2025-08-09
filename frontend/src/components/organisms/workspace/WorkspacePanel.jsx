import { SidebarItem } from "@/components/atoms/SidebarItem/SidebarItem";
import { UserItem } from "@/components/atoms/UserItem/UserItem";
import { WorkspacePanelHeader } from "@/components/molecules/workspace/WorkspacePanelHeader";
import { WorkspacePanelSection } from "@/components/molecules/workspace/WorkspacePanelSection";
import { Separator } from "@/components/ui/separator";
import { useGetWorkspaceById } from "@/hooks/apis/workspaces/useGetWorkspaceById";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import {
  HashIcon,
  Loader2,
  MessageSquareDashedIcon,
  SendHorizonalIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";

export const WorkspacePanel = () => {
  const { workspaceId } = useParams();
  const { isFetching, isSuccess, workspace } = useGetWorkspaceById(workspaceId);
  const { setOpenCreateChannelModal } = useCreateChannelModal();

  if (isFetching) {
    return (
      <div className="w-full h-full flex justify-center items-center flex-col bg-gradient-to-br from-theme-light/50 to-white rounded-lg">
        <Loader2 className="animate-spin size-10 text-theme-indigo" />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="w-full h-full justify-center flex items-center flex-col text-theme-indigo gap-y-3 bg-gradient-to-br from-theme-light/50 to-white rounded-lg">
        <TriangleAlertIcon className="size-12 " />
        <span className="font-semibold text-lg ">Something went wrong!</span>
        <p className="text-sm text-slate-600">
          Please try refreshing the page.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-theme-light/30 to-white rounded-lg shadow-xl border border-white/20 backdrop-blur-sm overflow-hidden">
      <WorkspacePanelHeader workspace={workspace} />
      <Separator className="bg-slate-200/20" />
      <div className="flex flex-col px-2 mt-3 gap-y-2 overflow-y-auto"></div>
      <WorkspacePanelSection
        label={"Channels"}
        onIconClick={() => setOpenCreateChannelModal(true)}
      >
        {workspace?.channels?.map((channel) => {
          return (
            <SidebarItem
              key={channel._id}
              icon={HashIcon}
              label={channel.name}
              id={channel._id}
            />
          );
        })}
      </WorkspacePanelSection>
      <WorkspacePanelSection label={"Direct Messages"} onIconClick={() => {}}>
        {workspace?.members?.map((member) => {
          return (
            <UserItem
              key={member.memberId._id}
              label={member.memberId.username}
              id={member.memberId._id}
              image={member.memberId.avatar}
            />
          );
        })}
      </WorkspacePanelSection>
    </div>
  );
};
