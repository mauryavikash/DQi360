"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ArrowUpDown,
  AlertTriangle,
} from "lucide-react";

const SEVERITY_ORDER = {
  Critical: 1,
  High: 2,
  Medium: 3,
  Low: 4,
};

function SelectFilter({ value, onChange, options, label }) {
  return (
    <div className="flex h-[32px] items-center rounded-md border border-[#D9E1EF] bg-white px-2">
      <span className="mr-2 whitespace-nowrap text-[9px] text-[#667085]">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="cursor-pointer appearance-none bg-transparent pr-5 text-[10px] text-[#344054] outline-none"
        >
          <option value="All">All</option>
          {options.filter(Boolean).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <ChevronDown size={12} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#667085]" />
      </div>
    </div>
  );
}

export default function IssuesTable({ data = [], filters = {}, onReview }) {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All");
  const [category, setCategory] = useState("All");
  const [sourceSystem, setSourceSystem] = useState("All");
  const [status, setStatus] = useState("All");
  const [owner, setOwner] = useState("All");
  const [country, setCountry] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [showFilters, setShowFilters] = useState(true);
  const [criticalFirst, setCriticalFirst] = useState(true);

  const severityColors = {
    Critical: "bg-[#FDECEC] text-[#D92D20]",
    High: "bg-[#FDECEC] text-[#F04438]",
    Medium: "bg-[#FEF0C7] text-[#DC6803]",
    Low: "bg-[#EEF4FF] text-[#155EEF]",
  };

  const statusColors = {
    "In Progress": "bg-[#EEF4FF] text-[#155EEF]",
    "To Do": "bg-[#EAECF0] text-[#667085]",
  };

  const severityOptions = filters.severities ?? [...new Set(data.map((item) => item.severity))];

  const categoryOptions = [...new Set(data.map((item) => item.category))];

  const sourceOptions = filters.source_systems ?? [...new Set(data.map((item) => item.sourceSystem))];

  const statusOptions = filters.statuses ?? [...new Set(data.map((item) => item.status))];

  const ownerOptions = [...new Set(data.map((item) => item.assignee))];
  const countryOptions = filters.countries ?? [...new Set(data.map((item) => item.country).filter(Boolean))];

  const filteredData = useMemo(() => {
    let rows = [...data];

    rows = rows.filter((item) => {
      const searchText = search.toLowerCase();

      const matchSearch =
        item.issueId?.toLowerCase().includes(searchText) ||
        item.customerId?.toLowerCase().includes(searchText) ||
        item.customerName?.toLowerCase().includes(searchText) ||
        item.rule?.toLowerCase().includes(searchText);

      const matchSeverity = severity === "All" || item.severity === severity;

      const matchCategory = category === "All" || item.category === category;

      const matchSource =
        sourceSystem === "All" || item.sourceSystem === sourceSystem;

      const matchStatus = status === "All" || item.status === status;

      const matchOwner = owner === "All" || item.assignee === owner;
      const matchCountry = country === "All" || item.country === country;

      return (
        matchSearch &&
        matchSeverity &&
        matchCategory &&
        matchSource &&
        matchStatus &&
        matchOwner &&
        matchCountry
      );
    });

    rows.sort((a, b) => {
      const difference = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
      return criticalFirst ? difference : -difference;
    });

    return rows;
  }, [data, search, severity, category, sourceSystem, status, owner, country, criticalFirst]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const visiblePage = Math.min(currentPage, totalPages);

  const paginatedData = filteredData.slice(
    (visiblePage - 1) * pageSize,
    visiblePage * pageSize,
  );

  const handleClearAll = () => {
    setSearch("");
    setSeverity("All");
    setCategory("All");
    setSourceSystem("All");
    setStatus("All");
    setOwner("All");
    setCountry("All");
    setCurrentPage(1);
  };

  const exportRows = () => {
    const headings = ["Issue ID", "Customer ID", "Customer Name", "Category", "DQ Rule", "Severity", "DQ Score", "Source System", "Assignee", "Status", "Age", "Detected Date"];
    const values = filteredData.map((item) => [item.issueId, item.customerId, item.customerName, item.category, item.rule, item.severity, item.dqScore, item.sourceSystem, item.assignee, item.status, item.age, item.detectedDate]);
    const csv = [headings, ...values]
      .map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "issues.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4">
      {/* Search & Actions */}

      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Issue ID, Customer ID, customer name or rule..."
            className="h-[34px] w-full rounded-md border border-[#D9E1EF] bg-white pl-9 pr-4 text-[10px] outline-none"
          />
        </div>

        <button onClick={() => setShowFilters((visible) => !visible)} className="flex h-[34px] items-center gap-1.5 rounded-md bg-[#1565F9] px-3 text-[10px] font-semibold text-white">
          <Filter size={14} />
          Filters
        </button>

        <button onClick={exportRows} className="flex h-[34px] items-center gap-1.5 rounded-md bg-[#1565F9] px-3 text-[10px] font-semibold text-white">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Filters */}

      {showFilters && <div className="mt-6 flex flex-wrap items-center gap-3">
        <SelectFilter
          label="Severity"
          value={severity}
          onChange={setSeverity}
          options={severityOptions}
        />

        <SelectFilter
          label="Category"
          value={category}
          onChange={setCategory}
          options={categoryOptions}
        />

        <SelectFilter
          label="Source System"
          value={sourceSystem}
          onChange={setSourceSystem}
          options={sourceOptions}
        />

        <SelectFilter
          label="Status"
          value={status}
          onChange={setStatus}
          options={statusOptions}
        />

        <SelectFilter
          label="Owner"
          value={owner}
          onChange={setOwner}
          options={ownerOptions}
        />

        {countryOptions.length > 0 && (
          <SelectFilter
            label="Country / Region"
            value={country}
            onChange={setCountry}
            options={countryOptions}
          />
        )}

        <button
          onClick={handleClearAll}
          className="ml-auto text-[#1565F9] text-[14px] font-medium"
        >
          Clear all
        </button>
      </div>}

      {/* Table */}

      <div className="mt-6 overflow-hidden rounded-[10px] border border-[#D9E1EF] bg-white shadow-sm">
        <div className="flex items-center justify-between px-3 py-3">
          <h3 className="text-[11px] font-semibold text-[#1D2939]">
            {filteredData.length.toLocaleString()} issues found
          </h3>

          <button onClick={() => setCriticalFirst((value) => !value)} className="flex items-center gap-1 text-[10px]">
            <ArrowUpDown size={16} className="text-[#1565F9]" />

            <span className="text-[#667085]">Sorted by:</span>

            <span className="font-semibold text-[#1565F9]">
              Severity ({criticalFirst ? "Critical first" : "Low first"})
            </span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F9FAFB] text-[#667085] text-[12px] font-medium border-t border-[#EAECF0]">
                <th className="text-left px-2 py-3">Issue ID</th>
                <th className="text-left px-4 py-4">Customer ID</th>
                <th className="text-left px-4 py-4">Customer Name</th>
                <th className="text-left px-4 py-4">Issue Category</th>
                <th className="text-left px-4 py-4">DQ Rule</th>
                <th className="text-left px-4 py-4">Severity</th>
                <th className="text-left px-4 py-4">DQ Score</th>
                <th className="text-left px-4 py-4">Source System</th>
                <th className="text-left px-4 py-4">Assignee</th>
                <th className="text-left px-4 py-4">Status</th>
                <th className="text-left px-4 py-4">Age</th>
                <th className="text-left px-4 py-4">Detected Date</th>
                <th className="text-left px-4 py-4">Action</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.issueId}
                  className="border-t border-[#EAECF0] text-[13px] text-[#475467]"
                >
                  <td className="px-2 py-3 text-[#1565F9]">{item.issueId}</td>

                  <td className="px-4 py-4">{item.customerId}</td>

                  <td className="px-4 py-4 max-w-[180px]">
                    {item.customerName}
                  </td>

                  <td className="px-4 py-4">{item.category}</td>

                  <td className="px-4 py-4 max-w-[180px]">{item.rule}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[12px] font-semibold ${severityColors[item.severity]}`}
                    >
                      <AlertTriangle size={12} />
                      {item.severity}
                    </span>
                  </td>

                  <td className="px-4 py-4">{item.dqScore}</td>

                  <td className="px-4 py-4">{item.sourceSystem}</td>

                  <td className="px-4 py-4">{item.assignee}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 rounded-lg text-[12px] font-semibold ${statusColors[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">{item.age}</td>

                  <td className="px-4 py-4">{item.detectedDate}</td>

                  <td className="px-4 py-4">
                    <button
                        onClick={() => onReview(item)}
                        className="h-[24px] min-w-[62px] rounded-md border border-[#3B82F6] text-[10px] font-semibold text-[#155EEF] hover:bg-blue-50"
                        >
                        Review
                        </button>
                  </td>

                  <td className="px-4 py-4">
                    <MoreVertical size={16} className="text-[#667085]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        <div className="flex items-center justify-between border-t border-[#EAECF0] px-4 py-5">
          <div className="flex items-center gap-4">
            <span className="text-[#667085] text-[14px]">Rows per page</span>

            <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))} className="rounded-md border border-[#D0D5DD] px-3 py-1 text-[#1565F9] font-semibold">
              {[10, 25, 50].map((size) => <option key={size} value={size}>{size}</option>)}
            </select>

            <span className="text-[14px] text-[#344054]">
              {filteredData.length === 0 ? 0 : (visiblePage - 1) * pageSize + 1} – {Math.min(visiblePage * pageSize, filteredData.length)} of {filteredData.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={visiblePage === 1}
              onClick={() => setCurrentPage(visiblePage - 1)}
              className="w-8 h-8 rounded-lg border flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 rounded-lg text-sm ${
                  visiblePage === index + 1
                    ? "bg-[#1565F9] text-white"
                    : "text-[#1565F9]"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={visiblePage === totalPages}
              onClick={() => setCurrentPage(visiblePage + 1)}
              className="w-8 h-8 rounded-lg border flex items-center justify-center"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
