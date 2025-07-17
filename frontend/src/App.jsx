import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "@/pages/auth/Auth";
import { NotFound } from "@/pages/notFound/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignupContainer } from "@/components/organisms/auth/SignupContainer";
import { Toaster } from "@/components/ui/toaster";
import { SigninContainer } from "@/components/organisms/auth/SigninContainer";
import { AppContextProvider } from "./context/AppContextProvider";
import { AppRoutes } from "./Routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
