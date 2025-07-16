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

export const SignupCard = ({
  signupForm,
  setSignupForm,
  onSignupFormSubmit,
  validationError,
  isPending,
  isSuccess,
  error,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-lg ">Sign Up</CardTitle>
        <CardDescription>Signup to access your account</CardDescription>
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
              Successfully signed up. You will be redirected to the login page.
            </p>
            <LucideLoader2 className="animate-spin text-yellow-600 size-5" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-3" onSubmit={onSignupFormSubmit}>
          <Input
            placeholder="Email"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
            value={signupForm.email}
            type="email"
            disabled={isPending}
          />
          <Input
            placeholder="Password"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
            value={signupForm.password}
            type="password"
            disabled={isPending}
          />
          <Input
            placeholder="Confirm Password"
            required
            onChange={(e) =>
              setSignupForm({
                ...signupForm,
                confirmPassword: e.target.value,
              })
            }
            value={signupForm.confirmPassword}
            type="password"
            disabled={isPending}
          />
          <Input
            placeholder="Username"
            required
            onChange={(e) =>
              setSignupForm({
                ...signupForm,
                username: e.target.value,
              })
            }
            value={signupForm.username}
            type="text"
            disabled={isPending}
          />
          <Button
            disabled={isPending}
            size="lg"
            type="Submit"
            className="w-full"
          >
            Continue
          </Button>
        </form>
        <Separator className="my-5"></Separator>
        <p className="text-sm text-muted-foreground mt-4">
          Already have an account ?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate("/auth/signin")}
          >
            SignIn
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
