const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 200,
    },
    image: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        firstName: {
          type: String,
          trim: true,
          min: 3,
        },
        lastName: {
          type: String,
          trim: true,
          min: 3,
        },
        avatarUrl: {
          type: String,
        },
        comment: {
          type: String,
          trim: true,
          max: 200,
        },
      },
    ],
    shares: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
