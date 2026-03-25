export type TrackerStatus = "in-progress" | "completed";

export type TrackerSkill = {
  id: string;
  title: string;
  category: string;
  status: TrackerStatus;
  pinned: boolean;
  createdAt: string;
  completedAt?: string;
};

export type TrackerSummary = {
  total: number;
  inProgress: number;
  completed: number;
  pinned: number;
};

const OWNER_STORAGE_KEY = "mrk.tracker.owner.skills";
const VISITOR_STORAGE_KEY = "mrk.tracker.visitor.skills";
const OWNER_ACCESS_KEY = "mrk.tracker.owner.access";

const sampleVisitorSkills: TrackerSkill[] = [
  {
    id: "sample-js",
    title: "Learning JavaScript",
    category: "Coding",
    status: "in-progress",
    pinned: true,
    createdAt: "2026-03-01",
  },
  {
    id: "sample-marathon",
    title: "Running a Marathon",
    category: "Real Life",
    status: "in-progress",
    pinned: true,
    createdAt: "2026-03-01",
  },
];

function safeParseSkills(raw: string | null): TrackerSkill[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as TrackerSkill[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function getSampleVisitorSkills(): TrackerSkill[] {
  return [...sampleVisitorSkills];
}

export function hasOwnerAccess(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(OWNER_ACCESS_KEY) === "true";
}

export function setOwnerAccess(value: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(OWNER_ACCESS_KEY, value ? "true" : "false");
}

export function loadTrackerSkills(mode: "owner" | "visitor"): TrackerSkill[] {
  if (typeof window === "undefined") return [];

  const storageKey = mode === "owner" ? OWNER_STORAGE_KEY : VISITOR_STORAGE_KEY;
  const parsed = safeParseSkills(window.localStorage.getItem(storageKey));

  if (mode === "visitor" && parsed.length === 0) {
    return getSampleVisitorSkills();
  }

  return parsed;
}

export function saveTrackerSkills(mode: "owner" | "visitor", skills: TrackerSkill[]): void {
  if (typeof window === "undefined") return;
  const storageKey = mode === "owner" ? OWNER_STORAGE_KEY : VISITOR_STORAGE_KEY;
  window.localStorage.setItem(storageKey, JSON.stringify(skills));
}

export function getActiveViewerMode(): "owner" | "visitor" {
  return hasOwnerAccess() ? "owner" : "visitor";
}

export function summarizeSkills(skills: TrackerSkill[]): TrackerSummary {
  const inProgress = skills.filter((item) => item.status === "in-progress").length;
  const completed = skills.filter((item) => item.status === "completed").length;
  const pinned = skills.filter((item) => item.pinned).length;

  return {
    total: skills.length,
    inProgress,
    completed,
    pinned,
  };
}

export function getLatestCompleted(skills: TrackerSkill[]): TrackerSkill | null {
  const completed = skills
    .filter((item) => item.status === "completed")
    .sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? ""));

  return completed[0] ?? null;
}

export function getPinnedSkillsForCurrentViewer(): TrackerSkill[] {
  const mode = getActiveViewerMode();
  return loadTrackerSkills(mode).filter((item) => item.pinned);
}

export function getSummaryForCurrentViewer(): TrackerSummary {
  const mode = getActiveViewerMode();
  return summarizeSkills(loadTrackerSkills(mode));
}

export function getLatestCompletedForCurrentViewer(): TrackerSkill | null {
  const mode = getActiveViewerMode();
  return getLatestCompleted(loadTrackerSkills(mode));
}

// Public portfolio view should always reflect owner data, never visitor demo data.
export function getPinnedSkillsForPortfolio(): TrackerSkill[] {
  return loadTrackerSkills("owner").filter((item) => item.pinned);
}

export function getSummaryForPortfolio(): TrackerSummary {
  return summarizeSkills(loadTrackerSkills("owner"));
}

export function getLatestCompletedForPortfolio(): TrackerSkill | null {
  return getLatestCompleted(loadTrackerSkills("owner"));
}
