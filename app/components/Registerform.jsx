"use client";
import React from "react";
import { register } from "../../utils/actions";

export const Registerform = () => {
  const createUser = async (formData) => {
    const user = await register(formData);
    if (user) {
      console.log("User created: ", user); // debug
    } else {
      console.log("User not created."); // debug
    }
  };

  return (
    <div>
      <form action={createUser}>
        <div className="text-3xl font-bold mb-4 flex flex-col">
          <input
            type="username"
            name="username"
            placeholder="Username"
            required
          />
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </div>
      </form>
      
    </div>
  );
};

//export default Registerform; 
