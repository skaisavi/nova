import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-nova-radial">
      <div className="pointer-events-none fixed inset-0 premium-grid opacity-45" aria-hidden="true" />
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-nova-ink">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-semibold">NOVA</span>
            <span className="block text-xs text-muted-foreground">Secure command centre</span>
          </span>
        </Link>
      </nav>
      <div className="relative z-10 flex min-h-[calc(100vh-5.75rem)] items-center px-4 pb-16 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}
