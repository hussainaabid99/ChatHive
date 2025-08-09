import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useCurrentWorkspace from "@/hooks/context/useCurrentWorkspace";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";
import { Link } from "react-router-dom";

const userItemVariants = cva(
  "flex items-center gap-3 justify-start font-medium h-10 px-4 py-2",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481350] bg-white/90 hover:bg-white/80",
      },
    },
    defaultVariants: "default",
  }
);

export const UserItem = ({
  label = "member",
  image,
  id,
  variant = "default",
}) => {
  const { currentWorkspace } = useCurrentWorkspace();
  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(userItemVariants({ variant }))}
      asChild
    >
      <Link to={`/workspaces/${currentWorkspace?._id}/dms/${id}`}>
        <Avatar className="size-8">
          <AvatarImage src={image} className="rounded-md object-cover" />
          <AvatarFallback className="rounded-md bg-sky-500 text-white text-sm font-semibold">
            {label.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="tetx-sm truncate py-2">{label}</span>
      </Link>
    </Button>
  );
};
