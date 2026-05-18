import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-300",
  secondary:
    "border border-neutral-300 bg-white text-black hover:border-black hover:bg-neutral-50 disabled:text-neutral-400",
  danger:
    "border border-black bg-white text-black hover:border-2 hover:bg-neutral-50 disabled:border-neutral-300 disabled:text-neutral-400",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
