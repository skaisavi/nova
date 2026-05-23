import { LoadingState } from "@/components/ui/loading-state";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
        <div className="mt-4 h-12 w-full max-w-2xl animate-pulse rounded-3xl bg-white/10" />
      </div>
      <LoadingState />
    </div>
  );
}
