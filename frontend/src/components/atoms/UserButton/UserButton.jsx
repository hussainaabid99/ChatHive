import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { LogOutIcon, Settings, Settings2Icon } from "lucide-react";

export const UserButton = () => {
  const { auth } = useAuth();
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
        <DropdownMenuItem>
          <Settings className="mr-2 size-4 h-10" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOutIcon className="mr-2 size-4 h-10" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
