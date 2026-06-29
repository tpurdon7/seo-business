import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const envText = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
const env = {};

for (const line of envText.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const equalsIndex = trimmed.indexOf("=");
  if (equalsIndex === -1) continue;
  env[trimmed.slice(0, equalsIndex)] = trimmed.slice(equalsIndex + 1).replace(/^["']|["']$/g, "");
}

const entries = [
  ["NEXT_PUBLIC_SUPABASE_URL", env.NEXT_PUBLIC_SUPABASE_URL],
  ["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY],
  ["NEXT_PUBLIC_SITE_URL", "https://bettersearch.dev"],
  ["AUDIT_ALLOWED_ORIGINS", "https://bettersearch.dev,tauri://localhost,http://localhost:3000"],
].filter(([, value]) => value);

function addEnv(key, value) {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", ["vercel", "env", "add", key, "production", "--value", value, "--yes"], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";

    child.stdout.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      output += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0 || /already exists/i.test(output)) {
        console.log(`Synced ${key}`);
        resolve();
      } else {
        reject(new Error(`Could not sync ${key}.\n${output}`));
      }
    });
  });
}

for (const [key, value] of entries) {
  await addEnv(key, value);
}
