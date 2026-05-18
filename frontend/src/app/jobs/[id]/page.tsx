"use client";

import { useParams } from "next/navigation";

import { JobDetail } from "@/components/jobs/JobDetail";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();

  return <JobDetail id={params.id} />;
}
