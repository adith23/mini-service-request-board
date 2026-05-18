import { Router } from "express";
import { body, param, query } from "express-validator";

import {
  createJob,
  deleteJob,
  getJobById,
  listJobs,
  updateJobStatus,
} from "../controllers/jobController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validate.js";
import { JOB_STATUSES } from "../models/JobRequest.js";

const router = Router();

const mongoIdParam = [
  param("id").isMongoId().withMessage("Job id must be a valid MongoDB id"),
  validate,
];

const listJobValidators = [
  query("category")
    .optional()
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage("Category must be between 1 and 60 characters"),
  query("status")
    .optional()
    .isIn(JOB_STATUSES)
    .withMessage("Status must be Open, In Progress, or Closed"),
  query("search")
    .optional()
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage("Search must be between 2 and 120 characters"),
  validate,
];

const createJobValidators = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 120 })
    .withMessage("Title must be between 3 and 120 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 2_000 })
    .withMessage("Description must be between 10 and 2000 characters"),
  body("category")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 60 })
    .withMessage("Category cannot exceed 60 characters"),
  body("location")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 120 })
    .withMessage("Location cannot exceed 120 characters"),
  body("contactName")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 120 })
    .withMessage("Contact name cannot exceed 120 characters"),
  body("contactEmail")
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Contact email must be a valid email address")
    .isLength({ max: 254 })
    .withMessage("Contact email cannot exceed 254 characters")
    .normalizeEmail(),
  body("status")
    .not()
    .exists()
    .withMessage("Status cannot be set when creating a job"),
  validate,
];

const updateStatusValidators = [
  ...mongoIdParam,
  body().custom((value) => {
    const allowedFields = ["status"];
    const receivedFields = Object.keys(value ?? {});

    return receivedFields.every((field) => allowedFields.includes(field));
  }).withMessage("Only status can be updated"),
  body("status")
    .exists()
    .withMessage("Status is required")
    .isIn(JOB_STATUSES)
    .withMessage("Status must be Open, In Progress, or Closed"),
  validate,
];

router.get("/", listJobValidators, listJobs);
router.get("/:id", mongoIdParam, getJobById);
router.post("/", requireAuth, createJobValidators, createJob);
router.patch("/:id", updateStatusValidators, updateJobStatus);
router.delete("/:id", requireAuth, mongoIdParam, deleteJob);

export default router;
