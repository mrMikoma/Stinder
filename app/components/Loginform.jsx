"use client";

import { authenticate } from "../../utils/actions";
import { useFormState, useFormStatus } from "react-dom";

export const Loginform = () => {
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
    <div>
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
  );
};

//export default Registerform;
