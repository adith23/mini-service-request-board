import type { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

import { config } from "../config/index.js";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = resolveStatusCode(error);
  const message =
    statusCode === 500 && config.isProduction
      ? "Internal server error"
      : error.message || "Internal server error";

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      ...(config.isProduction ? {} : { stack: error.stack }),
    },
  });
};

function resolveStatusCode(error: unknown): number {
  if (error instanceof ApiError) {
    return error.statusCode;
  }

  if (error instanceof mongoose.Error.CastError) {
    return 400;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return 422;
  }

  return 500;
}
