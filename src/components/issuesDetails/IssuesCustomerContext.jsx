import { Building2 } from "lucide-react";

export default function IssuesCustomerContext({ issueData }) {
  if (!issueData) return null;

  return (
    <section className="rounded-[10px] bg-white p-4 shadow-sm">
      <h3 className="flex items-center gap-2 text-[11px] font-bold text-[#22345B]"><Building2 size={13} className="text-blue-600" /> Customer Context</h3>
      <dl className="mt-4 space-y-2 text-[9px]">
        {[['Customer ID', issueData.customerId], ['Customer Name', issueData.customerName], ['Source System', issueData.sourceSystem], ['Issue Category', issueData.category], ['DQ Score', issueData.dqScore], ['Assignee', issueData.assignee]].map(([label, value]) => <div key={label} className="grid grid-cols-[90px_1fr] gap-2"><dt className="text-slate-400">{label}</dt><dd className="font-medium text-slate-700">{value}</dd></div>)}
      </dl>
    </section>
  );
}