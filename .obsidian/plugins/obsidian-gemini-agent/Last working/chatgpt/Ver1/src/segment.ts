import { shouldSplit } from "./boundaryRules";

export function segmentIntoUnits(source: string): string[] {
  // flatten paragraphs; keep your text intact
  const normalized = source.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  const sentences = normalized.match(/[^.!?]+[.!?]+/g) || [normalized];

  const units: string[] = [];
  let buf: string[] = [];

  for (const raw of sentences) {
    const s = raw.trim();
    if (!s) continue;
    if (buf.length === 0) { buf.push(s); continue; }
    if (shouldSplit(s)) { units.push(buf.join(" ")); buf = [s]; }
    else { buf.push(s); }
  }
  if (buf.length) units.push(buf.join(" "));

  // Merge tiny fragments forward to reduce noise
  const merged: string[] = [];
  for (const u of units) {
    if (merged.length && u.length < 80) merged[merged.length - 1] += " " + u;
    else merged.push(u);
  }
  return merged;
}

export function coverageAssert(units: string[], minUnits = 8) {
  return { ok: units.length >= minUnits, count: units.length };
}
