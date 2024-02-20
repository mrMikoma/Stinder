"use server";

import { dbConnect } from "../utils/mongodb";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// References:
// - https://nextjs.org/docs/app/building-your-application/authentication
// - https://nextjs.org/docs/app/api-reference/functions/cookies
// - 

// TODO:
// - Add error handling for all functions

export async function register(formData) {
  try {
    // Validate form data
    if (!formData) {
      throw new Error("Form data is required.");
    } else if (!formData.get("username")) {
      throw new Error("Username is required.");
    } else if (!formData.get("email")) {
      throw new Error("Email is required.");
    } else if (!formData.get("password")) {
      throw new Error("Password is required.");
    }

    // Parse form data
    const validatedFormData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Connect to database
    await dbConnect();

    // Check if user exists
    let newUser = await User.findOne({
      email: validatedFormData.email,
    });
    if (newUser) {
      throw new Error("User already exists.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedFormData.password, 10);

    // Create user
    newUser = new User({
      username: validatedFormData.username,
      email: validatedFormData.email,
      password: hashedPassword,
      friends: [],
    });

    // Save user
    const savedUser = await newUser.save();
    console.log("User saved."); // debug
    return savedUser;
  } catch (error) {
    console.log(error); // debug
  }
  redirect("/auth/login");
}

export async function authenticate(formData) {
  try {
    console.log("Authenticating..."); // debug
    // Validate form data
    if (!formData) {
      throw new Error("Form data is required.");
    } else if (!formData.get("email")) {
      throw new Error("Email is required.");
    } else if (!formData.get("password")) {
      throw new Error("Password is required.");
    }

    // Parse form data
    const validatedFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Connect to database
    await dbConnect();

    // Check if user exists
    let user = await User.findOne({
      email: validatedFormData.email,
    });
    if (!user) {
      throw new Error("User doesn't exists.");
    }

    // Validate password
    const passwordIsValid = await bcrypt.compare(
      validatedFormData.password,
      user.password
    );
    if (!passwordIsValid) {
      throw new Error("Invalid credentials");
    }

    // Generate payload
    const payload = {
      userId: user._id,
    };

    // Generate JWT token
    const encryptedSessionData = jwt.sign(payload, process.env.AUTH_SECRET, {
      expiresIn: "1h",
    });

    // Set token in cookie
    cookies().set("session", encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });

    // Return user
    console.log("User authenticated!"); // debug
  } catch (error) {
    console.log(error); // debug
    // make it handle errors
  }
  redirect("/home");
}

export async function signOut() {
  try {
    console.log("Signing out..."); // debug
    // Remove session cookie
    cookies().delete("session");
    console.log("Signed out."); // debug
  } catch (error) {
    console.log(error); // debug
  }
  redirect("/");
}

export async function likeUser(userId) {
  try {
    console.log("Liking user..."); // debug
  } catch (error) {
    console.log(error); // debug
  }
}

export async function nextUser(userId) {
  try {
    console.log("Next user..."); // debug
  } catch (error) {
    console.log(error); // debug
  }
}
