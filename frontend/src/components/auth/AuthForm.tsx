"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/AuthProvider";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type AuthMode = "login" | "register";

export function AuthForm() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (mode === "register" && !name.trim()) {
      setError("Name is required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "register") {
        await register({ name: name.trim(), email, password });
      } else {
        await login({ email, password });
      }

      router.push("/");
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="grid gap-5">
        {error ? <ErrorMessage message={error} /> : null}
        {mode === "register" ? (
          <Input label="Name" value={name} onChange={(event) => setName(event.target.value)} />
        ) : null}
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
        </Button>
      </form>
      <div className="mt-5 border-t border-slate-200 pt-5 text-sm text-slate-600">
        {mode === "login" ? "Need an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="font-medium text-slate-950 hover:text-slate-700"
          onClick={() => {
            setError("");
            setMode(mode === "login" ? "register" : "login");
          }}
        >
          {mode === "login" ? "Register" : "Log in"}
        </button>
      </div>
    </Card>
  );
}
