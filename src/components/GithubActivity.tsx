"use client";

import { useEffect, useState } from "react";
import { GitBranch, GitCommit, GitPullRequest, type LucideIcon } from "lucide-react";

type ActivityEvent = {
  type: string;
  repo: string;
  createdAt: string;
};

const EVENT_ICON: Record<string, LucideIcon> = {
  PushEvent: GitCommit,
  PullRequestEvent: GitPullRequest,
  CreateEvent: GitBranch,
};

const EVENT_LABEL: Record<string, string> = {
  PushEvent: "Pushed to",
  PullRequestEvent: "Opened a PR on",
  CreateEvent: "Created a branch on",
};

function relativeTime(isoDate: string): string {
  const diffSeconds = Math.max(Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000), 0);

  const units: [string, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [label, seconds] of units) {
    const value = Math.floor(diffSeconds / seconds);
    if (value >= 1) return `${value} ${label}${value > 1 ? "s" : ""} ago`;
  }

  return "just now";
}

export function GithubActivity() {
  const [events, setEvents] = useState<ActivityEvent[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github")
      .then((res) => res.json())
      .then((data: { events: ActivityEvent[] }) => {
        if (!cancelled) setEvents(data.events ?? []);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (events === null && !failed) {
    return (
      <div className="mt-7 space-y-2.5">
        {[0, 1, 2].map((row) => (
          <div key={row} className="h-14 animate-pulse rounded-xl border border-white/10 bg-white/[0.03]" />
        ))}
      </div>
    );
  }

  if (failed || !events || events.length === 0) {
    return <p className="mt-7 text-sm text-zinc-400">No recent activity.</p>;
  }

  return (
    <div className="mt-7 space-y-2.5">
      {events.map((event, index) => {
        const Icon = EVENT_ICON[event.type] ?? GitCommit;
        const label = EVENT_LABEL[event.type] ?? "Activity on";

        return (
          <div
            key={`${event.repo}-${index}`}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-teal-400/30 bg-teal-400/10 text-teal-300">
              <Icon size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-zinc-200">
                {label} <span className="font-medium text-white">{event.repo}</span>
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-500">{relativeTime(event.createdAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
