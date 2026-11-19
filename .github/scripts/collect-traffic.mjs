// Collects GitHub traffic data (clones and views) for this repository and merges it into a
// JSON history file, so the data outlives GitHub's 14-day retention window.
//
// Usage: node collect-traffic.mjs <data-file>
// Env:   TRAFFIC_TOKEN      token allowed to read the traffic API (fine-grained PAT with
//                           "Administration: Read-only" on this repository)
//        GITHUB_REPOSITORY  owner/repo (set automatically inside GitHub Actions)
//
// Caveat on unique counts: GitHub deduplicates unique cloners and visitors per day and per
// 14-day window only. Adding daily uniques together counts the same person once per day they
// cloned, so no all-time unique figure is derived here.

import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const API = 'https://api.github.com';

export function emptyHistory(repository) {
  return { repository, updated_at: null, summary: null, daily: {}, snapshots: [] };
}

// Merges one fetch into the history. Days present in the response overwrite stored values,
// because a later fetch of the same day is at least as complete (today's figures are partial).
// Days that left the 14-day window keep their stored values.
export function mergeTraffic(history, { clones, views, repo, fetchedAt }) {
  const next = structuredClone(history);
  const day = (timestamp) => timestamp.slice(0, 10);

  for (const entry of clones.clones ?? []) {
    const d = (next.daily[day(entry.timestamp)] ??= {});
    d.clones = entry.count;
    d.unique_cloners = entry.uniques;
  }
  for (const entry of views.views ?? []) {
    const d = (next.daily[day(entry.timestamp)] ??= {});
    d.views = entry.count;
    d.unique_visitors = entry.uniques;
  }

  // Normalize: every stored day carries all four fields, sorted by date.
  next.daily = Object.fromEntries(
    Object.keys(next.daily)
      .sort()
      .map((date) => {
        const d = next.daily[date];
        return [
          date,
          {
            clones: d.clones ?? 0,
            unique_cloners: d.unique_cloners ?? 0,
            views: d.views ?? 0,
            unique_visitors: d.unique_visitors ?? 0,
          },
        ];
      }),
  );

  // One snapshot per run date of the 14-day aggregates GitHub reports; a rerun on the same date
  // replaces that date's snapshot.
  const snapshot = {
    date: day(fetchedAt),
    window_days: 14,
    clones: clones.count,
    unique_cloners: clones.uniques,
    views: views.count,
    unique_visitors: views.uniques,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  };
  next.snapshots = next.snapshots.filter((s) => s.date !== snapshot.date);
  next.snapshots.push(snapshot);
  next.snapshots.sort((a, b) => a.date.localeCompare(b.date));

  const dates = Object.keys(next.daily);
  const sum = (field) => dates.reduce((acc, date) => acc + next.daily[date][field], 0);
  next.summary = {
    since: dates[0] ?? null,
    clones: sum('clones'),
    views: sum('views'),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  };
  next.updated_at = fetchedAt;
  return next;
}

async function get(path, token) {
  const response = await fetch(`${API}${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'living-brain-traffic-stats',
    },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GET ${path} failed with ${response.status}: ${body}`);
  }
  return response.json();
}

async function main() {
  const dataFile = process.argv[2];
  const token = process.env.TRAFFIC_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  if (!dataFile) throw new Error('Usage: node collect-traffic.mjs <data-file>');
  if (!token) {
    throw new Error(
      'TRAFFIC_TOKEN is not set. Add a fine-grained personal access token with ' +
        '"Administration: Read-only" on this repository as the TRAFFIC_TOKEN secret.',
    );
  }
  if (!repository) throw new Error('GITHUB_REPOSITORY is not set (expected owner/repo).');

  let history;
  try {
    history = JSON.parse(await readFile(dataFile, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    history = emptyHistory(repository);
  }

  const [clones, views, repo] = await Promise.all([
    get(`/repos/${repository}/traffic/clones?per=day`, token),
    get(`/repos/${repository}/traffic/views?per=day`, token),
    get(`/repos/${repository}`, token),
  ]);

  const next = mergeTraffic(history, { clones, views, repo, fetchedAt: new Date().toISOString() });
  await writeFile(dataFile, `${JSON.stringify(next, null, 2)}\n`);

  const s = next.summary;
  console.log(
    `Recorded ${Object.keys(next.daily).length} days since ${s.since}: ` +
      `${s.clones} clones, ${s.views} views, ${s.stars} stars, ${s.forks} forks. ` +
      `Last 14 days: ${clones.uniques} unique cloners.`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
