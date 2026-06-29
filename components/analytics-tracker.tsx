"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const visitorKey = "better-search-visitor-id";
const sessionKey = "better-search-session-id";
const sessionStartedKey = "better-search-session-started-at";
const sessionTimeoutMs = 30 * 60 * 1000;
const privatePathPrefixes = [
  "/account",
  "/analytics",
  "/auth",
  "/leads",
  "/login",
  "/reset-password",
  "/share",
];

function shouldTrackPath(pathname: string) {
  if (pathname.startsWith("/audit/")) return false;
  return !privatePathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function safeLocationPath() {
  return window.location.pathname;
}

function safeHref(value: string) {
  if (!value) return "";

  try {
    const url = new URL(value, window.location.origin);
    url.search = "";
    url.hash = "";
    return url.toString().slice(0, 500);
  } catch {
    return "";
  }
}

function uuid() {
  return crypto.randomUUID();
}

function storageGet(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Analytics should never break the user experience.
  }
}

function visitorId() {
  const current = storageGet(visitorKey);
  if (current) return current;

  const next = uuid();
  storageSet(visitorKey, next);
  return next;
}

function sessionId() {
  const current = storageGet(sessionKey);
  const startedAt = Number(storageGet(sessionStartedKey) || 0);

  if (current && Date.now() - startedAt < sessionTimeoutMs) {
    return current;
  }

  const next = uuid();
  storageSet(sessionKey, next);
  storageSet(sessionStartedKey, String(Date.now()));
  return next;
}

function classifySource(referrer: string, params: URLSearchParams) {
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");

  if (utmSource || utmMedium) {
    return {
      source: utmSource || "utm",
      medium: utmMedium || "unknown",
    };
  }

  if (!referrer) {
    return { source: "direct", medium: "none" };
  }

  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host.includes("google.")) return { source: "google", medium: "organic" };
    if (host.includes("bing.")) return { source: "bing", medium: "organic" };
    if (host.includes("linkedin.")) return { source: "linkedin", medium: "social" };
    if (host.includes("facebook.") || host.includes("instagram.")) return { source: "meta", medium: "social" };
    if (host.includes("x.com") || host.includes("twitter.")) return { source: "x", medium: "social" };
    if (host.includes("chatgpt.") || host.includes("perplexity.") || host.includes("claude.") || host.includes("gemini.")) {
      return { source: host, medium: "ai_referral" };
    }

    return { source: host, medium: "referral" };
  } catch {
    return { source: "referral", medium: "referral" };
  }
}

function deviceType() {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function cleanText(value: string | null | undefined, max = 140) {
  return (value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (navigator.doNotTrack === "1") return;
    if (pathname.startsWith("/api")) return;
    if (!shouldTrackPath(pathname)) return;

    const session = sessionId();
    const visitor = visitorId();
    const params = new URLSearchParams(searchParams.toString());
    const referrer = document.referrer;
    const source = classifySource(referrer, params);
    const landingPath = pathname;
    const startedAt = Date.now();
    let activeMs = 0;
    let lastActiveAt = Date.now();
    let stopped = false;

    function payload(eventType: string, eventName: string, eventData: Record<string, unknown> = {}) {
      return {
        sessionId: session,
        visitorId: visitor,
        eventType,
        eventName,
        path: safeLocationPath(),
        title: document.title,
        referrer,
        durationMs: Date.now() - startedAt,
        activeMs,
        eventData,
        landingPath,
        source: source.source,
        medium: source.medium,
        campaign: params.get("utm_campaign") || "",
        term: params.get("utm_term") || "",
        content: params.get("utm_content") || "",
        deviceType: deviceType(),
        browserLanguage: navigator.language || "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      };
    }

    function send(eventType: string, eventName: string, eventData: Record<string, unknown> = {}, beacon = false) {
      const body = JSON.stringify(payload(eventType, eventName, eventData));

      if (beacon && navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
        return;
      }

      void fetch("/api/analytics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        keepalive: beacon,
      }).catch(() => undefined);
    }

    function tickActiveTime() {
      const now = Date.now();
      if (!document.hidden) {
        activeMs += now - lastActiveAt;
      }
      lastActiveAt = now;
    }

    function heartbeat(beacon = false) {
      tickActiveTime();
      send("heartbeat", "engagement_heartbeat", {}, beacon);
    }

    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest("a, button") : null;
      if (!target) return;

      const href = target instanceof HTMLAnchorElement ? target.href : "";
      const url = href ? new URL(href, window.location.href) : null;
      const outbound = Boolean(url && url.hostname !== window.location.hostname);
      const isCalendly = Boolean(url && url.hostname.includes("calendly.com"));

      send("click", isCalendly ? "calendly_click" : outbound ? "outbound_click" : "site_click", {
        label: cleanText(target.textContent),
        href: safeHref(href),
        outbound,
      });
    }

    function handleError(message: string, extra: Record<string, unknown> = {}) {
      send("error", "browser_error", {
        message: cleanText(message, 500),
        ...extra,
      });
    }

    const heartbeatTimer = window.setInterval(() => heartbeat(), 15_000);

    send("page_view", "page_view");
    document.addEventListener("click", handleClick);
    window.addEventListener("error", (event) => handleError(event.message, { filename: event.filename, line: event.lineno }));
    window.addEventListener("unhandledrejection", (event) => handleError(String(event.reason || "Unhandled promise rejection")));
    window.addEventListener("pagehide", () => {
      if (!stopped) {
        stopped = true;
        heartbeat(true);
      }
    });

    return () => {
      stopped = true;
      window.clearInterval(heartbeatTimer);
      document.removeEventListener("click", handleClick);
      heartbeat(true);
    };
  }, [pathname, searchParams]);

  return null;
}
