import { AlertTriangle, ClipboardCheck } from "lucide-react";

export default function IssuesDetailsHeader({ issueDetailData }) {
  if (!issueDetailData) return null;

  const severityClass = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-blue-50 text-blue-600",
  }[issueDetailData.severity] ?? "bg-red-100 text-red-600";

  return (
    <section className="mt-3 rounded-[10px] border border-[#2F6FEB] bg-white px-4 py-3 shadow-sm">
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-5 lg:grid-cols-10">
        {[["Issue ID", issueDetailData.issueId], ["Customer ID", issueDetailData.customerId], ["Customer Name", issueDetailData.customerName], ["Severity", <span key="severity" className={`inline-flex items-center gap-1 rounded px-2 py-0.5 ${severityClass}`}><AlertTriangle size={10} />{issueDetailData.severity}</span>], ["Issue Category", issueDetailData.category], ["DQ Score", issueDetailData.dqScore], ["Source System", issueDetailData.sourceSystem], ["Owner", issueDetailData.assignee], ["Status", <span key="status" className="rounded bg-blue-50 px-2 py-0.5 text-blue-600">{issueDetailData.status}</span>], ["Age", issueDetailData.age]].map(([label, value]) => (
          <div key={label} className="min-w-0">
            <p className="text-[8px] text-slate-400">{label}</p>
            <div className="mt-1 truncate text-[9px] font-semibold text-slate-700">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-end"><span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-[8px] font-semibold text-blue-600"><ClipboardCheck size={10} /> Deterministic DQ Rule Result</span></div>
    </section>
  );
}