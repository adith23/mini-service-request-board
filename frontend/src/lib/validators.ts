import { JOB_STATUSES, type JobStatus } from "./constants";

export interface JobFormValues {
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
}

export type JobFormErrors = Partial<Record<keyof JobFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateJobForm(values: JobFormValues): JobFormErrors {
  const errors: JobFormErrors = {};

  if (values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  if (values.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters.";
  }

  if (values.contactEmail && !EMAIL_PATTERN.test(values.contactEmail)) {
    errors.contactEmail = "Enter a valid email address.";
  }

  return errors;
}

export function isJobStatus(value: string): value is JobStatus {
  return JOB_STATUSES.includes(value as JobStatus);
}
