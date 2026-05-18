export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm font-medium text-neutral-800">
      {message}
    </div>
  );
}
