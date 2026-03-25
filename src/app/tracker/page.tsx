"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Lock, Pin, PinOff, Plus, Timer } from "lucide-react";
import {
  hasOwnerAccess,
  loadTrackerSkills,
  saveTrackerSkills,
  setOwnerAccess,
  summarizeSkills,
  type TrackerSkill,
} from "../../data/tracker-store";

const OWNER_CODE = "MRK-OWNER-2026";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const statusPill: Record<TrackerSkill["status"], string> = {
  completed: "border-emerald-300/35 bg-emerald-300/10 text-emerald-200",
  "in-progress": "border-sky-300/35 bg-sky-300/10 text-sky-200",
};

export default function TrackerPage() {
  const [mode, setMode] = useState<"owner" | "visitor">(() => (hasOwnerAccess() ? "owner" : "visitor"));
  const [skills, setSkills] = useState<TrackerSkill[]>(() =>
    loadTrackerSkills(hasOwnerAccess() ? "owner" : "visitor")
  );
  const [ownerCode, setOwnerCode] = useState("");
  const [ownerError, setOwnerError] = useState("");
  const [showAdPrompt, setShowAdPrompt] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [pinOnCreate, setPinOnCreate] = useState(false);
  const [adding, setAdding] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    if (skills.length === 0) return;
    saveTrackerSkills(mode, skills);
  }, [mode, skills]);

  const summary = useMemo(() => summarizeSkills(skills), [skills]);

  const guiltMessage =
    mode === "owner" && summary.inProgress > 0
      ? `You have ${summary.inProgress} unfinished commitment${summary.inProgress > 1 ? "s" : ""}. This tracker does not allow deleting skills. Finish what you start.`
      : null;

  const handleUnlockOwner = () => {
    if (ownerCode.trim() !== OWNER_CODE) {
      setOwnerError("Invalid owner code.");
      return;
    }

    setOwnerAccess(true);
    setMode("owner");
    setSkills(loadTrackerSkills("owner"));
    setOwnerError("");
    setOwnerCode("");
  };

  const handleSwitchToVisitor = () => {
    setOwnerAccess(false);
    setMode("visitor");
    setSkills(loadTrackerSkills("visitor"));
  };

  const handleAddSkill = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();

    if (!trimmedTitle || !trimmedCategory) return;

    setAdding(true);
    await wait(220);

    const newSkill: TrackerSkill = {
      id: `skill-${Date.now()}`,
      title: trimmedTitle,
      category: trimmedCategory,
      status: "in-progress",
      pinned: pinOnCreate,
      createdAt: new Date().toISOString(),
    };

    setSkills((prev) => [newSkill, ...prev]);
    setTitle("");
    setCategory("");
    setPinOnCreate(false);
    setAdding(false);
    setShowAdPrompt(false);
  };

  const handleComplete = async (id: string) => {
    setActionId(id);
    await wait(180);

    setSkills((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "completed",
              completedAt: new Date().toISOString(),
            }
          : item
      )
    );

    setActionId(null);
  };

  const handleTogglePin = async (id: string) => {
    setActionId(id);
    await wait(120);

    setSkills((prev) => prev.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item)));

    setActionId(null);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-20 pt-7 sm:px-8 sm:pt-8 md:px-10">
      <div className="panel">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/60">Tracker Dashboard</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Skill Accountability System
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Track any skill from coding to real-life goals. Add and complete in real-time. Skills are
              intentionally non-removable to enforce consistency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            {mode === "owner" ? (
              <button
                type="button"
                onClick={handleSwitchToVisitor}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <Lock size={15} /> Visitor Mode
              </button>
            ) : null}
          </div>
        </div>

        {mode === "visitor" ? (
          <div className="mt-6 rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-400">Owner access</p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                value={ownerCode}
                onChange={(event) => setOwnerCode(event.target.value)}
                placeholder="Enter owner code"
                className="w-full min-w-0 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/30 sm:w-auto sm:min-w-[220px]"
              />
              <button
                type="button"
                onClick={handleUnlockOwner}
                className="w-full rounded-lg bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-zinc-200 sm:w-auto"
              >
                Unlock My Tracker
              </button>
            </div>
            {ownerError ? <p className="mt-2 text-xs text-rose-300">{ownerError}</p> : null}
          </div>
        ) : null}

        {showAdPrompt && mode === "visitor" ? (
          <div className="mt-6 rounded-xl border border-sky-300/25 bg-sky-300/10 p-4">
            <p className="text-sm font-medium text-white">Want your own tracker?</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-300">
              This is a live demo with starter skills. Add your own skills and pin important ones to surface
              them on the main portfolio page.
            </p>
            <button
              type="button"
              onClick={() => setShowAdPrompt(false)}
              className="mt-3 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/10"
            >
              Start Using Tracker
            </button>
          </div>
        ) : null}

        {guiltMessage ? (
          <div className="mt-6 rounded-xl border border-amber-300/30 bg-amber-300/12 p-4 text-sm text-amber-100">
            {guiltMessage}
          </div>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-[11px] uppercase tracking-wide text-zinc-400">Total Skills</p>
            <p className="mt-1 text-2xl font-semibold text-white">{summary.total}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-[11px] uppercase tracking-wide text-zinc-400">In Progress</p>
            <p className="mt-1 text-2xl font-semibold text-white">{summary.inProgress}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-[11px] uppercase tracking-wide text-zinc-400">Completed</p>
            <p className="mt-1 text-2xl font-semibold text-white">{summary.completed}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/25 p-4">
            <p className="text-[11px] uppercase tracking-wide text-zinc-400">Pinned</p>
            <p className="mt-1 text-2xl font-semibold text-white">{summary.pinned}</p>
          </div>
        </div>

        <form className="mt-6 grid gap-3 rounded-xl border border-white/10 bg-black/25 p-4 md:grid-cols-[1fr_180px_auto]" onSubmit={handleAddSkill}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Skill title (e.g., Public Speaking, Rust, Cycling)"
            className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
          />
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="Category"
            className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
          />
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs text-zinc-200">
              <input
                type="checkbox"
                checked={pinOnCreate}
                onChange={(event) => setPinOnCreate(event.target.checked)}
              />
              Pin
            </label>
            <button
              type="submit"
              disabled={adding}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-60 sm:w-auto"
            >
              <Plus size={15} /> {adding ? "Adding..." : "Add Skill"}
            </button>
          </div>
        </form>
      </div>

      <section className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5">
        <h2 className="text-base font-semibold text-white">Live Skill Timeline</h2>
        <p className="mt-1 text-xs text-zinc-400">
          Non-removable by design. Add, complete, and pin skills in real-time.
        </p>

        <div className="mt-4 space-y-3">
          {skills.length === 0 ? <p className="text-sm text-zinc-400">No skills added yet.</p> : null}

          {skills.map((item) => (
            <article key={item.id} className="rounded-xl border border-white/10 bg-black/25 p-3 sm:p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-xs text-zinc-400">{item.category}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${statusPill[item.status]}`}>
                    {item.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleTogglePin(item.id)}
                    disabled={actionId === item.id}
                    className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-white/5 px-2 py-1 text-[11px] text-white transition hover:bg-white/10 disabled:opacity-60"
                  >
                    {item.pinned ? <PinOff size={12} /> : <Pin size={12} />}
                    {item.pinned ? "Unpin" : "Pin"}
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <p className="text-[11px] text-zinc-400">
                  Started: {new Date(item.createdAt).toLocaleDateString()}
                  {item.completedAt ? ` · Completed: ${new Date(item.completedAt).toLocaleDateString()}` : ""}
                </p>

                {item.status === "in-progress" ? (
                  <button
                    type="button"
                    onClick={() => handleComplete(item.id)}
                    disabled={actionId === item.id}
                    className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1.5 text-[11px] font-medium text-black transition hover:bg-zinc-200 disabled:opacity-60"
                  >
                    <CheckCircle2 size={12} />
                    {actionId === item.id ? "Completing..." : "Mark Complete"}
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-md border border-emerald-300/35 bg-emerald-300/10 px-2.5 py-1.5 text-[11px] text-emerald-200">
                    <Timer size={12} /> Done
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
