import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["Actor", "Director", "Producer", "Writer"],
      required: true
    },

    bio: {
      type: String,
      default: ""
    },

    profilePic: {
      type: String,
      default: ""
    },

    media: [
      {
        url: String,
        key: String,
        type: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
