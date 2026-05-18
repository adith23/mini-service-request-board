import { Card } from "@/components/ui/Card";
import { JobForm } from "@/components/jobs/JobForm";

export default function NewJobPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <h1 className="text-4xl font-black tracking-tight text-black sm:text-5xl">
          Post a Service Request
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
          Add the details a tradesperson needs before contacting you.
        </p>
      </div>
      <Card className="border-neutral-200 p-6 shadow-none sm:p-8">
        <JobForm />
      </Card>
    </section>
  );
}
