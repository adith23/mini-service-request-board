import { Card } from "@/components/ui/Card";
import { JobForm } from "@/components/jobs/JobForm";

export default function NewJobPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-950">Create service request</h1>
        <p className="mt-1 text-sm text-slate-600">
          Add the details a tradesperson needs before contacting you.
        </p>
      </div>
      <Card className="p-6">
        <JobForm />
      </Card>
    </section>
  );
}
