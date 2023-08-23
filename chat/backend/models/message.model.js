const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    chatRoomId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text"],
      default: "text",
    },
    messageSeenBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    messageStatus: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
