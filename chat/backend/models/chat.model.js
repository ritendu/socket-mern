const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema(
  {
    chatRoomName:{type:String},
    members: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
