import { WorkspaceSidebar } from "@/components/organisms/workspace/WorkspaceSidebar";

export const WorkspaceLayout = ({ children }) => {
  return (
    <div className="flex h-[100vh]">
      <WorkspaceSidebar />
      {children}
    </div>
  );
};
