import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-950">Account access</h1>
        <p className="mt-1 text-sm text-slate-600">
          Log in to post new requests or delete existing ones.
        </p>
      </div>
      <AuthForm />
    </section>
  );
}
