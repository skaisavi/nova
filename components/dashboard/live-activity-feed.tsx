"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ActivityItem } from "@/components/dashboard/activity-item";
import { EmptyState } from "@/components/ui/empty-state";
import { RealtimeIndicator } from "@/components/ui/live-indicator";
import { subscribeToRealtimeChannel, unsubscribeFromRealtimeChannel } from "@/lib/realtime-client";
import { realtimeEvents, type ActivityCreatedPayload, type RealtimeStatus } from "@/lib/realtime";
import type { Activity } from "@/lib/types";

function mapPayloadToActivity(payload: ActivityCreatedPayload): Activity {
  return {
    id: payload.id,
    type: payload.type,
    actor: payload.user?.name ?? "NOVA",
    message: payload.message,
    timestamp: "Just now",
    context: payload.context ?? undefined
  };
}

export function LiveActivityFeed({
  channelName,
  initialActivities,
  live = true
}: {
  channelName: string;
  initialActivities: Activity[];
  live?: boolean;
}) {
  const [activities, setActivities] = useState(initialActivities);
  const [status, setStatus] = useState<RealtimeStatus>("connecting");
  const seenIds = useMemo(() => new Set(activities.map((activity) => activity.id)), [activities]);

  useEffect(() => {
    setActivities(initialActivities);
  }, [initialActivities]);

  useEffect(() => {
    const channel = subscribeToRealtimeChannel(channelName);

    if (!channel) {
      setStatus("offline");
      return;
    }

    setStatus("live");

    const handleActivityCreated = (payload: ActivityCreatedPayload) => {
      setActivities((current) => {
        if (current.some((activity) => activity.id === payload.id)) {
          return current;
        }

        return [mapPayloadToActivity(payload), ...current].slice(0, 20);
      });
    };

    channel.bind(realtimeEvents.workspaceActivityCreated, handleActivityCreated);
    channel.bind(realtimeEvents.projectActivityCreated, handleActivityCreated);

    return () => {
      channel.unbind(realtimeEvents.workspaceActivityCreated, handleActivityCreated);
      channel.unbind(realtimeEvents.projectActivityCreated, handleActivityCreated);
      unsubscribeFromRealtimeChannel(channelName);
    };
  }, [channelName]);

  return (
    <div className="space-y-4">
      {live ? (
        <div className="flex justify-end">
          <RealtimeIndicator status={status} label={status === "live" ? "Live" : status === "connecting" ? "Connecting" : "Realtime offline"} />
        </div>
      ) : null}
      {activities.length ? (
        <AnimatePresence initial={false}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={seenIds.has(activity.id) ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22 }}
            >
              <ActivityItem activity={activity} />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <EmptyState title="No activity yet" description="Workspace events, comments, and task movement will appear here." />
      )}
    </div>
  );
}
