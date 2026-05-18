import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
      <h1 className="text-xl font-black text-black">Page not found</h1>
      <Link href="/" className="mt-4 inline-block text-sm font-bold text-black hover:text-neutral-600">
        Back to requests
      </Link>
    </div>
  );
}
