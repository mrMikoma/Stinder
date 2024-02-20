import mongoose from "mongoose";

// Declare a global variables
const { MONGODB_URI } = process.env;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined.");
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null };
}

// Function to connect to database
export const dbConnect = async () => {
  if (cached.conn) return cached.conn;
  cached.conn = await mongoose.connect(MONGODB_URI);
  return cached.conn;
};
