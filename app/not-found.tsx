import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-white px-6 py-10 text-[#111827]">
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
            404
          </p>
          <h1 className="mb-4 text-3xl font-bold">Page not found</h1>
          <p className="mb-6 text-[#64748b]">
            The page you requested could not be found.
          </p>
          <Link
            className="inline-flex rounded-full border border-[#d9e2ee] bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
            href="/uz"
          >
            Go to Home
          </Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
