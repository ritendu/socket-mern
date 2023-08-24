const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    chatRoomId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
