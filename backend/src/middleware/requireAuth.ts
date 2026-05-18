import type { NextFunction, Request, Response } from "express";

import { UserModel } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyAuthToken, type JwtPayload } from "../utils/jwt.js";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const token = readBearerToken(req.headers.authorization);

  if (!token) {
    next(new ApiError(401, "Authentication required"));
    return;
  }

  try {
    const payload = verifyAuthToken(token);
    const userExists = await UserModel.exists({ _id: payload.sub });

    if (!userExists) {
      next(new ApiError(401, "Authentication required"));
      return;
    }

    req.user = payload;
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
}

function readBearerToken(header: string | undefined): string | null {
  if (!header?.startsWith("Bearer ")) {
    return null;
  }

  return header.slice("Bearer ".length).trim() || null;
}
