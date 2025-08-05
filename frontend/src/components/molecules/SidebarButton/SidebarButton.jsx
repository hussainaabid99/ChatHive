import { Button } from "@/components/ui/button";

export const SidebarButton = ({ Icon, label }) => {
  return (
    <div className="group flex flex-col items-center justify-center cursor-pointer">
      <Button
        className="size-10 p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
        variant="transparent"
      >
        <Icon className="size-5 text-white/80 group-hover:scale-110 transition-all" />
      </Button>
      <span className="text-[9px] text-white/60 group-hover:text-white/80 transition-colors mt-1 font-medium">
        {label}
      </span>
    </div>
  );
};
