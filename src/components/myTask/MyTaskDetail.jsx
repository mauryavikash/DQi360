"use client";

import { useState } from "react";

export default function MyTaskDetail({ task, onBack }) {
  const [proposedValue, setProposedValue] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const issue = task?.issue || {};
  const taskUser = task?.task_user || {};

  const fields = [
    ["Issue ID", issue.issue_id],
    ["Customer ID", issue.customer_id],
    ["Customer Name", issue.customer_name],
    ["Severity", issue.severity],
    ["Issue Category", issue.issue_category],
    ["Source System", issue.source_system],
    ["Owner", taskUser.assignee],
    ["Status", taskUser.status],
    ["Age", `${issue.age_days ?? 0}d`],
  ];

  return (
    <div className="space-y-3">
      <header className="flex items-start justify-between">
        <div>
          <p className="text-[9px] text-slate-400">
            Home &nbsp;›&nbsp; My Task &nbsp;›&nbsp;{" "}
            <span className="font-semibold text-blue-600">
              {issue.issue_id}
            </span>
          </p>
          <h1 className="mt-2 text-[18px] font-bold text-[#22345B]">
            Issue Detail &amp; Remediation
          </h1>
          <p className="mt-1 text-[12px] text-slate-500">
            View rule details, evidence and propose a corrected value
          </p>
        </div>
        <button
          onClick={onBack}
          className="rounded-md bg-blue-600 px-4 py-2 text-[12px] font-semibold text-white"
        >
          Back My Task
        </button>
      </header>
      <section className="rounded-[10px] border border-[#2F6FEB] bg-white px-4 py-3">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-5 lg:grid-cols-9">
          {fields.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <p className="text-[12px] text-slate-400">{label}</p>
              <p className="mt-1 truncate text-[12px] font-semibold text-slate-700">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,0.95fr)]">
        <main className="space-y-3">
          <section className="rounded-[10px] bg-white p-4 shadow-sm">
            <h2 className="text-[12px] font-bold text-[#22345B]">
              Why was this flagged?
            </h2>
            <dl className="mt-3 grid grid-cols-[92px_1fr] gap-x-3 gap-y-2 text-[12px]">
              <dt className="text-slate-400">DQ Rule</dt>
              <dd className="font-medium text-slate-700">{issue.dq_rule}</dd>
              <dt className="text-slate-400">Issue type</dt>
              <dd>{issue.issue_category}</dd>
              <dt className="text-slate-400">Source record</dt>
              <dd>{issue.source_system}</dd>
            </dl>
          </section>
          <section className="rounded-[10px] bg-white p-4 shadow-sm">
            <h2 className="text-[12px] font-bold text-[#22345B]">
              Current vs Proposed Value
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-[12px]">
                <b className="text-red-600">Current Value</b>
                <p className="mt-2 text-slate-500">
                  Rule result requires remediation.
                </p>
              </div>
              <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-[12px]">
                <label
                  className="font-semibold text-blue-600"
                  htmlFor="task-proposed-value"
                >
                  Proposed Value
                </label>
                <input
                  id="task-proposed-value"
                  value={proposedValue}
                  onChange={(event) => setProposedValue(event.target.value)}
                  className="mt-2 h-7 w-full rounded border border-blue-200 bg-white px-2 outline-none"
                  placeholder="Enter corrected value"
                />
              </div>
            </div>
          </section>
          <section className="rounded-[10px] bg-white p-4 shadow-sm">
            <h2 className="text-[12px] font-bold text-[#22345B]">
              Remediation Proposal
            </h2>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              className="mt-3 h-16 w-full resize-none rounded-md border border-slate-200 p-2 text-[12px] outline-none"
              placeholder="Describe the proposed correction"
            />
            <div className="mt-3 flex items-center gap-2">
              <button
                disabled={!proposedValue.trim()}
                onClick={() => setSubmitted(true)}
                className="rounded-md bg-blue-600 px-3 py-2 text-[12px] font-semibold text-white disabled:bg-slate-300"
              >
                Submit Proposal
              </button>
              <button
                onClick={() => {
                  setProposedValue("");
                  setComment("");
                  setSubmitted(false);
                }}
                className="rounded-md border border-blue-300 px-3 py-2 text-[12px] font-semibold text-blue-600"
              >
                Clear
              </button>
              {submitted && (
                <span className="text-[12px] text-emerald-600">
                  Proposal ready to submit
                </span>
              )}
            </div>
          </section>
        </main>
        <aside className="space-y-3">
          <section className="rounded-[10px] bg-white p-4 shadow-sm">
            <h2 className="text-[12px] font-bold text-[#22345B]">
              Customer Context
            </h2>
            <dl className="mt-3 space-y-2 text-[12px]">
              {[
                [
                  ["Customer ID", issue.customer_id],
                  ["Customer Name", issue.customer_name],
                  ["Source System", issue.source_system],
                  ["Assigned to", taskUser.assignee],
                ],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[88px_1fr] gap-2">
                  <dt className="text-slate-400">{label}</dt>
                  <dd className="font-medium text-slate-700">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="rounded-[10px] bg-white p-4 shadow-sm">
            <h2 className="text-[12px] font-bold text-[#22345B]">
              Activity &amp; Audit History
            </h2>
            <p className="mt-3 text-[12px] text-slate-400">
              No activity history was returned for this task.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
