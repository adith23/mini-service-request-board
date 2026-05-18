import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
      <h1 className="text-xl font-semibold text-slate-950">Page not found</h1>
      <Link href="/" className="mt-4 inline-block text-sm font-medium text-slate-700">
        Back to requests
      </Link>
    </div>
  );
}
