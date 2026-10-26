"use client";
import { AlertTriangle, CheckCircle2, Clock3, FileText } from "lucide-react";

import KpiCardsGrid from "../common/KpiCardsGrid";

export default function DQi360KpiCard({ summary }) {
  const kpiItems = [
    {
      title: "Total Issues",
      value: summary?.totalIssues ?? 0,
      icon: FileText,
      iconBg: "#EFF6FF",
      iconColor: "#2563EB",
      tooltipData: {
        "Total Issues": summary?.totalIssues ?? 0,
        "Open Issues": summary?.openIssues ?? 0,
        "Resolved Issues": summary?.resolvedIssues ?? 0,
        "Pending Issues": summary?.pendingIssues ?? 0,
      },
    },
    {
      title: "Open Issues",
      value: summary?.openIssues ?? 0,
      icon: AlertTriangle,
      iconBg: "#FEF3C7",
      iconColor: "#D97706",
      tooltipData: {
        "Total Issues": summary?.totalIssues ?? 0,
        "Open Issues": summary?.openIssues ?? 0,
        "Resolved Issues": summary?.resolvedIssues ?? 0,
        "Pending Issues": summary?.pendingIssues ?? 0,
      },
    },
    {
      title: "Resolved",
      value: summary?.resolvedIssues ?? 0,
      icon: CheckCircle2,
      iconBg: "#ECFDF5",
      iconColor: "#059669",
      tooltipData: {
        "Total Issues": summary?.totalIssues ?? 0,
        "Open Issues": summary?.openIssues ?? 0,
        "Resolved Issues": summary?.resolvedIssues ?? 0,
        "Pending Issues": summary?.pendingIssues ?? 0,
      },
    },
    {
      title: "Pending",
      value: summary?.pendingIssues ?? 0,
      icon: Clock3,
      iconBg: "#FFF1F2",
      iconColor: "#F43F5E",

      tooltipData: {
        "Total Issues": summary?.totalIssues ?? 0,
        "Open Issues": summary?.openIssues ?? 0,
        "Resolved Issues": summary?.resolvedIssues ?? 0,
        "Pending Issues": summary?.pendingIssues ?? 0,
      },
    },
  ];

  return <KpiCardsGrid items={kpiItems} variant="default" />;
}
