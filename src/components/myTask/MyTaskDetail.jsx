"use client";

import { useState } from "react";

export default function MyTaskDetail({ task, onBack }) {
  const [proposedValue, setProposedValue] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const issue = task?.issue || {};
  const audit = task?.audit || [];
  const comments = task?.comments || [];
  const taskUser = task?.task_user || "-";

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

          <h1 className="mt-2 text-3xl font-bold text-slate-800">
            Issue Detail & Remediation
          </h1>

          <p className="mt-1 text-sm text-slate-500">
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

      <div className="rounded-xl border border-blue-300 bg-white p-4">
        <div className="grid gap-4 md:grid-cols-5 lg:grid-cols-10">
          {summaryFields.map(([label, value]) => (
            <div key={label}>
              <p className="text-xs text-slate-400">{label}</p>

              <div className="mt-1 break-all text-sm font-semibold text-slate-700">
                {value || "-"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Why was this flagged?
            </h2>

            <div className="grid grid-cols-[170px_1fr] gap-y-3 text-sm">
              <div className="text-slate-500">Rule ID</div>
              <div>{issue.rule_id || "-"}</div>

              <div className="text-slate-500">Rule Description</div>
              <div>{issue.rule_description || "-"}</div>

              <div className="text-slate-500">Affected Attribute</div>
              <div>{issue.field_name || "-"}</div>

              <div className="text-slate-500">Validation Result</div>
              <div className="font-medium text-red-600">
                {issue.status || "Failed"}
              </div>

              <div className="text-slate-500">Source Record</div>
              <div>{issue.source_record || "-"}</div>

              <div className="text-slate-500">Issue Condition</div>
              <div>{issue.issue_condition || "-"}</div>

              <div className="text-slate-500">Root Cause</div>
              <div>{issue.root_cause || "-"}</div>

              <div className="text-slate-500">Business Impact</div>
              <div>{issue.business_impact || "-"}</div>

              <div className="text-slate-500">Recommended Action</div>
              <div>{issue.recommended_action || "-"}</div>

              <div className="text-slate-500">Rule Version</div>
              <div>{issue.rule_version || "-"}</div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Current vs Proposed Value
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="font-semibold text-red-600">
                  Current Value
                </div>

                <div className="mt-3 space-y-2 text-sm">
                  <div>
                    <span className="text-slate-500">Field</span>
                    <div>{issue.field_name || "-"}</div>
                  </div>

                  <div>
                    <span className="text-slate-500">Current Value</span>
                    <div>{issue.current_value || "(empty)"}</div>
                  </div>

                  <div>
                    <span className="text-slate-500">Source System</span>
                    <div>{issue.source_system || "-"}</div>
                  </div>

                  <div>
                    <span className="text-slate-500">Last Updated</span>
                    <div>{issue.last_updated || "-"}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="font-semibold text-blue-600">
                  Proposed Value
                </div>

                <input
                  value={proposedValue}
                  onChange={(e) => setProposedValue(e.target.value)}
                  className="mt-3 w-full rounded border border-blue-200 bg-white px-3 py-2 text-sm outline-none"
                  placeholder="Enter corrected value"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Remediation Proposal
            </h2>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Proposed Value
              </label>

              <input
                value={proposedValue}
                onChange={(e) => setProposedValue(e.target.value)}
                className="w-full rounded border p-2"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium">
                Remediation Rationale
              </label>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="h-24 w-full rounded border p-2"
                placeholder="Describe the proposed correction"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setSubmitted(true)}
                disabled={!proposedValue.trim()}
                className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-slate-300"
              >
                Submit Proposal
              </button>

              <button
                onClick={() => {
                  setProposedValue("");
                  setComment("");
                  setSubmitted(false);
                }}
                className="rounded border border-blue-600 px-4 py-2 text-blue-600"
              >
                Clear
              </button>
            </div>

            {submitted && (
              <p className="mt-3 text-sm text-green-600">
                Proposal ready to submit
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Customer Context
            </h2>

            <div className="space-y-2 text-sm">
              <Row label="Customer ID" value={issue.customer_id} />
              <Row label="Customer Name" value={issue.customer_name} />
              <Row label="Country" value={issue.COUNTRY_NAME} />
              <Row label="City" value={issue.CITY} />
              <Row label="Customer Type" value={issue.CUSTOMER_TYPE} />
              <Row label="Customer Segment" value={issue.CUSTOMER_SEGMENT} />
              <Row
                label="Sales Organisation"
                value={issue.SALES_ORGANISATION}
              />
              <Row
                label="Credit Control Area"
                value={issue.CREDIT_CONTROL_AREA}
              />
              <Row label="Email" value={issue.EMAIL_ADDRESS} />
              <Row label="Phone" value={issue.PHONE_NUMBER} />
              <Row
                label="Address"
                value={`${issue.STREET || ""}, ${issue.POSTAL_CODE || ""}, ${
                  issue.CITY || ""
                }, ${issue.COUNTRY_NAME || ""}`}
              />
              <Row label="Assigned To" value={issue.assigned_to} />
              <Row label="Task User" value={taskUser} />
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Activity & Audit History
            </h2>

            {audit.length === 0 && comments.length === 0 ? (
              <p className="text-sm text-slate-500">
                No activity history available.
              </p>
            ) : (
              <>
                {audit.map((item, index) => (
                  <div
                    key={`audit-${index}`}
                    className="mb-3 border-b pb-2"
                  >
                    <div className="font-medium">
                      {item.action || item.status}
                    </div>

                    <div className="text-xs text-slate-500">
                      {item.created_by}
                    </div>
                  </div>
                ))}

                {comments.map((item, index) => (
                  <div
                    key={`comment-${index}`}
                    className="mb-3 border-b pb-2"
                  >
                    <div>{item.comment}</div>

                    <div className="text-xs text-slate-500">
                      {item.created_by}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-2">
      <div className="text-slate-500">{label}</div>
      <div className="break-all font-medium text-slate-700">
        {value || "-"}
      </div>
    </div>
  );
}