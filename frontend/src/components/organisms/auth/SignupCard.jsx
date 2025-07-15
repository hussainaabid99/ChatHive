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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignupCard = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const navigate = useNavigate();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Signup to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-3">
          <Input
            placeholder="Email"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
            value={signupForm.email}
            type="email"
            disabled={false}
          />
          <Input
            placeholder="Password"
            required
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
            value={signupForm.password}
            type="password"
            disabled={false}
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
            disabled={false}
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
            disabled={false}
          />
          <Button disabled={false} size="lg" type="Submit" className="w-full">
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
