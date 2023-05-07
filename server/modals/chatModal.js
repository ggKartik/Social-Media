const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: [
      {
        sender: {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          },
          avatarUrl: {
            type: String,
            required: true,
          },
        },
        receiver: {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          firstName: {
            type: String,
            required: true,
          },
          lastName: {
            type: String,
            required: true,
          },
          avatarUrl: {
            type: String,
            required: true,
          },
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", chatSchema);
