"use server";

import { signIn } from "../auth";
import clientPromise from "../utils/mongodb";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function authenticate(formData) {
  try {
    console.log("logging in"); // debug
    await signIn("credentials", formData);
    console.log("logging in successfull"); // debug
  } catch (error) {
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
  redirect("/home");
}

export async function register(formData) {
  try {
    console.log("registering"); // debug

    const client = await clientPromise;
    const users = client.db(process.env.DB_NAME).collection("users");

    const password = bcrypt.hashSync("password", 10);
    const user = {
      username: "admin12",
      email: "asd@asd.fi",
      password: password,
    };
    await users.insertOne(user);
    console.log("admin user created"); // debug
  } catch (error) {
    if (error) {
      switch (error.type) {
        case "RegisterError":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
  redirect("/api/auth/signin");
}
