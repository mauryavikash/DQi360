"use client";

import {
  ClipboardList,
  RefreshCw,
  Clock3,
  CheckCircle,
} from "lucide-react";

import KpiCardsGrid from "../common/KpiCardsGrid";

export default function AuditKpis({ summary = [] }) {
  const items = summary.map((item) => ({
    title: item.title,
    value: item.value,

    icon:
      item.type === "todo"
        ? ClipboardList
        : item.type === "progress"
          ? RefreshCw
          : item.type === "approval"
            ? Clock3
            : CheckCircle,

    iconBg:
      item.type === "approved"
        ? "#E4F3E8"
        : "#EDF1F7",

    iconColor:
      item.type === "approved"
        ? "#169C37"
        : item.type === "approval"
          ? "#617194"
          : "#1565FF",

    // Tooltip values
    invoiceCount: item.invoiceCount,
    invoiceValue: item.invoiceValue,
  }));

  return (
    <div className="mt-4">
      <KpiCardsGrid
        items={items}
        variant="audit"
      />
    </div>
  );
}