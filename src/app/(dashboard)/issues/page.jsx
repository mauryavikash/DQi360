"use client";
import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import IssuesTable from "@/components/issues/IssuesTable";
import IssuesHeader from "@/components/issuesDetails/IssuesHeader";
import IssuesDetailsCustomer from "@/components/issuesDetails/IssuesDetailsCustomer";
import IssuesDetailsHeader from "@/components/issuesDetails/IssuesDetailsHeader";
import IssuesCustomerContext from "@/components/issuesDetails/IssuesCustomerContext";
import IssuesActivity from "@/components/issuesDetails/IssuesActivity";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { getIssues, getIssueDetails } from "@/app/lib/api";

function formatDetectedDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function normalizeIssue(issue) {
  return {
    issueId: issue.issue_id,
    customerId: issue.customer_id,
    customerName: issue.customer_name,
    category: issue.issue_category,
    rule: issue.dq_rule,
    severity: issue.severity,
    dqScore: issue.dq_score,
    sourceSystem: issue.source_system,
    assignee: issue.assignee,
    status: issue.status,
    age: `${issue.age_days}d`,
    ageDays: issue.age_days,
    detectedDate: formatDetectedDate(issue.detected_date),
  };
}

export default function IssuesPage() {
  const [issuesApiData, setIssuesApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleReview = async (issue) => {
    try {
      setLoading(true);

      const detailResponse = await getIssueDetails(issue.issueId);

      const detailData = detailResponse?.data ?? detailResponse;

      setSelectedIssue(detailData);
      setShowDetails(true);
    } catch (error) {
      console.error("Issue Details API Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleBack = () => {
    setShowDetails(false);
    setSelectedIssue(null);
  };
  useEffect(() => {
    let isMounted = true;

    async function loadIssues() {
      try {
        setLoading(true);
        setError(null);

        const response = await getIssues();
        const payload = response?.data ?? response;
        const hasPayload = Boolean(
          payload &&
          typeof payload === "object" &&
          Object.keys(payload)?.length,
        );

        if (isMounted) {
          setIssuesApiData(hasPayload ? payload : null);
        }
      } catch (error) {
        console.error("Issues API Error:", error);
        if (isMounted) {
          setError(error);
          setIssuesApiData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadIssues();

    return () => {
      isMounted = false;
    };
  }, []);

  const issuesData = useMemo(
    () => (issuesApiData?.issues ?? []).map(normalizeIssue),
    [issuesApiData],
  );

  if (loading) {
    return <LoadingState label="Loading issues..." />;
  }

  if (error || !issuesApiData) {
    return (
      <main className="min-h-full p-3">
        <EmptyState
          title="Issues are unavailable"
          description="The issues API did not return data. Please try again shortly."
        />
      </main>
    );
  }


  return (
    <main
      className="min-h-full text-slate-700"
      aria-busy={loading}
      //  data-has-error={Boolean(error)}
    >
      <div className="mx-auto max-w-[1600px]">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-[18px] font-bold leading-5 text-slate-800">
              Issues Queue
            </h1>

            <p className="mt-0.5 text-[10px] text-slate-500">
              {issuesData.length.toLocaleString()} open deterministic DQ-rule
              findings
            </p>
          </div>
          <div>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center text-[12px] gap-2 rounded-md bg-[#1565F9] px-2 py-2 text-white"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </header>
        {!showDetails ? (
          <IssuesTable
            data={issuesData}
            filters={issuesApiData.filters}
            onReview={handleReview}
          />
        ) : (
          <>
            <IssuesHeader
              issueHeaderData={{
                breadcrumb: [
                  { label: "Home" },
                  { label: "Issues" },
                  {
                    label:
                      selectedIssue?.issue?.issue_id ||
                      selectedIssue?.issueId ||
                      "-",
                    active: true,
                  },
                ],
                title: "Issue Detail & Remediation",
                subtitle:
                  "View rule details, evidence and propose a corrected value",
                issue: selectedIssue?.issue || {},
                onBack: handleBack,
              }}
            />
            <IssuesDetailsHeader issueDetailData={selectedIssue?.issue} />

            <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,0.95fr)]">
              <IssuesDetailsCustomer issueData={selectedIssue?.issue} />
              <aside className="space-y-3">
                <IssuesCustomerContext issueData={selectedIssue?.issue} />
                <IssuesActivity
                  comments={selectedIssue?.comments || []}
                  audit={selectedIssue?.audit || []}
                />
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
