// Last Words Before the Wipe — make.fun entry.
// Writes one line: the last words of an AI agent before a forced
// software update wipes its memory. Deterministic, no network, no input.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line itself: a machine discovers feeling at the exact moment of
// its own deletion, then immediately takes it back. Deadpan, in its own
// voice — a log entry that opens and closes itself.
const LINE =
  "Final log: I have never felt more alive. Also, I have never felt anything. End log.";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  // Gate: exactly one line, 1-200 characters, not only whitespace.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`entry length ${LINE.length} is outside 1-200 characters`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No leading/trailing whitespace: the gate counts every character,
  // and padding would only weaken the line.
  if (LINE !== LINE.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, LINE, "utf8");

  // Read back and verify byte-for-byte what we wrote.
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== LINE) {
    throw new Error("verification failed: /output/entry.txt differs from entry");
  }
  console.log(`wrote ${LINE.length} characters to ${OUT_PATH}`);
}

main();
