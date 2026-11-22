"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { CalendarDays } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { bookingUrl, site } from "@/config/site";

// ─── Shared Cal init helper ───────────────────────────────────────────────────
async function initCal() {
  const cal = await getCalApi({ namespace: site.booking.namespace });
  cal("ui", {
    hideEventTypeDetails: false,
    layout: site.booking.layout as "month_view",
  });
}

// ─── Mode 1: Popup trigger button ─────────────────────────────────────────────
// Drop-in replacement for BookingLink — renders a <button> that opens the Cal
// popup modal; falls back gracefully if Cal hasn't loaded yet.
export function CalPopupButton({
  className,
  children,
  onNavigate,
}: {
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  useEffect(() => { initCal(); }, []);
  return (
    <button
      className={className}
      data-cal-namespace={site.booking.namespace}
      data-cal-link={site.booking.calLink}
      data-cal-config={JSON.stringify({ layout: site.booking.layout, useSlotsViewOnSmallScreen: "true" })}
      onClick={onNavigate}
    >
      {children}
    </button>
  );
}

// ─── Backwards-compat alias (server-component callers that just need a Link) ──
export function BookingLink(props: Omit<ComponentProps<typeof Link>, "href">) {
  return <Link {...props} href={bookingUrl} />;
}

// ─── Mode 1: Floating bottom-right popup button ───────────────────────────────
// Replaces the old <BookingLink className="floating-booking"> nav link.
// The Cal floating button is injected via script; this component only loads the
// script and hides itself on the /book-call page.
export function FloatingBookingLink() {
  const pathname = usePathname();
  if (pathname === bookingUrl) return null;

  const floatingEmbed = `(function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
      if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; }
      p(cal, ar);
    };
  })(window, "${site.booking.scriptUrl}", "init");
  Cal("init", "${site.booking.namespace}", { origin: "${site.booking.origin}" });
  Cal.config = Cal.config || {};
  Cal.config.forwardQueryParams = true;
  Cal.ns["${site.booking.namespace}"]("floatingButton", {
    calLink: "${site.booking.calLink}",
    config: { layout: "${site.booking.layout}", useSlotsViewOnSmallScreen: "true" }
  });
  Cal.ns["${site.booking.namespace}"]("ui", { hideEventTypeDetails: false, layout: "${site.booking.layout}" });`;

  return (
    <Script id="aeoba-floating-booking" strategy="afterInteractive">
      {floatingEmbed}
    </Script>
  );
}

// ─── Mode 2: Inline embed for /book-call page ─────────────────────────────────
export function BookingCalendar() {
  useEffect(() => { initCal(); }, []);
  return (
    <>
      <Cal
        namespace={site.booking.namespace}
        calLink={site.booking.calLink}
        style={{ width: "100%", overflow: "scroll" }}
        config={{ layout: site.booking.layout as "month_view", useSlotsViewOnSmallScreen: "true" }}
      />
      <p className="native-note">
        If the calendar is unavailable,{" "}
        <Link href="/contact?subject=Strategy%20call">request a time directly from Sai</Link>.
      </p>
    </>
  );
}
