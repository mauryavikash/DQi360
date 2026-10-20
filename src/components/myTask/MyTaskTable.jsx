"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  TriangleAlert,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function MyTaskTable({ tasks = [], onOpenTask }) {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All");
  const [issueType, setIssueType] = useState("All");
  const [sourceSystem, setSourceSystem] = useState("All");
  const [status, setStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filterControls = [
    [
      "Severity",
      severity,
      setSeverity,
      [...new Set(tasks.map((t) => t.severity).filter(Boolean))],
    ],
    [
      "Issue Type",
      issueType,
      setIssueType,
      [...new Set(tasks.map((t) => t.issue_type).filter(Boolean))],
    ],
    [
      "Source System",
      sourceSystem,
      setSourceSystem,
      [...new Set(tasks.map((t) => t.source_system).filter(Boolean))],
    ],
    [
      "Status",
      status,
      setStatus,
      [...new Set(tasks.map((t) => t.status).filter(Boolean))],
    ],
  ];

  const filteredData = useMemo(() => {
    return tasks.filter((item) => {
      const searchMatch =
        (item.customer_name || "")
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        (item.issue_id || "").toLowerCase().includes(query.toLowerCase());

      const severityMatch = severity === "All" || item.severity === severity;

      const typeMatch = issueType === "All" || item.issue_type === issueType;

      const sourceMatch =
        sourceSystem === "All" || item.source_system === sourceSystem;

      const statusMatch = status === "All" || item.status === status;

      return (
        searchMatch && severityMatch && typeMatch && sourceMatch && statusMatch
      );
    });
  }, [tasks, query, severity, issueType, sourceSystem, status]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;

    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const getSeverityStyle = (value) => {
    switch (value) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-red-50 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getStatusStyle = (value) => {
    switch (value) {
      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Approved":
        return "bg-green-100 text-green-700";

      case "Awaiting Approval":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <>
      <section className="mt-4 rounded-[24px]">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7C8BA5]"
            />

            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search customer or issue id..."
              className="h-[46px] w-full rounded-[14px] border border-[#D9E0EB] bg-white pl-12 pr-4 text-[12px] outline-none"
            />
          </div>

          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex h-[44px] items-center gap-2 rounded-[14px] bg-[#0B63F6] px-5 text-[12px] font-semibold text-white"
          >
            <Filter size={16} />
            Filters
          </button>

          <div className="text-[12px]">
            Sort by:
            <span className="ml-1 font-semibold text-[#0B63F6]">
              Severity & Age
            </span>
            <ChevronDown size={12} className="ml-1 inline" />
          </div>
        </div>

        {showFilters && (
          <div className="mt-6 flex flex-wrap gap-4">
            {filterControls.map(([label, value, onChange, options]) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border bg-slate-50 px-3 py-2"
              >
                <span className="text-xs text-slate-500">{label}</span>

                <select
                  value={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded border px-2 py-1 text-xs"
                >
                  <option value="All">All</option>

                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-6 overflow-hidden rounded-[24px] border border-[#D9E0EB] bg-white shadow-sm">
        <div className="border-b border-[#E5EAF2] bg-white px-6 py-5">
          <h3 className="text-[28px] font-bold text-[#24324B]">
            {filteredData.length} Tasks
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1450px]">
            <thead>
              <tr className="border-b border-[#E5EAF2] bg-[#F8FAFC] text-left">
                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Severity
                </th>

                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Issue ID
                </th>

                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Customer
                </th>

                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Why this needs attention
                </th>

                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Issue Type
                </th>

                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Source System
                </th>

                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Assigned Date
                </th>
                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Assigned To
                </th>

                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Age
                </th>

                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Status
                </th>

                <th className="px-5 py-4 text-[14px] font-semibold text-[#24324B]">
                  Action
                </th>

                {/* <th className="px-5 py-4"></th> */}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row.issue_id}
                  className="border-b border-[#E5EAF2] hover:bg-[#FAFBFC]"
                >
                  <td className="px-5 py-5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getSeverityStyle(
                        row.severity,
                      )}`}
                    >
                      <TriangleAlert size={12} />
                      {row.severity}
                    </span>
                  </td>

                  <td className="px-5 py-5 font-semibold text-[#0B63F6]">
                    {row.issue_id}
                  </td>

                  <td className="px-5 py-5 text-[#24324B]">
                    {row.customer_name}
                  </td>

                  <td className="max-w-[350px] px-5 py-5">
                    <div className="line-clamp-2 text-[#555]">{row.why}</div>
                  </td>

                  <td className="px-5 py-5">{row.issue_type}</td>

                  <td className="px-5 py-5">{row.source_system}</td>

                  <td className="px-5 py-5">{row.assigned_date}</td>
                  <td className="px-5 py-5">{row.assigned_to}</td>

                  <td className="px-5 py-5">{row.age_days ?? 0}d</td>

                  <td className="px-5 py-5">
                    <span
                      className="
                  inline-flex
                  min-w-[120px]
                  justify-center
                  rounded-lg
                  bg-blue-100
                  px-3
                  py-1.5
                  text-sm
                  font-semibold
                  text-blue-700
                "
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <button
                      onClick={() =>
                        onOpenTask?.(
                          {
                            issueId: row.issue_id,
                          },
                          row.status === "In Progress" ? "continue" : "start",
                        )
                      }
                      className="
                  h-[46px]
                  min-w-[140px]
                  rounded-xl
                  border
                  border-[#0B63F6]
                  bg-white
                  text-[16px]
                  font-semibold
                  text-[#0B63F6]
                "
                    >
                      {row.status === "In Progress" ? "Continue" : "Start"}
                    </button>
                  </td>

                  {/* <td className="px-5 py-5">
                    <MoreVertical
                      size={18}
                      className="cursor-pointer text-[#0B63F6]"
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-[#E5EAF2] bg-white px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">Rows per page</span>

              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <span className="text-sm text-slate-500">
                {(currentPage - 1) * rowsPerPage + 1} -
                {Math.min(currentPage * rowsPerPage, filteredData.length)} of{" "}
                {filteredData.length}
              </span>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="rounded-lg border px-3 py-2 disabled:opacity-40"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .slice(
                    Math.max(currentPage - 3, 0),
                    Math.max(currentPage - 3, 0) + 5,
                  )
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 min-w-[40px] rounded-lg ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-slate-300"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="rounded-lg border px-3 py-2 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
