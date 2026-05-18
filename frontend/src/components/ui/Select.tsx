import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export function Select({ label, error, children, className = "", ...props }: SelectProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-black">{label}</span>
      <select
        className={`mt-2 h-12 w-full rounded-none border-0 border-b-2 border-neutral-300 bg-white px-0 text-sm text-black outline-none transition focus:rounded-md focus:border-2 focus:border-black focus:px-3 disabled:text-neutral-400 ${className}`}
        {...props}
      >
        {children}
      </select>
      {error ? <p className="mt-2 text-sm text-neutral-600">{error}</p> : null}
    </label>
  );
}
