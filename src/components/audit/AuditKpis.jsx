"use client";

import {
  ClipboardList,
  RefreshCw,
  Clock3,
  CheckCircle,
} from "lucide-react";

import KpiCardsGrid from "../common/KpiCardsGrid";

export default function AuditKpis({ summary = {} }) {

  const items = [
    {
      title: "Total Audit Events",
      value: summary?.total_audit_events ?? 0,
      icon: ClipboardList,
      iconBg: "#EDF1F7",
      iconColor: "#1565FF",
      tooltipData: {
    Label: "Total Audit Events",
    Value: summary?.total_audit_events ?? 0,
  },
    },
    {
      title: "Data Changes",
      value: summary?.data_changes ?? 0,
      icon: RefreshCw,
      iconBg: "#EDF1F7",
      iconColor: "#1565FF",
      tooltipData: {
    Label: "Data Changes",
    Value: summary?.data_changes ?? 0,
  },
    },
    {
      title: "DQ Actions",
      value: summary?.dq_actions ?? 0,
      icon: Clock3,
      iconBg: "#EDF1F7",
      iconColor: "#617194",
      tooltipData: {
    Label: "DQ Actions",
    Value: summary?.dq_actions ?? 0,
  },
    },
    {
      title: "Governance Decisions",
      value: summary?.governance_decisions ?? 0,
      icon: CheckCircle,
      iconBg: "#E4F3E8",
      iconColor: "#169C37",
      tooltipData: {
    Label: "Governance Decisions",
    Value: summary?.governance_decisions ?? 0,
  },
    },
    {
      title: "User / System Actions",
      value: summary?.user_system_actions ?? 0,
      icon: ClipboardList,
      iconBg: "#EDF1F7",
      iconColor: "#1565FF",
      tooltipData: {
    Label: "User / System Actions",
    Value: summary?.user_system_actions ?? 0,
  },
    },
  ];

  return (
    <div className="mt-4">
      <KpiCardsGrid
        items={items}
        variant="audit"
      />
    </div>
  );
}