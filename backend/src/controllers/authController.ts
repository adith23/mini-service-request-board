import type { RequestHandler } from "express";

import { UserModel } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { signAuthToken } from "../utils/jwt.js";
import type { AuthenticatedRequest } from "../middleware/requireAuth.js";

interface AuthBody {
  name?: string;
  email: string;
  password: string;
}

export const register: RequestHandler<unknown, unknown, AuthBody> = async (
  req,
  res,
) => {
  const existingUser = await UserModel.exists({ email: req.body.email });

  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(201).json(buildAuthResponse(user.id, user.name, user.email));
};

export const login: RequestHandler<unknown, unknown, AuthBody> = async (
  req,
  res,
) => {
  const user = await UserModel.findOne({ email: req.body.email }).select("+password");

  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  res.status(200).json(buildAuthResponse(user.id, user.name, user.email));
};

export const getCurrentUser: RequestHandler = async (req, res) => {
  const authReq = req as AuthenticatedRequest;

  if (!authReq.user) {
    throw new ApiError(401, "Authentication required");
  }

  const user = await UserModel.findById(authReq.user.sub).lean();

  if (!user) {
    throw new ApiError(401, "Authentication required");
  }

  res.status(200).json({
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  });
};

function buildAuthResponse(id: string, name: string, email: string) {
  return {
    token: signAuthToken({ sub: id, email }),
    user: {
      id,
      name,
      email,
    },
  };
}
