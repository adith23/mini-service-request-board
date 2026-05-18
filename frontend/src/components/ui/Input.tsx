import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-black">{label}</span>
      <input
        className={`mt-2 h-12 w-full rounded-none border-0 border-b-2 border-neutral-300 bg-white px-0 text-sm text-black outline-none transition placeholder:text-neutral-400 focus:rounded-md focus:border-2 focus:border-black focus:px-3 ${className}`}
        {...props}
      />
      {error ? <p className="mt-2 text-sm text-neutral-600">{error}</p> : null}
    </label>
  );
}
