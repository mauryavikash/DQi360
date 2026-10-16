export default function IssuesActivity({ issueData }) {
	const activity = issueData?.activity ?? [];

	return <section className="rounded-[10px] bg-white p-4 shadow-sm"><h3 className="text-[11px] font-bold text-[#22345B]">Activity & Audit History</h3>{activity.length ? <ol className="mt-3 space-y-3">{activity.map((entry, index) => <li key={`${entry.timestamp}-${index}`} className="border-l-2 border-blue-500 pl-3 text-[9px]"><p className="font-semibold text-slate-700">{entry.title ?? entry.action}</p><p className="text-slate-400">{entry.timestamp}</p></li>)}</ol> : <p className="mt-3 text-[9px] text-slate-400">No activity history was returned for this issue.</p>}</section>;
}
