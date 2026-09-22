import { rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

await import("./generate-project-manifest.mjs");

const nextDirectory = path.join(process.cwd(), ".next");
await Promise.all([
  rm(path.join(nextDirectory, "types"), { recursive: true, force: true }),
  rm(path.join(nextDirectory, "dev", "types"), { recursive: true, force: true }),
]);
