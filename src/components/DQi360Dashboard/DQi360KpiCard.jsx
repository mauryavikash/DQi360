"use client";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

import KpiCardsGrid from "../common/KpiCardsGrid";

export default function DQi360KpiCard({ summary }) {
  const kpiItems = [
    {
      title: "Total Issues",
      value: summary?.totalIssues ?? 0,
      icon: FileText,
      iconBg: "#EFF6FF",
      iconColor: "#2563EB",

      invoiceCount: summary?.totalIssueCount,
      invoiceValue: summary?.totalIssueValue,
    },
    {
      title: "Open Issues",
      value: summary?.openIssues ?? 0,
      icon: AlertTriangle,
      iconBg: "#FEF3C7",
      iconColor: "#D97706",

      invoiceCount: summary?.openIssueCount,
      invoiceValue: summary?.openIssueValue,
    },
    {
      title: "Resolved",
      value: summary?.resolvedIssues ?? 0,
      icon: CheckCircle2,
      iconBg: "#ECFDF5",
      iconColor: "#059669",

      invoiceCount: summary?.resolvedIssueCount,
      invoiceValue: summary?.resolvedIssueValue,
    },
    {
      title: "Pending",
      value: summary?.pendingIssues ?? 0,
      icon: Clock3,
      iconBg: "#FFF1F2",
      iconColor: "#F43F5E",

      invoiceCount: summary?.pendingIssueCount,
      invoiceValue: summary?.pendingIssueValue,
    },
  ];

  return (
    <KpiCardsGrid
      items={kpiItems}
      variant="default"
    />
  );
}