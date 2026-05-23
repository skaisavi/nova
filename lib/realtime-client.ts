"use client";

import Pusher, { type Channel } from "pusher-js";
import { isRealtimeClientConfigured } from "@/lib/realtime";

let pusherClient: Pusher | null = null;

export function getRealtimeClient() {
  if (!isRealtimeClientConfigured()) {
    return null;
  }

  if (!pusherClient) {
    pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? "", {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "eu"
    });
  }

  return pusherClient;
}

export function subscribeToRealtimeChannel(channelName: string) {
  const client = getRealtimeClient();

  if (!client) {
    return null;
  }

  return client.subscribe(channelName);
}

export function unsubscribeFromRealtimeChannel(channelName: string) {
  pusherClient?.unsubscribe(channelName);
}

export type RealtimeChannel = Channel;
