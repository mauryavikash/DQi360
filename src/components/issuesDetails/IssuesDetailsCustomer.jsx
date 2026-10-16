"use client";

import { useState } from "react";
import { CheckCircle2, FileText, PencilLine, ShieldAlert } from "lucide-react";

export default function IssuesDetailsCustomer({ issueData }) {
  const [proposedValue, setProposedValue] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!issueData) return null;

  return (
    <div className="space-y-3">
      <section className="rounded-[10px] bg-white p-4 shadow-sm">
        <h2 className="flex items-center gap-2 text-[11px] font-bold text-[#22345B]"><ShieldAlert size={13} className="text-blue-600" /> Why was this flagged?</h2>
        <dl className="mt-3 grid grid-cols-[88px_1fr] gap-x-3 gap-y-2 text-[9px]"><dt className="text-slate-400">DQ Rule</dt><dd className="font-medium text-slate-700">{issueData.rule}</dd><dt className="text-slate-400">Category</dt><dd>{issueData.category}</dd><dt className="text-slate-400">Source</dt><dd>{issueData.sourceSystem}</dd><dt className="text-slate-400">Detected</dt><dd>{issueData.detectedDate}</dd></dl>
      </section>
      <section className="rounded-[10px] bg-white p-4 shadow-sm">
        <h2 className="flex items-center gap-2 text-[11px] font-bold text-[#22345B]"><PencilLine size={13} className="text-blue-600" /> Current vs Proposed Value</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="rounded-md border border-red-200 bg-red-50 p-3 text-[9px]"><p className="font-semibold text-red-600">Current Value</p><p className="mt-2 text-slate-500">Rule result requires remediation.</p></div><div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-[9px]"><label className="font-semibold text-blue-600" htmlFor="proposed-value">Proposed Value</label><input id="proposed-value" value={proposedValue} onChange={(event) => setProposedValue(event.target.value)} className="mt-2 h-7 w-full rounded border border-blue-200 bg-white px-2 outline-none" placeholder="Enter corrected value" /></div></div>
      </section>
      <section className="rounded-[10px] bg-white p-4 shadow-sm"><h2 className="flex items-center gap-2 text-[11px] font-bold text-[#22345B]"><FileText size={13} className="text-blue-600" /> Remediation Proposal</h2><label className="mt-3 block text-[9px] text-slate-500" htmlFor="remediation-comment">Comment (optional)</label><textarea id="remediation-comment" value={comment} onChange={(event) => setComment(event.target.value)} className="mt-1 h-16 w-full resize-none rounded-md border border-slate-200 p-2 text-[9px] outline-none" placeholder="Describe the proposed correction" /><div className="mt-3 flex items-center gap-2"><button onClick={() => setSubmitted(true)} disabled={!proposedValue.trim()} className="rounded-md bg-blue-600 px-3 py-2 text-[9px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300">Submit Proposal</button><button onClick={() => { setProposedValue(""); setComment(""); setSubmitted(false); }} className="rounded-md border border-blue-300 px-3 py-2 text-[9px] font-semibold text-blue-600">Clear</button>{submitted && <span className="inline-flex items-center gap-1 text-[9px] text-emerald-600"><CheckCircle2 size={12} /> Proposal ready to submit</span>}</div></section>
    </div>
  );
}
