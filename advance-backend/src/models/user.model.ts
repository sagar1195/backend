import { Schema, model } from "mongoose";
import { IUser } from "../types/user.type.js";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: [20, "Name cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
