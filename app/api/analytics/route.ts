import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type AnalyticsEventType = "page_view" | "heartbeat" | "click" | "error" | "form" | "custom";

interface AnalyticsPayload {
  sessionId?: unknown;
  visitorId?: unknown;
  eventType?: unknown;
  eventName?: unknown;
  path?: unknown;
  title?: unknown;
  referrer?: unknown;
  durationMs?: unknown;
  activeMs?: unknown;
  eventData?: unknown;
  landingPath?: unknown;
  source?: unknown;
  medium?: unknown;
  campaign?: unknown;
  term?: unknown;
  content?: unknown;
  deviceType?: unknown;
  browserLanguage?: unknown;
  timezone?: unknown;
  screenWidth?: unknown;
  screenHeight?: unknown;
}

const allowedEventTypes = new Set<AnalyticsEventType>(["page_view", "heartbeat", "click", "error", "form", "custom"]);

function text(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function path(value: unknown) {
  const candidate = text(value, 500);
  if (!candidate.startsWith("/") || candidate.startsWith("//")) return "";
  return candidate.split(/[?#]/, 1)[0];
}

function number(value: unknown, max = 86_400_000) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(Math.round(value), max)) : 0;
}

function eventData(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return JSON.parse(JSON.stringify(value).slice(0, 5000)) as Record<string, unknown>;
}

function sameSiteOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const requestHost = new URL(request.url).host;
    return new URL(origin).host === requestHost;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameSiteOrigin(request)) {
    return NextResponse.json({ error: "Analytics origin is not allowed." }, { status: 403 });
  }

  try {
    const body = (await request.json()) as AnalyticsPayload;
    const eventType = text(body.eventType, 40) as AnalyticsEventType;

    if (!allowedEventTypes.has(eventType)) {
      return NextResponse.json({ error: "Unsupported analytics event type." }, { status: 400 });
    }

    const sessionId = text(body.sessionId, 80);
    const visitorId = text(body.visitorId, 120);

    if (!sessionId || !visitorId) {
      return NextResponse.json({ error: "Missing analytics session." }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.rpc("record_site_analytics_event", {
      p_session_id: sessionId,
      p_visitor_id: visitorId,
      p_event_type: eventType,
      p_event_name: text(body.eventName, 160),
      p_path: path(body.path),
      p_title: text(body.title, 300),
      p_referrer: text(body.referrer, 1000),
      p_duration_ms: number(body.durationMs),
      p_active_ms: number(body.activeMs),
      p_event_data: eventData(body.eventData),
      p_landing_path: path(body.landingPath),
      p_source: text(body.source, 120) || "direct",
      p_medium: text(body.medium, 120) || "none",
      p_campaign: text(body.campaign, 180),
      p_term: text(body.term, 180),
      p_content: text(body.content, 180),
      p_user_agent: text(request.headers.get("user-agent"), 500),
      p_device_type: text(body.deviceType, 80),
      p_browser_language: text(body.browserLanguage, 80),
      p_timezone: text(body.timezone, 120),
      p_screen_width: number(body.screenWidth, 100_000),
      p_screen_height: number(body.screenHeight, 100_000),
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("analytics_record_failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
