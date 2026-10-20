// "use client";

// import { useState } from "react";

// export default function MyTaskDetail({ task, onBack }) {
//   const [proposedValue, setProposedValue] = useState("");
//   const [comment, setComment] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const issue = task?.issue || {};
//   const taskUser = task?.task_user || {};

//   const fields = [
//     ["Issue ID", issue.issue_id],
//     ["Customer ID", issue.customer_id],
//     ["Customer Name", issue.customer_name],
//     ["Severity", issue.severity],
//     ["Issue Category", issue.issue_category],
//     ["Source System", issue.source_system],
//     ["Owner", taskUser.assignee],
//     ["Status", taskUser.status],
//     ["Age", `${issue.age_days ?? 0}d`],
//   ];

//   return (
//     <div className="space-y-3">
//       <header className="flex items-start justify-between">
//         <div>
//           <p className="text-[9px] text-slate-400">
//             Home &nbsp;›&nbsp; My Task &nbsp;›&nbsp;{" "}
//             <span className="font-semibold text-blue-600">
//               {issue.issue_id}
//             </span>
//           </p>
//           <h1 className="mt-2 text-[18px] font-bold text-[#22345B]">
//             Issue Detail &amp; Remediation
//           </h1>
//           <p className="mt-1 text-[12px] text-slate-500">
//             View rule details, evidence and propose a corrected value
//           </p>
//         </div>
//         <button
//           onClick={onBack}
//           className="rounded-md bg-blue-600 px-4 py-2 text-[12px] font-semibold text-white"
//         >
//           Back My Task
//         </button>
//       </header>
//       <section className="rounded-[10px] border border-[#2F6FEB] bg-white px-4 py-3">
//         <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-5 lg:grid-cols-9">
//           {fields.map(([label, value]) => (
//             <div key={label} className="min-w-0">
//               <p className="text-[12px] text-slate-400">{label}</p>
//               <p className="mt-1 truncate text-[12px] font-semibold text-slate-700">
//                 {value}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
//       <div className="grid gap-3 lg:grid-cols-[minmax(0,1.85fr)_minmax(280px,0.95fr)]">
//         <main className="space-y-3">
//           <section className="rounded-[10px] bg-white p-4 shadow-sm">
//             <h2 className="text-[12px] font-bold text-[#22345B]">
//               Why was this flagged?
//             </h2>
//             <dl className="mt-3 grid grid-cols-[92px_1fr] gap-x-3 gap-y-2 text-[12px]">
//               <dt className="text-slate-400">DQ Rule</dt>
//               <dd className="font-medium text-slate-700">{issue.dq_rule}</dd>
//               <dt className="text-slate-400">Issue type</dt>
//               <dd>{issue.issue_category}</dd>
//               <dt className="text-slate-400">Source record</dt>
//               <dd>{issue.source_system}</dd>
//             </dl>
//           </section>
//           <section className="rounded-[10px] bg-white p-4 shadow-sm">
//             <h2 className="text-[12px] font-bold text-[#22345B]">
//               Current vs Proposed Value
//             </h2>
//             <div className="mt-3 grid gap-3 sm:grid-cols-2">
//               <div className="rounded-md border border-red-200 bg-red-50 p-3 text-[12px]">
//                 <b className="text-red-600">Current Value</b>
//                 <p className="mt-2 text-slate-500">
//                   Rule result requires remediation.
//                 </p>
//               </div>
//               <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-[12px]">
//                 <label
//                   className="font-semibold text-blue-600"
//                   htmlFor="task-proposed-value"
//                 >
//                   Proposed Value
//                 </label>
//                 <input
//                   id="task-proposed-value"
//                   value={proposedValue}
//                   onChange={(event) => setProposedValue(event.target.value)}
//                   className="mt-2 h-7 w-full rounded border border-blue-200 bg-white px-2 outline-none"
//                   placeholder="Enter corrected value"
//                 />
//               </div>
//             </div>
//           </section>
//           <section className="rounded-[10px] bg-white p-4 shadow-sm">
//             <h2 className="text-[12px] font-bold text-[#22345B]">
//               Remediation Proposal
//             </h2>
//             <textarea
//               value={comment}
//               onChange={(event) => setComment(event.target.value)}
//               className="mt-3 h-16 w-full resize-none rounded-md border border-slate-200 p-2 text-[12px] outline-none"
//               placeholder="Describe the proposed correction"
//             />
//             <div className="mt-3 flex items-center gap-2">
//               <button
//                 disabled={!proposedValue.trim()}
//                 onClick={() => setSubmitted(true)}
//                 className="rounded-md bg-blue-600 px-3 py-2 text-[12px] font-semibold text-white disabled:bg-slate-300"
//               >
//                 Submit Proposal
//               </button>
//               <button
//                 onClick={() => {
//                   setProposedValue("");
//                   setComment("");
//                   setSubmitted(false);
//                 }}
//                 className="rounded-md border border-blue-300 px-3 py-2 text-[12px] font-semibold text-blue-600"
//               >
//                 Clear
//               </button>
//               {submitted && (
//                 <span className="text-[12px] text-emerald-600">
//                   Proposal ready to submit
//                 </span>
//               )}
//             </div>
//           </section>
//         </main>
//         <aside className="space-y-3">
//           <section className="rounded-[10px] bg-white p-4 shadow-sm">
//             <h2 className="text-[12px] font-bold text-[#22345B]">
//               Customer Context
//             </h2>
//             <dl className="mt-3 space-y-2 text-[12px]">
//               {[
//                 [
//                   ["Customer ID", issue.customer_id],
//                   ["Customer Name", issue.customer_name],
//                   ["Source System", issue.source_system],
//                   ["Assigned to", taskUser.assignee],
//                 ],
//               ].map(([label, value]) => (
//                 <div key={label} className="grid grid-cols-[88px_1fr] gap-2">
//                   <dt className="text-slate-400">{label}</dt>
//                   <dd className="font-medium text-slate-700">{value}</dd>
//                 </div>
//               ))}
//             </dl>
//           </section>
//           <section className="rounded-[10px] bg-white p-4 shadow-sm">
//             <h2 className="text-[12px] font-bold text-[#22345B]">
//               Activity &amp; Audit History
//             </h2>
//             <p className="mt-3 text-[12px] text-slate-400">
//               No activity history was returned for this task.
//             </p>
//           </section>
//         </aside>
//       </div>
//     </div>
//   );
// }

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