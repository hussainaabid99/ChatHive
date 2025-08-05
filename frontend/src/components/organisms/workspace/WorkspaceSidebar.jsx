import { UserButton } from "@/components/atoms/UserButton/UserButton";
import { SidebarButton } from "@/components/molecules/SidebarButton/SidebarButton";
import {
  BellIcon,
  HomeIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

export const WorkspaceSidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-gradient-to-b from-theme-dark to-theme-dark/95 flex flex-col items-center pt-4 pb-5 shadow-lg border-r border-white/10 ">
      <div className="mb-6">
        <WorkspaceSwitcher />
      </div>
      <div className="flex flex-col items-center space-y-2 flex-1">
        <SidebarButton Icon={HomeIcon} label="Home" />
        <SidebarButton Icon={MessageSquareIcon} label="DMs" />
        <SidebarButton Icon={BellIcon} label="Notification" />
        <SidebarButton Icon={MoreHorizontalIcon} label="More" />
      </div>
      <div className="flex flex-col items-center pt-4 w-full">
        <UserButton />
      </div>
    </aside>
  );
};
