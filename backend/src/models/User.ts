import bcrypt from "bcryptjs";
import { Schema, model, type HydratedDocument, type Model } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface UserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserDocument = HydratedDocument<User, UserMethods>;
type UserModel = Model<User, unknown, UserMethods>;

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [120, "Name cannot exceed 120 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [254, "Email cannot exceed 254 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
  },
  {
    collection: "users",
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  },
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<User, UserModel>("User", userSchema);
