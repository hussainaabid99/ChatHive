import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Link, useParams } from "react-router-dom";

const sidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[20px] text-sm overflow-hidden",
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

export const SidebarItem = ({ icon: Icon, label, variant, id }) => {
  const { workspaceId } = useParams();

  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(sidebarItemVariants({ variant }))}
    >
      <Link
        to={`/workspaces/${workspaceId}/channels/${id}`}
        className="flex items-center gap-1.5"
      >
        <Icon className="size-3.5 mr-1.5" />
        <span className="text-sm ">{label}</span>
      </Link>
    </Button>
  );
};
