import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define user schema
const chatSchema = new mongoose.Schema(
  {
    senderID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
