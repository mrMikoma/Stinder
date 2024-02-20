import mongoose from "mongoose";

// Define user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    goodFriends: [String],
    loveFriends: [String],
    notFriends: [String],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
