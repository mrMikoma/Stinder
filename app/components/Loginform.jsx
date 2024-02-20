"use client";

import { authenticate } from "../../utils/actions";

export const Loginform = () => {
  const authenticateUser = async (formData) => {
    const user = await authenticate(formData);
    if (user) {
      console.log("User login: ", user); // debug
    } else {
      console.log("User not logged in."); // debug
    }
  };

  return (
    <div>
      <form action={authenticateUser}>
        <div className="text-3xl font-bold mb-4 flex flex-col">
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
};
