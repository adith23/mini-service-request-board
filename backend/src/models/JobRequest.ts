import { Schema, model, type HydratedDocument, type Model } from "mongoose";

export const JOB_STATUSES = ["Open", "In Progress", "Closed"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export const JOB_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Painting",
  "Joinery",
] as const;
export type JobCategory = (typeof JOB_CATEGORIES)[number];

export interface JobRequest {
  title: string;
  description: string;
  category?: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
  status: JobStatus;
  createdAt: Date;
}

export type JobRequestDocument = HydratedDocument<JobRequest>;
export type JobRequestModel = Model<JobRequest>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const jobRequestSchema = new Schema<JobRequest, JobRequestModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [2_000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      trim: true,
      maxlength: [60, "Category cannot exceed 60 characters"],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [120, "Location cannot exceed 120 characters"],
    },
    contactName: {
      type: String,
      trim: true,
      maxlength: [120, "Contact name cannot exceed 120 characters"],
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [254, "Contact email cannot exceed 254 characters"],
      validate: {
        validator(value: string): boolean {
          return !value || EMAIL_PATTERN.test(value);
        },
        message: "Contact email must be a valid email address",
      },
    },
    status: {
      type: String,
      enum: {
        values: JOB_STATUSES,
        message: "Status must be Open, In Progress, or Closed",
      },
      default: "Open",
    },
  },
  {
    collection: "jobRequests",
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  },
);

// Supports common list filters required by GET /api/jobs.
jobRequestSchema.index({ category: 1, status: 1, createdAt: -1 });
jobRequestSchema.index({ createdAt: -1 });
// Bonus search: keyword lookup across the homeowner-facing request text.
jobRequestSchema.index({ title: "text", description: "text" });

export const JobRequestModel =
  model<JobRequest, JobRequestModel>("JobRequest", jobRequestSchema);
