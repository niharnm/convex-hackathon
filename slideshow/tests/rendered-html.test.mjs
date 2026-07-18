import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("pitch deck contains six slide destinations and product story", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.match(page, /const slides = \["One Number", "The problem", "The product", "Live demo", "Why now", "Start local"\]/);
  assert.match(page, /Start demo/);
  assert.match(page, /Replay deck/);
  assert.match(page, /ArrowRight/);
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /prefers-reduced-motion/);
});

test("presentation metadata and visual system are product-specific", async () => {
  const [layout, css, packageJson] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);
  assert.match(layout, /One Number — Hackathon Pitch/);
  assert.match(css, /--blue: #2f6bff/);
  assert.match(css, /--green: #1c9b73/);
  assert.match(packageJson, /"name": "one-number-pitch-deck"/);
  assert.doesNotMatch(pageOrEmpty(layout), /codex-preview|SkeletonPreview/);
});

function pageOrEmpty(value) {
  return value ?? "";
}
