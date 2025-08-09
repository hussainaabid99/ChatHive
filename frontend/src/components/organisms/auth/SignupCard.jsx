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
  Lock,
  LucideLoader2,
  Mail,
  TriangleAlert,
  User,
  CheckCircle,
} from "lucide-react";
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
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-6">
        <div className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-slate-900">
            SignUp
          </CardTitle>
          <CardDescription className="text-slate-600">
            Signup to create your account
          </CardDescription>
        </div>

        {validationError && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-3 text-red-700">
            <TriangleAlert className="size-5 flex-shrink-0" />
            <p className="text-sm font-medium">{validationError.message}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center gap-3 text-red-700">
            <TriangleAlert className="size-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error.message}</p>
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-3 text-green-700">
            <CheckCircle className="size-5 flex-shrink-0" />
            <p className="text-sm font-medium">
              Account created successfully! Redirecting to sign in...
            </p>
            <LucideLoader2 className="animate-spin text-green-600 size-5 flex-shrink-0" />
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={onSignupFormSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Choose a username"
                required
                onChange={(e) =>
                  setSignupForm({ ...signupForm, username: e.target.value })
                }
                value={signupForm.username}
                type="text"
                disabled={isPending}
                className="pl-10 border-slate-300 focus:border-theme-indigo focus:ring-theme-indigo/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Enter your email"
                required
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
                value={signupForm.email}
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
                placeholder="Create a password"
                required
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
                value={signupForm.password}
                type="password"
                disabled={isPending}
                className="pl-10 border-slate-300 focus:border-theme-indigo focus:ring-theme-indigo/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Confirm your password"
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
                className="pl-10 border-slate-300 focus:border-theme-indigo focus:ring-theme-indigo/20"
              />
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-theme-indigo to-theme-medium hover:from-theme-indigo/90 hover:to-theme-medium/90 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isPending}
            size="lg"
            type="submit"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <LucideLoader2 className="animate-spin size-5" />
                Creating account...
              </div>
            ) : (
              <div className="flex items-center gap-2">Create Account</div>
            )}
          </Button>
        </form>

        <Separator className="bg-slate-200" />

        <div className="text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <button
              className="text-theme-indigo hover:text-theme-medium font-semibold hover:underline transition-colors"
              onClick={() => navigate("/auth/signin")}
            >
              SignIn
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
