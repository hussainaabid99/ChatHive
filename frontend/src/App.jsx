import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AppContextProvider } from "./context/AppContextProvider";
import { AppRoutes } from "./Routes";
import { Modals } from "./components/organisms/Modals/Modals";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-light/10 to-slate-50">
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AppRoutes />
          <Modals />
        </AppContextProvider>
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;
