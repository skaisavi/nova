"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { RealtimeIndicator } from "@/components/ui/live-indicator";
import { createCommentAction } from "@/lib/actions";
import { subscribeToRealtimeChannel, unsubscribeFromRealtimeChannel } from "@/lib/realtime-client";
import { realtimeEvents, type ProjectCommentCreatedPayload, type RealtimeStatus } from "@/lib/realtime";
import { commentSchema, type CommentInput } from "@/lib/validations/comment";
import { formatDate } from "@/lib/utils";
import type { ProjectComment } from "@/lib/queries/projects";

function mapPayloadToComment(payload: ProjectCommentCreatedPayload): ProjectComment {
  return {
    id: payload.id,
    projectId: payload.projectId,
    body: payload.body,
    author: payload.author.name ?? "NOVA teammate",
    createdAt: payload.createdAt
  };
}

export function LiveProjectComments({
  channelName,
  initialComments,
  projectId
}: {
  channelName: string;
  initialComments: ProjectComment[];
  projectId: string;
}) {
  const [comments, setComments] = useState(initialComments);
  const [message, setMessage] = useState<string>();
  const [status, setStatus] = useState<RealtimeStatus>("connecting");
  const [isPending, startTransition] = useTransition();
  const seenIds = useMemo(() => new Set(comments.map((comment) => comment.id)), [comments]);
  const form = useForm<CommentInput>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      projectId,
      body: ""
    }
  });

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  useEffect(() => {
    const channel = subscribeToRealtimeChannel(channelName);

    if (!channel) {
      setStatus("offline");
      return;
    }

    setStatus("live");

    const handleCommentCreated = (payload: ProjectCommentCreatedPayload) => {
      if (payload.projectId !== projectId || payload.taskId) {
        return;
      }

      setComments((current) => {
        if (current.some((comment) => comment.id === payload.id)) {
          return current;
        }

        return [mapPayloadToComment(payload), ...current];
      });
    };

    channel.bind(realtimeEvents.projectCommentCreated, handleCommentCreated);

    return () => {
      channel.unbind(realtimeEvents.projectCommentCreated, handleCommentCreated);
      unsubscribeFromRealtimeChannel(channelName);
    };
  }, [channelName, projectId]);

  function submit(values: CommentInput) {
    startTransition(async () => {
      const result = await createCommentAction({ ...values, projectId });
      setMessage(result.message);

      if (result.ok) {
        form.reset({ projectId, body: "" });
      }
    });
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Project comments</h2>
        <RealtimeIndicator status={status} label={status === "live" ? "Live" : status === "connecting" ? "Connecting" : "Realtime offline"} />
      </div>
      <form onSubmit={form.handleSubmit(submit)} className="mb-5 space-y-3">
        <textarea
          className="min-h-24 w-full resize-none rounded-3xl border border-white/10 bg-white/[0.08] px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          placeholder="Add a project note..."
          {...form.register("body")}
        />
        {form.formState.errors.body ? <p className="text-xs text-rose-200">{form.formState.errors.body.message}</p> : null}
        {message ? <p className="text-xs text-muted-foreground" role="status">{message}</p> : null}
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
          Add comment
        </Button>
      </form>
      <div className="space-y-3">
        {comments.length ? (
          <AnimatePresence initial={false}>
            {comments.map((comment) => (
              <motion.article
                key={comment.id}
                className="rounded-3xl border border-white/10 bg-white/[0.075] p-4 shadow-inset"
                initial={seenIds.has(comment.id) ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-sm leading-6 text-muted-foreground">{comment.body}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {comment.author} - {formatDate(comment.createdAt)}
                </p>
              </motion.article>
            ))}
          </AnimatePresence>
        ) : (
          <EmptyState title="No project comments yet" description="Project-level discussion will appear here once collaborators add notes." />
        )}
      </div>
    </div>
  );
}
