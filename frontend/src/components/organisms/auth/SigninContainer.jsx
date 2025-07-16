import { useEffect, useState } from "react";
import { SigninCard } from "./SigninCard";
import { useSignin } from "@/hooks/apis/auth/useSignin";
import { useNavigate } from "react-router-dom";

export const SigninContainer = () => {
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const { isPending, isSuccess, signinMutation, error } = useSignin();
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState(null);

  async function onSigninFormSubmit(e) {
    e.preventDefault();
    console.log("Sign in form submited", signinForm);

    if (!signinForm.email || !signinForm.password) {
      setValidationError({ message: "All fields are required" });
      return;
    }

    setValidationError(null);

    await signinMutation({
      email: signinForm.email,
      password: signinForm.password,
    });
  }

  useEffect(() => {
    if (isSuccess)
      setTimeout(() => {
        navigate("/home");
      }, 1500);
  }, [isSuccess]);

  return (
    <SigninCard
      signinForm={signinForm}
      setSigninForm={setSigninForm}
      validationError={validationError}
      isPending={isPending}
      isSuccess={isSuccess}
      error={error}
      onSigninFormSubmit={onSigninFormSubmit}
    />
  );
};
