"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Clock, FileText, Upload, AlertTriangle, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";
import { submitMyTaskProposal } from "@/app/lib/api";
export default function MyTaskDetail({ task, onBack }) {
  const [proposedValue, setProposedValue] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);
  const issue = task?.issue || {};
  const audit = task?.audit || [];
  const comments = task?.comments || [];
  const taskUser = task?.task_user || "-";
  const whyFlagged = issue?.why_flagged || {};
  const currentValuePanel = issue?.current_value_panel || {};
  const proposedPanel = issue?.proposed_value_panel || {};

 useEffect(() => {
  setProposedValue("");
  setComment("");
}, [issue]);

  const summaryFields = [
    ["Issue ID", issue.issue_id],
    ["Customer ID", issue.customer_id],
    ["Customer Name", issue.customer_name],
    ["Severity", issue.severity],
    ["Issue Category", issue.issue_category],
    ["DQ Score", issue.dq_score],
    ["Source System", issue.source_system],
    ["Owner", issue.assigned_to],
    ["Status", issue.status],
    ["Age", `${issue.age_days ?? 0} days`],
  ];
const severityClass =
  {
    Critical: "bg-red-100 text-red-600",
    High: "bg-red-100 text-red-600",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-blue-50 text-blue-600",
  }[issue?.severity] || "bg-red-100 text-red-600";
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-slate-400">
            Home › My Task ›{" "}
            <span className="font-semibold text-blue-600">
              {issue.issue_id}
            </span>
          </div>
          <h1 className="mt-2 text-[20px] font-bold text-slate-800">
            Issue Detail & Remediation
          </h1>
          <p className="mt-1 text-[12px] text-slate-500">
            View rule details, evidence and propose a corrected value
          </p>
        </div>
        <button
          onClick={onBack}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Back My Task
        </button>
      </div>

      <div className="rounded-[14px] border border-[#2F6FEB] bg-white px-5 py-5 shadow-sm">
  <div className="grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-5 lg:grid-cols-10">
    {[
      ["Issue ID", issue.issue_id],
      ["Customer ID", issue.customer_id],

      [
        "Customer Name",
        <span
          key="customer"
          className="block truncate"
          title={issue.customer_name}
        >
          {issue.customer_name}
        </span>,
      ],

      [
        "Severity",
        <span
          key="severity"
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-semibold ${severityClass}`}
        >
          <AlertTriangle size={11} />
          {issue.severity}
        </span>,
      ],

      ["Issue Category", issue.issue_category],

      ["DQ Score", issue.dq_score],

      ["Source System", issue.source_system],

      ["Owner", issue.assigned_to || issue.owner],

      [
        "Status",
        <span
          key="status"
          className="inline-flex rounded-md bg-blue-50 px-2 py-1 text-[12px] font-semibold text-blue-600"
        >
          {issue.status}
        </span>,
      ],

      ["Age", `${issue.age_days || 0}d`],
    ].map(([label, value]) => (
      <div key={label} className="min-w-0">
        <p className="text-[12px] whitespace-nowrap font-medium text-[#94A3B8]">
          {label}
        </p>

        <div className="mt-2 truncate text-[12px] font-bold text-[#334155]">
          {value || "-"}
        </div>
      </div>
    ))}
  </div>

  <div className="mt-2 flex justify-end">
    <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1.5 text-[10px] font-semibold text-blue-600">
      <ClipboardCheck size={11} />
      Deterministic DQ Rule Result
    </span>
  </div>
</div>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[12px] font-bold text-[#22345B]">
                Why was this flagged?
              </h2>
              <span className="text-xs font-semibold text-[#2563EB]">
                How this rule is evaluated →
              </span>
            </div>
            <div className="grid grid-cols-[170px_1fr] gap-y-3 text-[12px]">
              <div className="text-slate-500">DQ Rule</div>
              <div>{whyFlagged.dq_rule}</div>
              <div className="text-slate-500">Rule Description</div>
              <div>{whyFlagged.rule_description}</div>
              <div className="text-slate-500">Affected Attribute</div>
              <div>{whyFlagged.affected_attribute}</div>
              <div className="text-slate-500">Validation Result</div>
              <div className="font-semibold text-red-600"> ❌ {whyFlagged.validation_result}</div>
              <div className="text-slate-500">Source Record</div>
              <div>{whyFlagged.source_record}</div>
              <div className="text-slate-500">Evidence</div>
              <div className="rounded-lg bg-slate-50 p-4">
                {whyFlagged?.evidence?.map((e, i) => (
                  <div key={i}>• {e}</div>
                ))}
              </div>
              <div className="text-slate-500">Rule Version</div>
              <div>{whyFlagged.rule_version}</div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-[12px] font-semibold text-slate-800">
              Current vs Proposed Value
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="font-semibold text-red-600">Current Value</div>
                <div className="mt-3 space-y-2 text-[12px]">
                  <Row label="Field" value={currentValuePanel.field} />
                  <Row label="Current Value"
                    value={currentValuePanel.current_value}
                  />
                  <Row
                    label="Validation Status"
                    value={currentValuePanel.validation_status}
                  />
                  <Row
                    label="Source System"
                    value={currentValuePanel.source_system}
                  />
                  <Row
                    label="Last Updated"
                    value={currentValuePanel.last_updated}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="font-semibold text-blue-600">
                  Proposed Value
                </div>
                <div className="mt-3 space-y-2 text-[12px]">
                  <Row label="Field" value={proposedPanel.field} />
                  <Row label="Proposed Value"
                    value={proposedPanel.proposed_value}
                  />
                  <Row
                    label="Evidence Status"
                    value={proposedPanel.evidence_status}
                  />
                  <Row label="Source" value={proposedPanel.source} />
                </div>
                <div className="mt-3 text-[12px] font-medium text-green-600">
                  ✅ Steward confirmation required
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
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
                  value={proposedValue || ""}
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
                    await submitMyTaskProposal(issueData.issue_id, {
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
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-[12px] font-semibold text-slate-800">
              Customer Context
            </h2>
            <div className="space-y-2 text-[12px]">
              <Row label="Customer ID" value={issue.customer_id} />
              <Row label="Customer Name" value={issue.customer_name} />
              <Row label="Country" value={issue.COUNTRY_NAME} />
              <Row label="City" value={issue.CITY} />
              <Row label="Customer Type" value={issue.CUSTOMER_TYPE} />
              <Row label="Customer Segment" value={issue.CUSTOMER_SEGMENT} />
              <Row label="Sales Organisation" value={issue.SALES_ORGANISATION}/>
              <Row label="Credit Control Area" value={issue.CREDIT_CONTROL_AREA}/>
              <Row label="Email" value={issue.EMAIL_ADDRESS} />
              <Row label="Phone" value={issue.PHONE_NUMBER} />
              <Row label="Address"
                value={`${issue.STREET || ""}, ${issue.POSTAL_CODE || ""}, ${
                  issue.CITY || ""
                }, ${issue.COUNTRY_NAME || ""}`}
              />
              <Row label="Assigned To" value={issue.assigned_to} />
              <Row label="Task User" value={taskUser} />
            
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="text-slate-500">View Document</div>

              <div>
                <button
                  onClick={() => setShowCustomerPopup(true)}
                  className="rounded-md border border-[#1565F9] px-3 py-1.5 text-[12px] font-semibold text-[#1565F9] hover:bg-blue-50"
                >
                  View Document
                </button>
              </div>
            </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[12px] font-semibold text-slate-800">
                Activity & Audit History
              </h2>

              <span className="text-xs font-medium text-blue-600">
                All activity (newest first)
              </span>
            </div>
            <div className="h-[500px] overflow-y-auto pr-2">
              {audit.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 pb-4 "
                >
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Clock size={16} />
                  </div>

                  <div className="flex-1">
                    <div className=" text-[12px] font-semibold text-slate-800">
                      {item.event_type}
                    </div>

                    <div className="text-[12px] text-slate-600">
                      {item.attribute_event}
                    </div>

                    <div className="mt-1 text-[12px] text-slate-400">
                      {new Date(item.event_time).toLocaleString()}
                    </div>

                    <div className="mt-1 text-[12px] text-slate-500">
                      {item.performed_by}
                    </div>

                    {(item.previous_value || item.new_value) && (
                      <div className="mt-1 rounded bg-slate-50 p-2 text-[12px]">
                        <div>
                          <strong>Previous:</strong>{" "}
                          {item.previous_value || "-"}
                        </div>
                        <div>
                          <strong>New:</strong> {item.new_value || "-"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showCustomerPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-[700px] rounded-[16px] bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <h2 className="text-[16px] font-bold text-[#22345B]">
          Customer Context Details
        </h2>
        <button
          onClick={() => setShowCustomerPopup(false)}
          className="text-3xl font-light text-[#475569]"
        >
          ×
        </button>
      </div>
      <div className="mx-6 border-b border-[#CBD5E1]" />
      {/* Body */}
      <div className="max-h-[65vh] overflow-y-auto px-3 py-3">
        <div className="grid grid-cols-[260px_1fr] gap-y-2">
          <PopupRow
            label="Customer ID"
            value={issue.customer_id}
          />
          <PopupRow
            label="Customer Name"
            value={issue.customer_name}
          />
          <PopupRow
            label="Country / Region"
            value={`${issue.COUNTRY_NAME || ""} (${issue.country_code || ""})`}
          />
          <PopupRow
            label="Customer Type"
            value={issue.CUSTOMER_TYPE}
          />
          <PopupRow
            label="Customer Segment"
            value={issue.CUSTOMER_SEGMENT}
          />
          <PopupRow
            label="Sales Organisation"
            value={issue.SALES_ORGANISATION}
          />
          <PopupRow
            label="Credit Control Area"
            value={issue.CREDIT_CONTROL_AREA}
          />
          <PopupRow
            label="Email"
            value={issue.EMAIL_ADDRESS}
          />
          <PopupRow
            label="Phone"
            value={issue.PHONE_NUMBER}
          />
          <PopupRow
            label="Address"
            value={`${issue.STREET || ""}, ${issue.CITY || ""}, ${issue.POSTAL_CODE || ""}, ${issue.COUNTRY_NAME || ""}`}
          />
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-end px-6 py-5">
        <button
          onClick={() => setShowCustomerPopup(false)}
          className="rounded-lg border border-[#CBD5E1] bg-white px-8 py-3 text-[16px] font-medium text-[#334155] hover:bg-slate-50"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
function PopupRow({ label, value }) {
  return (
    <>
      <div className="text-[12px] font-medium">
        {label}
      </div>
      <div className="break-words text-[12px]">
        {value || "-"}
      </div>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-2">
      <div className="text-slate-500">{label}</div>
      <div className="break-all font-medium text-slate-700">{value || "-"}</div>
    </div>
  );
}
