"use server";

import { signIn } from "@/auth";
import clientPromise from "../utils/mongodb";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { User, Profile } from "../models/User";

// References:
// - https://nextjs.org/docs/app/building-your-application/authentication
// - https://next-auth.js.org/providers/credentials

// TODO:
// - Add error handling with failed login
// - Add error handling with failed registration

export async function authenticate(formData) {
  try {
    await signIn("credentials", formData);
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
}

export async function register(formData) {
  try {
    console.log("registering..."); // debug
    console.log(formData); // debug

    const validatedFields = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("validoitu: " + validatedFields); // debug

    // Validate form data
    if (
      !validatedFields.username ||
      !validatedFields.email ||
      !validatedFields.password
    ) {
      throw new RegisterError("Invalid credentials.");
    }

    console.log("here...?"); // debug

    // Connect to the database
    const client = await clientPromise;
    const users = client.db(process.env.DB_NAME).collection("users");

    console.log("here..2..?"); // debug

    // Check if user exists
    const userExists = await users.findOne({ email: validatedFields.email });
    if (userExists) {
      console.log("User already exists."); // debug
      throw new RegisterError("User already exists.");
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(validatedFields.password, 10);

    console.log("here..3..?"); // debug

    // Create new user
    const newUser = new User({
      username: validatedFields.username,
      email: validatedFields.email,
      password: hashedPassword,
      verifyToken: null,
      verifyTokenExpiry: null,
      friends: [],
    });

    console.log("here..4..?"); // debug

    // Insert user to database
    try {
      await newUser.save();
    } catch (error) {
      console.log("Error: ", error); // debug
    }

    console.log("New user created successfully!"); // debug
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

export async function likeUser(userId) {
  try {
    console.log("liking user..."); // debug
    console.log(userId); // debug
  } catch (error) {
    if (error) {
      switch (error.type) {
        case "LikeError":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function nextUser(userId) {
  try {
    console.log("getting next user..."); // debug
    const users = await User.find();

    // Print all users
    users.forEach((user) => {
      console.log(user);
    });

    console.log("All users logged."); // debug
  } catch (error) {
    if (error) {
      switch (error.type) {
        case "NextUserError":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
