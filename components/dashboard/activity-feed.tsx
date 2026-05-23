import { ActivityItem } from "@/components/dashboard/activity-item";
import { EmptyState } from "@/components/ui/empty-state";
import { RealtimeIndicator } from "@/components/ui/live-indicator";
import type { Activity } from "@/lib/types";

export function ActivityFeed({ activities, live = false }: { activities: Activity[]; live?: boolean }) {
  return (
    <div className="space-y-4">
      {live ? (
        <div className="flex justify-end">
          <RealtimeIndicator />
        </div>
      ) : null}
      {activities.length ? (
        activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)
      ) : (
        <EmptyState title="No activity yet" description="Workspace events, comments, and task movement will appear here." />
      )}
    </div>
  );
}
