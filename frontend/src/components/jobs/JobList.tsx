import { JobCard } from "@/components/jobs/JobCard";
import type { JobRequest } from "@/lib/api";

export function JobList({ jobs }: { jobs: JobRequest[] }) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-500">
        No job requests found.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}
