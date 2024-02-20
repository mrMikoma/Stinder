"use client";
import React from "react";
import { authenticate } from "@/utils/actions";
import { useFormState, useFormStatus } from "react-dom";

const Login = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  function LoginButton() {
    const { pending } = useFormStatus();

    return (
      <button aria-disabled={pending} type="submit">
        Login
      </button>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tinder-pink text-black relative">
      <div className="flex flex-col items-center">
        <form action={dispatch}>
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <div>{errorMessage && <p>{errorMessage}</p>}</div>
          <LoginButton />
        </form>
      </div>
    </div>
  );
};

export default Login;
