import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md">
      <div className="mb-8 border-b border-neutral-200 pb-6 text-center">
        <h1 className="text-4xl font-black tracking-tight text-black">
          Login or Register
        </h1>
        <p className="mt-3 text-base leading-7 text-black">
          Login or Register to post new requests or delete existing ones.
        </p>
      </div>
      <AuthForm />
    </section>
  );
}
