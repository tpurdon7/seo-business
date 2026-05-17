import { reportPathForAudit, updateBatchAuditItem } from "@/lib/audit/batch-store";
import { crawlUrl } from "@/lib/audit/crawl-url";
import { generateAuditReport } from "@/lib/audit/generate-audit";
import { scorePage } from "@/lib/audit/score-page";
import { saveAudit } from "@/lib/audit/store";
import { makeAuditId } from "@/lib/audit/utils";

export async function processBatchAuditJob(jobId: string, urls: string[]) {
  for (const url of urls) {
    try {
      updateBatchAuditItem(jobId, url, {
        status: "crawling",
        error: null,
      });

      const extractedData = await crawlUrl(url);

      updateBatchAuditItem(jobId, url, {
        status: "auditing",
      });

      const auditId = makeAuditId(url);
      const scores = scorePage(extractedData);
      const report = generateAuditReport(auditId, extractedData, scores);
      const createdAt = new Date().toISOString();

      saveAudit({
        id: auditId,
        input: { url },
        extractedData,
        scores,
        report,
        createdAt,
      });

      updateBatchAuditItem(jobId, url, {
        auditId,
        status: "complete",
        reportUrl: reportPathForAudit(auditId),
        error: null,
      });
    } catch (error) {
      updateBatchAuditItem(jobId, url, {
        status: "failed",
        error: error instanceof Error ? error.message : "Audit failed.",
      });
    }
  }
}
