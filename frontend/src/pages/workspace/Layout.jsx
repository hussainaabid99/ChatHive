import { WorkspaceNavbar } from "@/components/organisms/workspace/WorkspaceNavbar";
import { WorkspaceSidebar } from "@/components/organisms/workspace/WorkspaceSidebar";

export const WorkspaceLayout = ({ children }) => {
  return (
    <div className="h-[calc(100vh-40px)]">
      <WorkspaceNavbar />
      <WorkspaceSidebar />
      {children}
    </div>
  );
};
