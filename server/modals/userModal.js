const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password Should Be More Than 8 Character"],
      select: false,
    },

    confirmPassword: {
      type: String,
      required: true,
      select: false,
    },

    country: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
    },
    twitter: {
      type: String,
    },
    viewedProfile: {
      type: Number,
      default: Math.floor(Math.random() * 1000),
    },
    impressions: {
      type: Number,
      default: Math.floor(Math.random() * 1000),
    },

    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    friends: [
      {
        user: {
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
        occupation: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//hsahing password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 6);
  this.confirmPassword = this.password;
});

module.exports = mongoose.model("User", userSchema);
