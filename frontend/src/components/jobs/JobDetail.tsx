"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/AuthProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusDropdown } from "@/components/jobs/StatusDropdown";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import {
  deleteJob,
  getJobById,
  updateJobStatus,
  type JobRequest,
} from "@/lib/api";
import type { JobStatus } from "@/lib/constants";

export function JobDetail({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState<JobRequest | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadJob() {
      try {
        const data = await getJobById(id);
        if (!ignore) {
          setJob(data);
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError instanceof Error ? loadError.message : "Could not load job.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadJob();

    return () => {
      ignore = true;
    };
  }, [id]);

  async function handleStatusChange(status: JobStatus) {
    if (!job) {
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      setJob(await updateJobStatus(job._id, status));
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not update status.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!job || !window.confirm("Delete this job request?")) {
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await deleteJob(job._id);
      router.push("/");
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete job.");
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <LoadingSpinner label="Loading job" />;
  }

  if (error && !job) {
    return <ErrorMessage message={error} />;
  }

  if (!job) {
    return <ErrorMessage message="Job request not found." />;
  }

  return (
    <div className="grid gap-5">
      {error ? <ErrorMessage message={error} /> : null}
      <Card className="p-6">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">{job.title}</h1>
            <p className="mt-2 text-sm text-slate-500">
              Posted {new Date(job.createdAt).toLocaleString()}
            </p>
          </div>
          <Badge status={job.status} />
        </div>
        <div className="grid gap-6 py-6 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="text-sm font-semibold text-slate-950">Description</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
              {job.description}
            </p>
          </div>
          <aside className="grid gap-4 rounded-lg bg-slate-50 p-4">
            <StatusDropdown
              value={job.status}
              disabled={isSaving}
              onChange={handleStatusChange}
            />
            <DetailRow label="Category" value={job.category} />
            <DetailRow label="Location" value={job.location} />
            <DetailRow label="Contact" value={job.contactName} />
            <DetailRow label="Email" value={job.contactEmail} />
          </aside>
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
          <Button variant="secondary" onClick={() => router.push("/")}>
            Back
          </Button>
          {user ? (
            <Button variant="danger" disabled={isSaving} onClick={handleDelete}>
              {isSaving ? "Working..." : "Delete"}
            </Button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900">{value || "Not provided"}</dd>
    </div>
  );
}
