import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { JobRequest } from "@/lib/api";

export function JobCard({ job }: { job: JobRequest }) {
  return (
    <Card className="p-5 transition hover:border-neutral-400 hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Link
            href={`/jobs/${job._id}`}
            className="block text-xl font-black leading-tight text-black hover:text-neutral-600"
          >
            {job.title}
          </Link>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-600">
            {job.description}
          </p>
        </div>
        <Badge status={job.status} />
      </div>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-neutral-100 pt-4 text-xs font-semibold uppercase text-neutral-500">
        {job.category ? <span>{job.category}</span> : null}
        {job.location ? <span>{job.location}</span> : null}
        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="mt-4 flex justify-end">
        <Link
          href={`/jobs/${job._id}`}
          className="text-sm font-bold text-black transition hover:text-neutral-600"
        >
          View Details -&gt;
        </Link>
      </div>
    </Card>
  );
}
