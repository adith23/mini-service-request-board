import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { JobRequest } from "@/lib/api";

export function JobCard({ job }: { job: JobRequest }) {
  return (
    <Card className="p-4 transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Link
            href={`/jobs/${job._id}`}
            className="block text-base font-semibold text-slate-950 hover:text-slate-700"
          >
            {job.title}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {job.description}
          </p>
        </div>
        <Badge status={job.status} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
        {job.category ? <span>{job.category}</span> : null}
        {job.location ? <span>{job.location}</span> : null}
        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
      </div>
    </Card>
  );
}
