"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { JOB_CATEGORIES } from "@/lib/constants";
import { createJob } from "@/lib/api";
import {
  validateJobForm,
  type JobFormErrors,
  type JobFormValues,
} from "@/lib/validators";

const initialValues: JobFormValues = {
  title: "",
  description: "",
  category: "",
  location: "",
  contactName: "",
  contactEmail: "",
};

export function JobForm() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [values, setValues] = useState<JobFormValues>(initialValues);
  const [errors, setErrors] = useState<JobFormErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateJobForm(values);

    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const job = await createJob(values);
      router.push(`/jobs/${job._id}`);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not create job.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateValue(field: keyof JobFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  if (!isLoading && !user) {
    return (
      <Card className="bg-slate-50 p-5">
        <p className="text-sm text-slate-700">You must be logged in to create a request.</p>
        <Button className="mt-4" type="button" onClick={() => router.push("/login")}>
          Log in
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {formError ? <ErrorMessage message={formError} /> : null}
      <Input
        label="Title"
        value={values.title}
        error={errors.title}
        onChange={(event) => updateValue("title", event.target.value)}
      />
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Description</span>
        <textarea
          value={values.description}
          onChange={(event) => updateValue("description", event.target.value)}
          rows={6}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        />
        {errors.description ? (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        ) : null}
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Category"
          value={values.category}
          onChange={(event) => updateValue("category", event.target.value)}
        >
          <option value="">Select category</option>
          {JOB_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Input
          label="Location"
          value={values.location}
          onChange={(event) => updateValue("location", event.target.value)}
        />
        <Input
          label="Contact name"
          value={values.contactName}
          onChange={(event) => updateValue("contactName", event.target.value)}
        />
        <Input
          label="Contact email"
          type="email"
          value={values.contactEmail}
          error={errors.contactEmail}
          onChange={(event) => updateValue("contactEmail", event.target.value)}
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create request"}
        </Button>
      </div>
    </form>
  );
}
