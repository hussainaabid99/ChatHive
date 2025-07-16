import { useEffect, useState } from "react";
import { SignupCard } from "./SignupCard";
import { useSignup } from "@/hooks/apis/auth/useSignup";
import { useNavigate } from "react-router-dom";

export const SignupContainer = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const navigate = useNavigate();

  const { isPending, isSuccess, error, signupMutation } = useSignup();

  const [validationError, setValidationError] = useState(null);

  async function onSignupFormSubmit(e) {
    e.preventDefault();
    console.log("Signup form submitted", signupForm);

    if (
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      setValidationError({ message: "All fields are required" });
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setValidationError({ message: "Passwords do not match" });
      return;
    }

    setValidationError(null);

    await signupMutation({
      email: signupForm.email,
      password: signupForm.password,
      username: signupForm.username,
    });
  }

  useEffect(() => {
    if (isSuccess)
      setTimeout(() => {
        navigate("/auth/signin");
      }, 2000);
  }, [isSuccess]);

  return (
    <SignupCard
      signupForm={signupForm}
      setSignupForm={setSignupForm}
      onSignupFormSubmit={onSignupFormSubmit}
      isSuccess={isSuccess}
      isPending={isPending}
      error={error}
      validationError={validationError}
    />
  );
};
