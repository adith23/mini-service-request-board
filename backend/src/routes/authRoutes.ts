import { Router } from "express";
import { body } from "express-validator";

import { getCurrentUser, login, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const emailAndPasswordValidators = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters"),
];

router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ max: 120 })
      .withMessage("Name cannot exceed 120 characters"),
    ...emailAndPasswordValidators,
    validate,
  ],
  register,
);

router.post("/login", [...emailAndPasswordValidators, validate], login);
router.get("/me", requireAuth, getCurrentUser);

export default router;
