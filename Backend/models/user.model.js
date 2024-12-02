import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // Searchable
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // API avatar URL
      required: true,
    },
    repos: {
      type: [String], // Array of programming languages
      default: [],
    },
    like: {
      type: [Number], // Integer value for likes
      default: [],
    },
    dislike: {
      type: [Number], // Integer value for dislikes
      default: [],
    },
    progLang: {
      type: [String], // Array of programming languages
      default: [],
    },
    coreInterest: {
      type: [String], // Array of interests
      default: [],
    },
    hobbies: {
      type: [String], // Array of hobbies
      default: [],
    },
    projectAssign: {
      type: [Number], // Array of integers representing assigned projects
      default: [],
    },
    contributionsTotal: {
      type: Number,
      default: 0,
    },
    projectID: {
      type: [String], // Array of integers representing project IDs
      default: [],
    },
    taskAssign: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true, // Created at and updated at
  }
);

const User = mongoose.model("User", userSchema);
export default User;