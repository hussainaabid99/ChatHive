import { WorkspaceNavbar } from "@/components/organisms/workspace/WorkspaceNavbar";
import { WorkspacePanel } from "@/components/organisms/workspace/WorkspacePanel";
import { WorkspaceSidebar } from "@/components/organisms/workspace/WorkspaceSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const WorkspaceLayout = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-theme-light/10">
      <WorkspaceNavbar />
      <div className="flex h-[calc(100vh-40px)]">
        <WorkspaceSidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId={"workspace-resize"}
          className="overflow-hidden"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-gradient-to-br from-theme-medium to-theme-dark"
          >
            <WorkspacePanel />
          </ResizablePanel>
          <ResizableHandle
            withHandle
            className="bg-slate-200 hover:bg-slate-300 transition-colors"
          />
          <ResizablePanel minSize={20} className="bg-white">
            <div className="h-full overflow-hiden">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
