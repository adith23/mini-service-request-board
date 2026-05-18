import { JobCard } from "@/components/jobs/JobCard";
import type { JobRequest } from "@/lib/api";

export function JobList({ jobs }: { jobs: JobRequest[] }) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-300 bg-white px-6 py-14 text-center text-sm font-medium text-neutral-500">
        No job requests found.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}
