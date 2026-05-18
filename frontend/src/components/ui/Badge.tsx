import type { JobStatus } from "@/lib/constants";

const statusStyles: Record<JobStatus, string> = {
  Open: "border-neutral-200 bg-neutral-100 text-black",
  "In Progress": "border-black bg-black text-white",
  Closed: "border-neutral-300 bg-white text-neutral-600",
};

export function Badge({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-bold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
