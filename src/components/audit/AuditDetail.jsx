export default function AuditDetail({ event, onClose }) {
  const information = [
    ["Event ID", event.id],
    ["Timestamp", `${event.date} ${event.time}`],
    ["Event Type", event.event_type],
    ["Customer ID", event.customer_id],
    ["Customer", event.customer_name],
    ["Attribute", event.attribute],
    ["Source", event.source_system],
    ["Performed By", event.performed_by],
    ["Status", event.status ?? "Recorded"],
  ];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[700px] max-h-[85vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-bold text-[#22345B]">
            Audit Event Details
          </h2>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>
        <p className="mt-3 rounded-md bg-blue-50 p-3 text-[12px] text-slate-600">
          Audit records are read-only and cannot be modified.
        </p>
        <h3 className="mt-4 text-[12px] font-bold text-[#22345B]">
          Event Information
        </h3>
        <dl className="mt-3 space-y-2 text-[12px]">
          {information.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[95px_1fr] gap-2">
              <dt className="text-slate-400">{label}</dt>
              <dd className="break-words text-slate-700">{value ?? "-"}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-5 text-[12px] font-bold text-[#22345B]">
          Change Details
        </h3>
        <div className="mt-2 rounded-md bg-slate-50 p-3 text-[12px]">
          <p className="text-slate-400">Previous Value</p>
          <p className="mt-1 text-slate-700">{event.previous_value ?? "-"}</p>
        </div>
        <div className="mt-2 rounded-md bg-blue-50 p-3 text-[12px]">
          <p className="text-blue-600">New / Proposed Value</p>
          <p className="mt-1 text-slate-700">{event.new_value ?? "-"}</p>
        </div>
      </div>
    </div>
    // </aside>
  );
}
