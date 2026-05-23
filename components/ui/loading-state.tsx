import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-white/10", className)} />;
}

export function LoadingState() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {["one", "two", "three"].map((item) => (
        <div key={item} className="glass-surface rounded-[1.75rem] p-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-5 h-8 w-40" />
          <Skeleton className="mt-8 h-24 w-full" />
        </div>
      ))}
    </div>
  );
}
