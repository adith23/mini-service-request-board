"use client";

import { useEffect, useState } from "react";

import { CategoryFilter } from "@/components/jobs/CategoryFilter";
import { JobList } from "@/components/jobs/JobList";
import { KeywordSearch } from "@/components/jobs/KeywordSearch";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { getJobs, type JobRequest } from "@/lib/api";

export default function HomePage() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let ignore = false;

    async function loadJobs() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getJobs({
          category,
          search: debouncedSearch.length >= 2 ? debouncedSearch : undefined,
        });
        if (!ignore) {
          setJobs(data);
        }
      } catch (loadError) {
        if (!ignore) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load jobs.",
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      ignore = true;
    };
  }, [category, debouncedSearch]);

  return (
    <section className="grid gap-8">
      <div className="flex flex-col gap-5 border-b border-neutral-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-black sm:text-2xl">
            Open service requests
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white">
            Browse homeowner requests and manage their workflow status.
          </p>
        </div>
        <div className="grid w-full gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:w-[34rem] sm:grid-cols-[1fr_15rem]">
          <KeywordSearch value={search} onChange={setSearch} />
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
      </div>
      {error ? <ErrorMessage message={error} /> : null}
      {isLoading ? (
        <LoadingSpinner label="Loading jobs" />
      ) : (
        <JobList jobs={jobs} />
      )}
    </section>
  );
}
