import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf0e6] px-6 py-16 text-stone-900">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-600">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-stone-700 sm:text-lg">
          The page you were looking for does not exist or may have been moved.
        </p>
        <div className="mt-8">
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
