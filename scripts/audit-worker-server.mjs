import { createServer } from "node:http";
import { spawn } from "node:child_process";
import process from "node:process";

const port = Number(process.env.PORT || 10000);
const triggerSecret = process.env.AUDIT_WORKER_TRIGGER_SECRET?.trim();
let worker = null;

function runWorker() {
  if (worker) {
    return false;
  }

  worker = spawn(process.execPath, ["scripts/process-audit-worker.mjs"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      AUDIT_WORKER_MAX_ITEMS: "25",
      AUDIT_WORKER_POLL_MS: "0",
    },
    stdio: "inherit",
  });

  worker.on("exit", (code, signal) => {
    console.log("Audit worker exited.", { code, signal });
    worker = null;
  });

  return true;
}

const server = createServer((request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ ok: true, workerRunning: Boolean(worker) }));
    return;
  }

  if (request.method === "POST" && request.url === "/run") {
    const authorization = request.headers.authorization;

    if (!triggerSecret || authorization !== `Bearer ${triggerSecret}`) {
      response.writeHead(401, { "content-type": "application/json" });
      response.end(JSON.stringify({ error: "Unauthorized." }));
      return;
    }

    const started = runWorker();
    response.writeHead(202, { "content-type": "application/json" });
    response.end(JSON.stringify({ accepted: true, started }));
    return;
  }

  response.writeHead(404, { "content-type": "application/json" });
  response.end(JSON.stringify({ error: "Not found." }));
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Audit worker trigger listening on ${port}.`);
  runWorker();
});

function shutdown() {
  worker?.kill("SIGTERM");
  server.close(() => process.exit(0));
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
