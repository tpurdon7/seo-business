import "server-only";

export async function triggerAuditWorker() {
  const workerUrl = process.env.AUDIT_WORKER_URL?.replace(/\/$/, "");
  const triggerSecret = process.env.AUDIT_WORKER_TRIGGER_SECRET?.trim();

  if (!workerUrl || !triggerSecret) {
    console.warn("audit_worker_trigger_not_configured");
    return false;
  }

  try {
    const response = await fetch(`${workerUrl}/run`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${triggerSecret}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("audit_worker_trigger_failed", { status: response.status });
      return false;
    }

    return true;
  } catch (error) {
    console.error("audit_worker_trigger_failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return false;
  }
}
