import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4 text-muted-foreground">404</h1>
      <p className="text-xl mb-2">Page Not Found</p>
      <p className="mb-6 text-sm text-muted-foreground">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button onClick={() => navigate(-1)} size="lg" variant="outline">
        Go Back
      </Button>
    </div>
  );
};
