import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SigninCard = ({
  setSigninForm,
  signinForm,
  isPending,
  isSuccess,
  error,
  validationError,
  onSigninFormSubmit,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>SignIn to access your account</CardDescription>
        {validationError && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-destructive mb-6 text-sm">
            <TriangleAlert className="size-5" />
            <p>{validationError.message}</p>
          </div>
        )}
        {error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-destructive mb-6 text-sm">
            <TriangleAlert className="size-5" />
            <p>{error.message}</p>
          </div>
        )}
        {isSuccess && (
          <div className="bg-yellow-50 border border-yellow-300 p-2 rounded-lg flex items-center gap-3 text-xs text-yellow-600 shadow-sm mb-5">
            <p className="font-medium">
              Successfully signed in. You will be redirected to the home page.
            </p>
            <LucideLoader2 className="animate-spin text-yellow-600 size-5" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-3" onSubmit={onSigninFormSubmit}>
          <Input
            placeholder="Email"
            required
            onChange={(e) =>
              setSigninForm({ ...signinForm, email: e.target.value })
            }
            value={signinForm.email}
            type="email"
            disabled={isPending}
          />
          <Input
            placeholder="Password"
            required
            onChange={(e) =>
              setSigninForm({ ...signinForm, password: e.target.value })
            }
            value={signinForm.password}
            type="password"
            disabled={isPending}
          />
          <Button
            className="w-full"
            disabled={isPending}
            size="lg"
            type="Submit"
          >
            Continue
          </Button>
        </form>
        <Separator className="my-5" />
        <p className="text-sm text-muted-foreground mt-4">
          Don't have an account?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate("/auth/signup")}
          >
            SignUp
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
