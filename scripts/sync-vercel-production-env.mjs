import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const envPath = path.join(process.cwd(), ".env.local");
const envText = fs.readFileSync(envPath, "utf8");
const env = {};

for (const line of envText.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;

  const equalsIndex = trimmed.indexOf("=");
  if (equalsIndex === -1) continue;

  const key = trimmed.slice(0, equalsIndex);
  const value = trimmed.slice(equalsIndex + 1).replace(/^["']|["']$/g, "");
  env[key] = value;
}

const targetEnvironment = process.argv[2] === "preview" ? "preview" : "production";
const targetBranch = targetEnvironment === "preview" ? process.argv[3] : undefined;
const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SECRET_KEY",
  "AUDIT_SHARE_SECRET",
  "AUDIT_RATE_LIMIT_SECRET",
  "BETTER_SEARCH_ADMIN_EMAILS",
  "NEXT_PUBLIC_CONTACT_EMAIL",
  "RESEND_API_KEY",
  "AUTH_EMAIL_FROM",
];

const entries = required.map((key) => [key, env[key]]).filter(([, value]) => value);

entries.push(["NEXT_PUBLIC_SITE_URL", "https://bettersearch.dev"]);
entries.push(["AUDIT_ALLOWED_ORIGINS", "https://bettersearch.dev,tauri://localhost,http://localhost:3000"]);

function addEnv(key, value) {
  return new Promise((resolve, reject) => {
    const args = ["vercel", "env", "add", key, targetEnvironment];
    if (targetBranch) {
      args.push(targetBranch);
    }
    args.push("--value", value, "--yes", "--force");

    const child = spawn("npx", args, {
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
      if (code === 0) {
        console.log(`Synced ${key}`);
        resolve();
      } else if (/already exists/i.test(output)) {
        console.log(`Skipped ${key}: already exists`);
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
