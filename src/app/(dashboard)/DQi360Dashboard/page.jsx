"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  ClipboardList,
  Clock3,
  Copy,
  Database,
} from "lucide-react";
import KpiCardsGrid from "@/components/common/KpiCardsGrid";
import DQi360Chart from "@/components/DQi360Dashboard/DQi360Chart.jsx";
import DQi360Issues from "@/components/DQi360Dashboard/DQi360Issues";
import DQi360Footer from "@/components/DQi360Dashboard/DQi360Footer";
import DQi360Header from "@/components/DQi360Dashboard/DQi360Header";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { getDashboard } from "@/app/lib/api";

const KPI_PRESENTATION = {
  overall_dq_index: { title: "Overall DQ Index", icon: BadgeCheck, iconBg: "#e7f8ee", iconColor: "#16a34a" },
  total_records: { title: "Total Customer Records", icon: Database, iconBg: "#e8f1ff", iconColor: "#2563eb" },
  open_issues: { title: "Open Issues", icon: ClipboardList, iconBg: "#fff0f1", iconColor: "#ef476f" },
  critical_issues: { title: "Critical Issues", icon: AlertTriangle, iconBg: "#fff1f2", iconColor: "#ef476f" },
  duplicate_issues: { title: "Exact Duplicates", icon: Copy, iconBg: "#e8f1ff", iconColor: "#2563eb" },
  avg_remediation_age: { title: "Avg. Remediation Age", icon: Clock3, iconBg: "#e8f1ff", iconColor: "#2563eb" },
};

const SEVERITY_COLORS = {
  Critical: "#E51636",
  High: "#FF5B21",
  Medium: "#F4B400",
  Low: "#3C8DDE",
};

const COUNTRY_MARKER_POSITIONS = {
  AU: { x: "84%", y: "72%" },
  BE: { x: "50%", y: "30%" },
  BR: { x: "32%", y: "67%" },
  CA: { x: "23%", y: "27%" },
  DE: { x: "52%", y: "33%" },
  ES: { x: "46%", y: "39%" },
  FR: { x: "48%", y: "37%" },
  GB: { x: "46%", y: "28%" },
  IN: { x: "67%", y: "51%" },
  IT: { x: "53%", y: "40%" },
  JP: { x: "84%", y: "43%" },
  MX: { x: "20%", y: "48%" },
  NL: { x: "50%", y: "29%" },
  SG: { x: "73%", y: "66%" },
  US: { x: "21%", y: "39%" },
  ZA: { x: "54%", y: "78%" },
  AE: { x: "61%", y: "49%" },
};

function formatKpiValue(key, value) {
  if (value === null || value === undefined) {
    return "-";
  }

  if (key === "avg_remediation_age") {
    return `${value} days`;
  }

  return Number(value).toLocaleString();
}

function normalizeKpis(kpis = {}, momComparison = {}) {
  return Object.entries(KPI_PRESENTATION)
    .filter(([key]) => kpis[key] !== undefined && kpis[key] !== null)
    .map(([key, presentation]) => {
      const isDqIndex = key === "overall_dq_index";
      const isOpenIssues = key === "open_issues";
      const isCriticalIssues = key === "critical_issues";
      const change = isDqIndex
        ? momComparison.dq_index_change
        : isOpenIssues
          ? momComparison.current_issues - momComparison.previous_issues
          : isCriticalIssues
            ? momComparison.current_critical - momComparison.previous_critical
            : undefined;

      return {
        ...presentation,
        value: formatKpiValue(key, kpis[key]),
        change: change === undefined ? undefined : Math.abs(change).toLocaleString(),
        positive: isDqIndex ? change >= 0 : change <= 0,
        comparison: change === undefined ? undefined : "vs. previous period",
      };
    });
}

function mapDashboardData(data) {
  const trendData = (data?.trend ?? [])
    .filter((item) => Number.isFinite(Number(item?.dq_index)))
    .map((item) => ({ month: item.run_date, value: Number(item.dq_index) }));
  const severityData = (data?.bySeverity ?? []).map((item) => ({
    name: item.severity,
    value: Number(item.issues ?? 0),
    percent: `${item.pct ?? 0}%`,
    color: SEVERITY_COLORS[item.severity] ?? "#64748B",
  }));
  const domainScores = (data?.domainScores ?? []).map((item) => ({
    label: item.dimension,
    score: Number(item.score ?? 0),
    color: Number(item.score) >= 85 ? "#22A447" : Number(item.score) >= 70 ? "#3C8DDE" : "#F4B400",
  }));

  return {
    kpis: normalizeKpis(data?.kpis, data?.momComparison),
    chartData: { trendData, severityData, domainScores },
    issuesData: {
      sourceSystemData: (data?.bySource ?? []).map((item) => ({
        name: item.source_system,
        value: Number(item.issues ?? 0),
      })),
      topCategories: (data?.byCategory ?? []).map((item) => ({
        name: item.category,
        value: Number(item.issues ?? 0),
      })),
      regionData: (data?.byCountry ?? []).map((item) => ({
        country: item.country_name,
        countryCode: item.country_code,
        score: Number(item.dq_index ?? 0),
        records: Number(item.records ?? 0),
        ...COUNTRY_MARKER_POSITIONS[item.country_code],
      })),
    },
  };
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      try {
        setLoading(true);
        setError(null);

        const response = await getDashboard();
        const payload = response?.data ?? response;
        const hasPayload = Boolean(
          payload &&
          typeof payload === "object" &&
          Object.keys(payload)?.length
        );

        if (isMounted && hasPayload) {
          setDashboardData(payload);
        } else if (isMounted) {
          setDashboardData(null);
        }
      } catch (error) {
        console.error("Dashboard API Error:", error);
        if (isMounted) {
          setError(error);
          setDashboardData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const resolvedDashboardData =
    dashboardData?.collectionsDashboard ??
    dashboardData ??
    {};
  const mappedDashboardData = mapDashboardData(resolvedDashboardData);
  const normalizedKpis = mappedDashboardData.kpis;
  const resolvedChartData = mappedDashboardData.chartData;
  const resolvedIssuesData = mappedDashboardData.issuesData;
  const criticalIssueCount =
    resolvedDashboardData?.kpis?.critical_issues;
  const headerData =
    resolvedDashboardData?.headerData ?? resolvedDashboardData?.header ?? {};
  const focusData =
    resolvedDashboardData?.focusData ?? resolvedDashboardData?.focus ?? {};
  const focusMessage =
    focusData?.message ??
    focusData?.description ??
    (criticalIssueCount === undefined
      ? undefined
      : `${Number(criticalIssueCount).toLocaleString()} critical issues require attention.`);

  if (loading) {
    return <LoadingState label="Loading dashboard data..." />;
  }

  if (error || !dashboardData) {
    return (
      <main className="min-h-full p-3">
        <EmptyState
          title="Dashboard data is unavailable"
          description="The dashboard API did not return data. Please try again shortly."
        />
      </main>
    );
  }

  return (
    <main className="min-h-full text-slate-800" aria-busy={loading} data-has-error={Boolean(error)}>
      <div className="mx-auto max-w-[1480px] space-y-3">
        <DQi360Header headerData={headerData} />
        <KpiCardsGrid items={normalizedKpis} />

        <DQi360Chart chartData={resolvedChartData} />

        <DQi360Issues issuesData={resolvedIssuesData} />

        <DQi360Footer
          criticalIssueCount={criticalIssueCount}
          message={focusMessage}
        />
      </div>
    </main>
  );
}