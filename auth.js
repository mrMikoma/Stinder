import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./utils/mongodb";

// TODO:
// - Add validation with zod

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      id: "credentials",
      pages: {
        signIn: "/auth/signin",
      },
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // Connect to the database
        const client = await clientPromise;
        const usersCollection = client
          .db(process.env.DB_NAME)
          .collection("users");

        console.log("credentials: ", credentials); // debug

        // Validate email
        const email = credentials?.email.toLowerCase();
        const user = await usersCollection.findOne({ email });
        if (!user) {
          console.log("User does not exist."); // debug
          throw new Error("User does not exist.");
        }

        // Validate password
        const passwordIsValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordIsValid) {
          throw new Error("Invalid credentials");
        }

        // Return user
        return {
          id: user._id.toString(),
          ...user,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
