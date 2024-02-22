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
    bio: {
      type: String,
      default: "No bio.",
    },
    image: {
      type: String,
      default: "/images/ai_bot_kuva_1.png",
    },
    goodFriends: [String],
    notFriends: [String],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
