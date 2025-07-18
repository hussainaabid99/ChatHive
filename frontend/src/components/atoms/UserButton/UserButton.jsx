import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useToast } from "@/hooks/use-toast";
import { LogOutIcon, PlusCircle, Settings } from "lucide-react";

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
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage src={auth?.user?.avatar} />
          <AvatarFallback
            src={auth?.user?.username[0].toUpperCase()}
          ></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={openWorkspaceCreateModal}>
          <PlusCircle className="mr-2 size-4 h-10" />
          Create Workspace
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 size-4 h-10" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="mr-2 size-4 h-10" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
