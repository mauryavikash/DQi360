"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  TriangleAlert,
} from "lucide-react";

export default function MyTaskTable({ tasks = [], onOpenTask }) {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All");
  const [issueType, setIssueType] = useState("All");
  const [sourceSystem, setSourceSystem] = useState("All");
  const [status, setStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(true);

  const filterControls = [
    ["Severity", severity, setSeverity, [...new Set(tasks.map((task) => task.severity))]],
    ["Issue Type", issueType, setIssueType, [...new Set(tasks.map((task) => task.issueType))]],
    ["Source System", sourceSystem, setSourceSystem, [...new Set(tasks.map((task) => task.sourceSystem))]],
    ["Status", status, setStatus, [...new Set(tasks.map((task) => task.status))]],
  ];

  const filteredData = useMemo(() => {
    return tasks.filter((item) => {
      const searchMatch =
        item.customer.toLowerCase().includes(query.toLowerCase()) ||
        item.issueId.toLowerCase().includes(query.toLowerCase());

      const severityMatch =
        severity === "All" || item.severity === severity;
      const typeMatch = issueType === "All" || item.issueType === issueType;
      const sourceMatch = sourceSystem === "All" || item.sourceSystem === sourceSystem;
      const statusMatch = status === "All" || item.status === status;

      return searchMatch && severityMatch && typeMatch && sourceMatch && statusMatch;
    });
  }, [tasks, query, severity, issueType, sourceSystem, status]);

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-600";
      case "High":
        return "bg-red-50 text-red-500";
      case "Medium":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <>
      <section className="mt-4 rounded-[24px]">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={22}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7C8BA5]"
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks, customers or issue IDs..."
              className="
                h-[46px]
                w-full
                rounded-[14px]
                border
                border-[#D9E0EB]
                bg-white
                pl-12
                pr-4
                text-[12px]
                font-normal
                text-[#24324B]
                placeholder:text-[#7C8BA5]
                outline-none
              "
            />
          </div>

          <button
            onClick={() => setShowFilters((visible) => !visible)}
            className="
              flex
              h-[44px]
              items-center
              gap-2
              rounded-[14px]
              bg-[#0B63F6]
              px-5
              text-[12px]
              font-semibold
              text-white
            "
          >
            <Filter size={16} />
            Filters
          </button>

          <div className="whitespace-nowrap text-[12px] text-[#24324B]">
            Sort by :-
            <span className="ml-1 font-semibold text-[#0B63F6]">
              Severity and age
            </span>

            <ChevronDown
              size={12}
              className="ml-1 inline text-[#0B63F6]"
            />
          </div>
        </div>

        {showFilters && <div className="mt-8 flex flex-wrap gap-4">
          {filterControls.map(([label, value, onChange, options]) => (
            <div
              key={label}
              className="
                flex
                h-[46px]
                items-center
                gap-3
                rounded-[12px]
                border
                border-[#D9E0EB]
                bg-[#F8FAFC]
                px-3
              "
            >
              <span className="text-[12px] text-[#66758F]">
                {label}
              </span>

              <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="
                  h-[34px]
                  min-w-[80px]
                  rounded-[8px]
                  border
                  border-[#D9E0EB]
                  bg-white
                  px-3
                  text-[12px]
                  text-[#24324B]
                  outline-none
                "
              >
                <option value="All">All</option>
                {options.filter(Boolean).map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
          ))}
        </div>}
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b bg-slate-50 p-4">
          <h3 className="text-2xl font-semibold text-slate-800">
            {filteredData.length} tasks
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1500px]">
            <thead className="bg-slate-100">
              <tr className="text-left text-sm text-slate-600">
                <th className="p-4">Severity</th>
                <th className="p-4">Issue ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Why this needs attention</th>
                <th className="p-4">Issue Type</th>
                <th className="p-4">Source System</th>
                <th className="p-4">Assigned Date</th>
                <th className="p-4">Age ↑</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row) => (
                <tr
                  key={row.issueId}
                  className="border-t border-slate-200 text-sm"
                >
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-lg px-4 py-1 font-medium ${getSeverityStyle(
                        row.severity
                      )}`}
                    >
                      <TriangleAlert size={14} />
                      {row.severity}
                    </span>
                  </td>

                  <td className="p-4 text-blue-600 cursor-pointer">
                    {row.issueId}
                  </td>

                  <td className="p-4">{row.customer}</td>

                  <td className="max-w-[350px] p-4">
                    {row.attention}
                  </td>

                  <td className="p-4">{row.issueType}</td>

                  <td className="p-4">{row.sourceSystem}</td>

                  <td className="p-4">{row.assignedDate}</td>

                  <td className="p-4">{row.age}</td>

                  <td className="p-4">
                    <span
                      className={`inline-flex min-w-[110px] justify-center rounded-lg px-3 py-1 ${
                        row.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => onOpenTask?.(row)}
                      className="rounded-lg border border-blue-500 px-8 py-2 font-semibold text-blue-600"
                    >
                      {row.status === "In Progress"
                        ? "Continue"
                        : "Start"}
                    </button>
                  </td>

                  <td className="p-4">
                    <MoreVertical
                      size={18}
                      className="cursor-pointer text-blue-600"
                    />
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && <tr><td colSpan={11} className="p-8 text-center text-slate-500">No tasks were returned for the current assignment.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t p-5">
          <div className="flex items-center gap-3">
            <span>Rows per page</span>

            <select className="rounded-lg border px-3 py-2">
              <option>25</option>
            </select>

            <span>1 - 6 of 25</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="h-8 w-8 rounded border">&lt;</button>
            <button className="h-8 w-8 rounded bg-blue-600 text-white">1</button>
            <button className="h-8 w-8">2</button>
            <button className="h-8 w-8">3</button>
            <button className="h-8 w-8">4</button>
            <button className="h-8 w-8">5</button>
            <span>...</span>
            <button className="h-8 w-8">196</button>
            <button className="h-8 w-8 rounded border">&gt;</button>
          </div>
        </div>
      </section>
    </>
  );
}