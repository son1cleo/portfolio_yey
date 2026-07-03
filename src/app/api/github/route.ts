import { NextResponse } from "next/server";

const GITHUB_USERNAME = "son1cleo";
const RELEVANT_TYPES = new Set(["PushEvent", "PullRequestEvent", "CreateEvent"]);

type GithubApiEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
};

export async function GET() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      return NextResponse.json({ events: [] });
    }

    const data = (await response.json()) as GithubApiEvent[];

    const events = data
      .filter((event) => RELEVANT_TYPES.has(event.type))
      .slice(0, 6)
      .map((event) => ({
        type: event.type,
        repo: event.repo.name,
        createdAt: event.created_at,
      }));

    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
