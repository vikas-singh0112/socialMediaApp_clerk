import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
  participants: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  lastMessage: {
    type: String,
  },
  deletedBy: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      deletedAt: { type: Date, default: Date.now },
    },
  ],
});

export const Conversation = mongoose.model("Conversation", conversationSchema);
