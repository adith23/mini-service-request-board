"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/AuthProvider";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-base font-semibold text-slate-950">
          Service Request Board
        </Link>
        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">{user.name}</span>
              <Link
                href="/jobs/new"
                className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                New Request
              </Link>
              <button
                type="button"
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
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
              className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
