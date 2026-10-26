"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  FileText,
  PencilLine,
  ShieldAlert,
  AlertCircle,
  Upload,
} from "lucide-react";

import { submitIssueProposal } from "@/app/lib/api";
import { toast } from "sonner";
export default function IssuesDetailsCustomer({ issueData }) {
  const [proposedValue, setProposedValue] = useState(
    issueData?.proposed_value || "",
  );
  useEffect(() => {
    setProposedValue(issueData?.proposed_value || "");
  }, [issueData]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!issueData) return null;

  const validationPassed = issueData?.status?.toLowerCase() === "approved";

  return (
    <div className="space-y-3">
      {/* Why Flagged */}

      <section className="rounded-[10px] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[12px] font-bold text-[#22345B]">
            <ShieldAlert size={13} className="text-blue-600" />
            Why was this flagged?
          </h2>

          <button
            type="button"
            className="text-[12px] font-semibold text-[#2563EB]"
          >
            How this rule is evaluated →
          </button>
        </div>

        <div className="mt-4 rounded-md border border-slate-200 p-3">
          <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-[12px]">
            <dt className="text-slate-500">DQ Rule</dt>
            <dd className="font-medium text-slate-800">
              {issueData.rule_id || "-"}
            </dd>

            <dt className="text-slate-500">Rule Description</dt>
            <dd className="text-slate-700">
              {issueData.rule_description || "-"}
            </dd>

            <dt className="text-slate-500">Affected Attribute</dt>
            <dd className="text-slate-700 break-words">
              {issueData.field_name || "-"}
            </dd>

            <dt className="text-slate-500">Validation Result</dt>

            <dd>
              <span
                className={`inline-flex items-center gap-1 font-semibold ${
                  validationPassed ? "text-green-600" : "text-red-600"
                }`}
              >
                <AlertCircle size={12} />

                {issueData.status || "Failed"}
              </span>
            </dd>

            <dt className="text-slate-500">Source Record</dt>
            <dd className="text-slate-700">
              {issueData.source_system || "-"} / {issueData.customer_id || "-"}
            </dd>
            <dt className="text-slate-500">Evidence</dt>
            <dd>
              <div className="rounded-lg bg-slate-50 p-2 text-slate-700">
                {(issueData?.evidence || "")
                  .split("\n")
                  .filter(Boolean)
                  .map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
              </div>
            </dd>
            <dt className="text-slate-500">Confidence Label</dt>
            <dd>
              <div className="text-slate-700">
                {issueData.confidence_label || "-"}
              </div>
            </dd>
            <dt className="text-slate-500">Confidence Basis</dt>
            <dd>
              <div className="text-slate-700">
                {issueData.confidence_basis || "-"}
              </div>
            </dd>
            <dt className="text-slate-500">AI Confidence</dt>
            <dd>
              <div className="text-slate-700">
                {issueData.confidence_score || "-"}
              </div>
            </dd>

            <dt className="text-slate-500">Rule Version</dt>

            <dd className="text-slate-700">
              {issueData.rule_id || "-"} v{issueData.rule_version || "-"}
            </dd>
          </dl>
        </div>
      </section>

      {/* Current vs Proposed */}

      <section className="rounded-[10px] bg-white p-4 shadow-sm">
        <h2 className="flex items-center gap-2 text-[12px] font-bold text-[#22345B]">
          <PencilLine size={13} className="text-blue-600" />
          Current vs Proposed Value
        </h2>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {/* Current */}

          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle size={14} className="text-red-600" />

              <p className="text-[12px] font-bold text-red-600">
                Current Value
              </p>
            </div>

            <dl className="grid grid-cols-[90px_1fr] break-words gap-y-2 text-[12px]">
              <dt className="text-slate-500 mr-2">Field</dt>
              <dd>{issueData.field_name || "-"}</dd>

              <dt className="text-slate-500 mr-2">Current Value</dt>
              <dd>{issueData.current_value || "-"}</dd>

              <dt className="text-slate-500 mr-2">Status</dt>

              <dd className="font-semibold text-red-600">
                {issueData.status || "-"}
              </dd>

              <dt className="text-slate-500 mr-2">Source System</dt>

              <dd>{issueData.source_system || "-"}</dd>
              <dt className="text-slate-500 mr-2">Root Cause</dt>
              <dd>{issueData.root_cause || "-"}</dd>
              <dt className="text-slate-500 mr-2"> Business Impact</dt>
              <dd>{issueData.business_impact || "-"}</dd>
              <dt className="text-slate-500 mr-2">Suggested Owner</dt>
              <dd>{issueData.suggested_owner || "-"}</dd>
              <dt className="text-slate-500 mr-2">Last Updated</dt>
              <dd>{issueData.last_updated || "-"}</dd>
            </dl>
          </div>

          {/* Proposed */}

          <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-600" />

                <p className="text-[12px] font-bold text-blue-600">
                  Proposed Value
                </p>
              </div>

              {/* <span className="text-[12px] font-semibold text-blue-600">
                {issueData.proposed_by || ""}
              </span> */}
            </div>

            <dl className="grid grid-cols-[100px_1fr] gap-y-2 text-[12px]">
              <dt className="text-slate-500 mr-2">Field</dt>
              <dd>{issueData.field_name || "-"}</dd>

              <dt className="text-slate-500 mr-2">Proposed Value</dt>

              <dd>
                {/* <input
                  value={proposedValue || issueData.proposed_value || ""}
                  onChange={(e) => setProposedValue(e.target.value)}
                  className="h-7 w-full rounded border border-blue-200 px-2"
                  placeholder="Enter corrected value"
                /> */}
                <dd>{issueData.suggested_value || "-"}</dd>
              </dd>

              <dt className="text-slate-500 mr-2 break-words">
                Remediation Rationale
              </dt>

              <dd className="text-green-600 font-medium">
                {issueData.rationale_template || "-"}
              </dd>

              <dt className="text-slate-500 mr-2">Evidence Status</dt>

              <dd className="text-amber-600 font-medium">
                {issueData?.proposed_value_panel?.evidence_status || "-"}
              </dd>

              <dt className="text-slate-500 mr-2">Source</dt>

              <dd>{issueData.source_system || "-"}</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* Proposal */}

      <section className="rounded-[10px] bg-white p-4 shadow-sm">
        <h2 className="flex items-center gap-2 text-[12px] font-bold text-[#22345B]">
          <FileText size={13} className="text-blue-600" />
          Remediation Proposal
        </h2>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {/* Proposed Value */}

          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">
              Proposed Value *
            </label>

            <input
              value={proposedValue}
              onChange={(e) => setProposedValue(e.target.value)}
              className="h-9 w-full rounded-md border border-slate-300 px-3 text-[12px]"
              placeholder="Enter corrected value"
            />
          </div>

          {/* Remediation Rationale */}

          <div>
            <label className="mb-1 block text-[12px] font-semibold text-slate-600">
              Remediation Rationale *
            </label>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="h-[38px] w-full resize-none rounded-md border border-slate-300 p-2 text-[12px]"
              placeholder="Provide remediation rationale"
            />
          </div>
        </div>

        {/* Supporting Evidence */}

        <div className="mt-4">
          <label className="mb-1 block text-[12px] font-semibold text-slate-600">
            Supporting Evidence
          </label>

          <div className="flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded border border-slate-300 bg-slate-50 px-3 py-2 text-[12px]">
              <Upload size={14} />
              Upload Document
              <input type="file" className="hidden" />
            </label>
          </div>

          <p className="mt-1 text-[12px] text-slate-400">
            Upload relevant document (tax certificate, registration document
            etc.)
          </p>
        </div>

        {/* Optional Comment */}

        <div className="mt-4">
          <label className="mb-1 block text-[12px] font-semibold text-slate-600">
            Comment (Optional)
          </label>

          <textarea
            className="h-[42px] w-full resize-none rounded-md border border-slate-300 p-2 text-[12px]"
            placeholder="Additional comments"
          />
        </div>

        {/* Action Buttons */}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={async () => {
              const toastId = toast.loading("Submitting proposal...");

              try {
                setIsSubmitting(true);

                await submitIssueProposal(issueData.issue_id, {
                  proposed_value: proposedValue,
                  comment,
                  performed_by:
                    localStorage.getItem("userName") || "System User",
                });

                toast.success("Proposal submitted successfully", {
                  id: toastId,
                });

                setSubmitted(true);

                setProposedValue("");
                setComment("");
              } catch (error) {
                toast.error(
                  error?.response?.data?.message || "Failed to submit proposal",
                  {
                    id: toastId,
                  },
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
            disabled={!proposedValue || submitted || isSubmitting}
            className="rounded-md bg-[#1565F9] px-4 py-2 text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting
              ? "Submitting..."
              : submitted
                ? "Submitted"
                : "Submit Proposal"}
          </button>
          <button className="rounded-md border border-[#1565F9] px-4 py-2 text-[12px] font-semibold text-[#1565F9]">
            Save Draft
          </button>

          <button
            onClick={() => {
              setProposedValue("");
              setComment("");
              setSubmitted(false);
            }}
            className="rounded-md border border-slate-300 px-4 py-2 text-[12px] font-semibold"
          >
            Cancel
          </button>

          <div className="flex-1 rounded-md bg-[#EAF2FF] p-2 text-[12px] text-slate-500">
            Submitting records the proposal and audit event. It does not update
            the source system.
          </div>
        </div>
      </section>
    </div>
  );
}
