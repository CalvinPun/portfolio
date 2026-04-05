"use client";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  return (
    <html lang="en">
      <body className="m-0 bg-[#faf0e6] font-sans text-stone-900 antialiased">
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
          <div className="max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-600">
              Application error
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              Something broke
            </h1>
            <p className="mt-4 text-base leading-7 text-stone-700 sm:text-lg">
              {error.message || "Please refresh the page and try again."}
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center rounded-full bg-stone-950 px-5 py-2.5 text-sm font-medium text-[#faf0e6] transition-colors hover:bg-stone-800"
              >
                Try again
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
