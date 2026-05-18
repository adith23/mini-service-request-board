"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/AuthProvider";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-3xl font-black tracking-tight text-black"
        >
          Servify
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <span className="hidden max-w-40 truncate text-sm font-medium text-neutral-500 sm:inline">
                {user.name}
              </span>
              <Link
                href="/jobs/new"
                className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                Post New Request
              </Link>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 bg-white px-3 text-sm font-semibold text-black transition hover:border-black hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
