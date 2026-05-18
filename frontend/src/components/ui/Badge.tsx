import type { JobStatus } from "@/lib/constants";

const statusStyles: Record<JobStatus, string> = {
  Open: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "In Progress": "border-amber-200 bg-amber-50 text-amber-800",
  Closed: "border-slate-200 bg-slate-100 text-slate-700",
};

export function Badge({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
