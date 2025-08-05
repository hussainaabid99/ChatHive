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
import {
  ArrowRight,
  Lock,
  LucideLoader2,
  Mail,
  TriangleAlert,
} from "lucide-react";
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
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-md">
      <CardHeader className="space-y-4 pb-6">
        <CardTitle className="text-2xl font-bold text-slate-900">
          Sign In
        </CardTitle>
        <CardDescription className="text-slate-600">
          Sign in to access your account
        </CardDescription>
        {validationError && (
          <div className="bg-red-100/40 border-red-200 border p-3 rounded-lg flex items-center gap-3 text-red-600">
            <TriangleAlert className="size-5 flex-shrink-0" />
            <p className="text-sm font-normal">{validationError.message}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100/40 border-red-200 border p-3 rounded-lg flex items-center gap-3 text-red-600">
            <TriangleAlert className="size-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error.message}</p>
          </div>
        )}
        {isSuccess && (
          <div className="bg-green-100 border border-green-200 p-3 rounded-lg flex items-center gap-3 text-green-700 ">
            <p className="text-sm font-medium">
              Successfully signed in. Redirecting to home page...
            </p>
            <LucideLoader2 className="animate-spin text-green-600 size-5 flex-shrink-0" />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={onSigninFormSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-5" />
              <Input
                placeholder="Email"
                required
                onChange={(e) =>
                  setSigninForm({ ...signinForm, email: e.target.value })
                }
                value={signinForm.email}
                type="email"
                disabled={isPending}
                className="pl-10 border-slate-300 focus:border-theme-indigo focus:ring-theme-indigo/20"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Password"
                required
                onChange={(e) =>
                  setSigninForm({ ...signinForm, password: e.target.value })
                }
                value={signinForm.password}
                type="password"
                disabled={isPending}
                className="pl-10 border-slate-300 focus:border-theme-indigo focus:ring-theme-indigo/20"
              />
            </div>
          </div>
          <Button
            className="w-full bg-gradient-to-r from-theme-indigo to-theme-medium/70 hover:from-theme-indigo/90 hover:to-theme-medium/80 text-white font-semibold py-3 rounded-lg hover:shadow-xl transition-all duration-200"
            disabled={isPending}
            size="lg"
            type="Submit"
          >
            <div className="flex items-center gap-2">SignIn</div>
          </Button>
        </form>
        <Separator className="bg-slate-200" />

        <div className="text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <button
              className="text-theme-indigo hover:text-theme-medium/80 font-semibold hover:underline cursor-pointer transition-colors"
              onClick={() => navigate("/auth/signup")}
            >
              SignUp
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
