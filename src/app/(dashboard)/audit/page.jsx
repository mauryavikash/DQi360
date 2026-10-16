"use client";

import { useEffect, useMemo, useState } from "react";
import AuditKpis from "@/components/audit/AuditKpis";
import AuditTable from "@/components/audit/AuditTable";
import AuditDetail from "@/components/audit/AuditDetail";
import { LoadingState } from "@/components/common/LoadingState";
import { getAudit } from "@/app/lib/api";

function formatEventTime(value) {
  if (!value) return "-";
  const date = new Date(value.replace(" ", "T"));
  return {
    date: new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date),
    time: new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(date),
  };
}

function normalizeEvent(event, index) {
  const timestamp = formatEventTime(event.event_time);
  return { ...event, id: `${event.event_time}-${index}`, date: timestamp.date, time: timestamp.time, attribute: event.attribute_event ?? "-" };
}


export default function AuditPage() {
  const [workbenchApiData, setWorkbenchApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadWorkbenchData() {
      try {
        setError(null);

        const response = await getAudit();
        const payload = response?.data ?? response;
        const hasPayload = Boolean(
          payload &&
          typeof payload === "object" &&
          Object.keys(payload)?.length
        );

        if (isMounted) {
          setWorkbenchApiData(hasPayload ? payload : null);
        }
      } catch (error) {
        console.error("Workbench API Error:", error);
        if (isMounted) {
          setError(error);
          setWorkbenchApiData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkbenchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const events = useMemo(() => (workbenchApiData?.events ?? []).map(normalizeEvent), [workbenchApiData]);
  const summary = useMemo(() => [
  {
    title: "Total Audit Events", value: events.length, subtitle: "All recorded events",
    type: "todo",
  },
  {
    title: "Data Changes", value: events.filter((event) => event.event_category === "Data Change").length, subtitle: "Recorded data changes",
    type: "progress",
  },
  {
    title: "DQ Actions", value: events.filter((event) => event.event_category === "DQ Action").length, subtitle: "Data quality actions",
    type: "approval",
  },
  {
    title: "Governance Decisions", value: events.filter((event) => event.event_category === "Governance Decision").length, subtitle: "Governance events",
    type: "approved",
  },
  { title: "User / System Actions", value: events.filter((event) => event.event_category === "User/System Action").length, subtitle: "User and system events", type: "todo" },
], [events]);

  if (loading) {
    return <LoadingState label="Loading workbench data..." />;
  }


  return (
    <main className="min-h-full text-slate-700" aria-busy={loading} data-has-error={Boolean(error)}>
      <div className="mx-auto max-w-[1600px]">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-[18px] font-bold leading-5 text-slate-800">
              Audit
            </h1>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Audit Subtitle
            </p>
          </div>

         
        </header>

        <AuditKpis summary={summary} />
        <AuditTable events={events} onViewDetail={setSelectedEvent} />
        {selectedEvent && <AuditDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      </div>
    </main>
  );
}