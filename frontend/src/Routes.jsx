import { Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/Auth";
import { SignupContainer } from "./components/organisms/auth/SignupContainer";
import { SigninContainer } from "./components/organisms/auth/SigninContainer";
import { NotFound } from "./pages/notFound/NotFound";
import { Home } from "./pages/Home/Home";
import { ProtectedRoute } from "./components/molecules/ProtectedRoute/ProtectedRoute";
import { WorkspaceLayout } from "./pages/workspace/Layout";
import { JoinPage } from "./pages/workspace/JoinPage";
import { Channel } from "./pages/workspace/Channel/Channel";
import { Landing } from "./pages/Landing/Landing";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/auth/signup"
        element={
          <Auth>
            <SignupContainer />
          </Auth>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <Auth>
            <SigninContainer />
          </Auth>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspaces/:workspaceId"
        element={
          <ProtectedRoute>
            <WorkspaceLayout>Workspace</WorkspaceLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspaces/:workspaceId/channels/:channelId"
        element={
          <ProtectedRoute>
            <WorkspaceLayout>
              <Channel />
            </WorkspaceLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspaces/join/:workspaceId"
        element={
          <ProtectedRoute>
            <JoinPage />
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
