"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isSignup = mode === "signup";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const fullName = String(formData.get("full_name") ?? "").trim();

    const result = isSignup
      ? await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo:
              typeof window !== "undefined"
                ? `${window.location.origin}/auth/callback`
                : undefined,
          },
        })
      : await supabase.auth.signInWithPassword({ email, password });

    setIsLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (isSignup && !result.data.session) {
      setNotice("Check your email to confirm your account, then log in.");
      return;
    }

    router.refresh();
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {isSignup ? (
        <label className="block">
          <span className="text-sm font-medium text-viva-ink">Full name</span>
          <input
            name="full_name"
            type="text"
            autoComplete="name"
            className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm outline-none transition focus:border-viva-green focus:ring-viva-green"
            placeholder="Richard Hardy"
          />
        </label>
      ) : null}

      <label className="block">
        <span className="text-sm font-medium text-viva-ink">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm outline-none transition focus:border-viva-green focus:ring-viva-green"
          placeholder="you@business.com"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-viva-ink">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete={isSignup ? "new-password" : "current-password"}
          className="mt-2 w-full rounded-lg border-viva-line bg-white px-4 py-3 text-viva-ink shadow-sm outline-none transition focus:border-viva-green focus:ring-viva-green"
          placeholder="At least 6 characters"
        />
      </label>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {notice ? (
        <div className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-800">
          {notice}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-viva-green px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Working..." : isSignup ? "Create account" : "Log in"}
      </button>

      <p className="text-center text-sm text-viva-muted">
        {isSignup ? "Already have an account?" : "New to Viva?"}{" "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-semibold text-viva-green hover:text-teal-800"
        >
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
