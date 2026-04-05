"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf0e6] px-6 py-16 text-stone-900">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-600">
          Something went wrong
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          We hit an unexpected error
        </h1>
        <p className="mt-4 text-base leading-7 text-stone-700 sm:text-lg">
          {error.message || "Please try refreshing or head back to the home page."}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-full bg-stone-950 px-5 py-2.5 text-sm font-medium text-[#faf0e6] transition-colors hover:bg-stone-800"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-stone-900 px-5 py-2.5 text-sm font-medium text-stone-950 transition-colors hover:bg-stone-900 hover:text-[#faf0e6]"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
