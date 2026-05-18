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
      <Card className="bg-neutral-50 p-5 shadow-none">
        <p className="text-sm font-medium text-neutral-700">
          You must be logged in to create a request.
        </p>
        <Button className="mt-4" type="button" onClick={() => router.push("/login")}>
          Log in
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {formError ? <ErrorMessage message={formError} /> : null}
      <Input
        label="Title *"
        value={values.title}
        error={errors.title}
        onChange={(event) => updateValue("title", event.target.value)}
      />
      <label className="block">
        <span className="text-sm font-bold text-black">Description *</span>
        <textarea
          value={values.description}
          onChange={(event) => updateValue("description", event.target.value)}
          rows={6}
          className="mt-2 w-full rounded-none border-0 border-b-2 border-neutral-300 bg-white px-0 py-3 text-sm leading-6 text-black outline-none transition placeholder:text-neutral-400 focus:rounded-md focus:border-2 focus:border-black focus:px-3"
        />
        {errors.description ? (
          <p className="mt-2 text-sm text-neutral-600">{errors.description}</p>
        ) : null}
      </label>
      <div className="grid gap-6 sm:grid-cols-2">
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
      <div className="grid gap-3 border-t border-neutral-200 pt-6 sm:grid-cols-[1fr_2fr]">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </form>
  );
}
