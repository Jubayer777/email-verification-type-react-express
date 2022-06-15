import { IUser } from './../interfaces/user.interface';
import * as mongoose from "mongoose";

const userSchema =new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
    verified: {
        type: Boolean,
        required: true,
      }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
