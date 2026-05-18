export const JOB_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Painting",
  "Joinery",
] as const;

export const JOB_STATUSES = ["Open", "In Progress", "Closed"] as const;

export type JobCategory = (typeof JOB_CATEGORIES)[number];
export type JobStatus = (typeof JOB_STATUSES)[number];
