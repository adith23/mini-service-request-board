import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function validate(req: Request, res: Response, next: NextFunction): void {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  res.status(400).json({
    error: {
      message: "Validation failed",
      statusCode: 400,
      details: result.array().map((error) => ({
        field: error.type === "field" ? error.path : undefined,
        message: error.msg,
      })),
    },
  });
}
