import { SidebarItem } from "@/components/atoms/SidebarItem/SidebarItem";
import { WorkspacePanelHeader } from "@/components/molecules/workspace/WorkspacePanelHeader";
import { WorkspacePanelSection } from "@/components/molecules/workspace/WorkspacePanelSection";
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
      <div className="w-full h-full justify-center flex items-center">
        <Loader2 className="animate-spin size-10 text-theme-indigo" />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="w-full h-full justify-center flex items-center flex-col text-theme-indigo gap-y-2">
        <TriangleAlertIcon className="size-10" />
        <span className="font-semibold text-lg">Something went wrong!</span>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col h-full bg-theme-medium">
        <WorkspacePanelHeader workspace={workspace} />
        <div className="flex flex-col px-2 mt-3 gap-1">
          <SidebarItem
            label="threads"
            icon={MessageSquareDashedIcon}
            id="threads"
            variant="active"
          />
          <SidebarItem
            label="Drafts & Sends"
            icon={SendHorizonalIcon}
            id="drafts"
            variant="default"
          />
        </div>
        <WorkspacePanelSection
          label={"Channels"}
          onIconClick={() => setOpenCreateChannelModal(true)}
        >
          {workspace?.channels.map((channel) => {
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
      </div>
    </>
  );
};
