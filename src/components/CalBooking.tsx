"use client";

import Link from "next/link";
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
// Reuse the same modal trigger as the header, with Aeoba's own button styling.
export function FloatingBookingLink() {
  const pathname = usePathname();
  if (pathname === bookingUrl) return null;

  return (
    <CalPopupButton className="floating-booking fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-[#FAFAFA] font-medium text-sm px-5 py-3 rounded-lg border border-white/10 shadow-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6366F1]">
      <CalendarDays size={16} aria-hidden="true" />
      Book a Strategy Call
    </CalPopupButton>
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
        <Link href="/contact?subject=Strategy%20call">request a time directly from Aeoba</Link>.
      </p>
    </>
  );
}
