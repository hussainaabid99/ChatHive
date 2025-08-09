import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useToast } from "@/hooks/use-toast";
import { LogOutIcon, PlusCircle, Settings, User } from "lucide-react";

export const UserButton = () => {
  const { auth, logout } = useAuth();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

  const { toast } = useToast();

  async function handleLogout() {
    await logout();
    toast({
      title: "Successfully signed out",
      type: "success",
    });
  }

  function openWorkspaceCreateModal() {
    setOpenCreateWorkspaceModal(true);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none relative group">
        <Avatar className="size-10 hover:opacity-80 transition-all duration-200 ring-2 ring-white/20 group-hover:ring-white/40">
          <AvatarImage src={auth?.user?.avatar} />
          <AvatarFallback
            src={auth?.user?.username[0].toUpperCase()}
          ></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-xl">
        <DropdownMenuItem className="cursor-pointer p-3 hover:bg-slate-200 transition-colors">
          <div className="flex items-center space-x-3">
            <Avatar className="size-8">
              <AvatarImage src={auth?.user?.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-theme-indigo to-theme-medium text-white font-bold text-sm">
                {auth?.user?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-900">
                {auth?.user?.username || "User"}
              </p>
              <span className="text-xs text-slate-500">
                {auth?.user?.email || "user@example.com"}
              </span>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer p-3 hover:bg-slate-200 transition-colors">
          <User className="mr-3 size-4 text-slate-600" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer p-3 hover:bg-slate-200 transition-colors">
          <Settings className="mr-3 size-4 text-slate-600" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer p-3 hover:bg-slate-200 transition-colors"
          onClick={openWorkspaceCreateModal}
        >
          <PlusCircle className="mr-3 size-4 text-slate-600" />
          <span>Create Workspace</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer p-3 hover:bg-slate-200 transition-colors"
          onClick={handleLogout}
        >
          <LogOutIcon className="mr-3 size-4 text-red-600" />
          <span className="text-red-700">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
