import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  friends: [String],
});

export default mongoose.models.User || mongoose.model('User', userSchema);