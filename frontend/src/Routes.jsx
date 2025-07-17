import { Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/Auth";
import { SignupContainer } from "./components/organisms/auth/SignupContainer";
import { SigninContainer } from "./components/organisms/auth/SigninContainer";
import { NotFound } from "./pages/notFound/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
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
      <Route path="/home" element={<h1>Home</h1>} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
