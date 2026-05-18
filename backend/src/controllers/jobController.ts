import type { RequestHandler } from "express";

import {
  JobRequestModel,
  type JobRequest,
  type JobStatus,
} from "../models/JobRequest.js";
import { ApiError } from "../utils/ApiError.js";

interface JobQuery {
  category?: string;
  status?: JobStatus;
  search?: string;
}

interface CreateJobBody {
  title: string;
  description: string;
  category?: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
}

interface UpdateStatusBody {
  status: JobStatus;
}

export const listJobs: RequestHandler<unknown, unknown, unknown, JobQuery> =
  async (req, res) => {
    const filter: Partial<Pick<JobRequest, "category" | "status">> & {
      $text?: { $search: string };
    } = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    const jobs = await JobRequestModel.find(filter).sort({ createdAt: -1 }).lean();

    res.status(200).json(jobs);
  };

export const getJobById: RequestHandler<{ id: string }> = async (req, res) => {
  const job = await JobRequestModel.findById(req.params.id).lean();

  if (!job) {
    throw new ApiError(404, "Job request not found");
  }

  res.status(200).json(job);
};

export const createJob: RequestHandler<unknown, unknown, CreateJobBody> = async (
  req,
  res,
) => {
  const job = await JobRequestModel.create(req.body);

  res.status(201).json(job.toObject());
};

export const updateJobStatus: RequestHandler<
  { id: string },
  unknown,
  UpdateStatusBody
> = async (req, res) => {
  const job = await JobRequestModel.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true },
  ).lean();

  if (!job) {
    throw new ApiError(404, "Job request not found");
  }

  res.status(200).json(job);
};

export const deleteJob: RequestHandler<{ id: string }> = async (req, res) => {
  const job = await JobRequestModel.findByIdAndDelete(req.params.id).lean();

  if (!job) {
    throw new ApiError(404, "Job request not found");
  }

  // 204 intentionally has no response body.
  res.status(204).send();
};
