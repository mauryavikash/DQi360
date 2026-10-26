"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  X,
} from "lucide-react";
import { assignIssue } from "@/app/lib/api";
import { toast } from "sonner";

const SEVERITY_ORDER = {
  Critical: 1,
  High: 2,
  Medium: 3,
  Low: 4,
};

function SelectFilter({ value, onChange, options, label }) {
  return (
    <div className="flex h-[32px] items-center justify-between rounded-md border border-[#D9E1EF] bg-white px-3">
      <span className="whitespace-nowrap text-[12px] text-[#667085]">
        {label}
      </span>

      <div className="relative border border-[#D9E1EF] m-1 p-1 rounded flex items-center">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-[52px] cursor-pointer appearance-none bg-transparent pr-2 pl-2 text-[10px] font-medium text-[#344054] outline-none"
        >
          <option value="All">All</option>
          {options.filter(Boolean).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <ChevronDown
          size={12}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#667085]"
        />
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
  const [pageSize, setPageSize] = useState(10);
  const [showFilters, setShowFilters] = useState(true);
  const [criticalFirst, setCriticalFirst] = useState(true);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [assignName, setAssignName] = useState("");
  const [assignStatus, setAssignStatus] = useState("In Progress");
  const [isSaving, setIsSaving] = useState(false);
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    setUserRole(user?.role || "");
  }, []);
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

  const severityOptions = filters.severities ?? [
    ...new Set(data.map((item) => item.severity)),
  ];

  const categoryOptions = [...new Set(data.map((item) => item.category))];

  const sourceOptions = filters.source_systems ?? [
    ...new Set(data.map((item) => item.sourceSystem)),
  ];

  const statusOptions = filters.statuses ?? [
    ...new Set(data.map((item) => item.status)),
  ];

  const ownerOptions = [...new Set(data.map((item) => item.assignee))];
  const countryOptions = filters.countries ?? [
    ...new Set(data.map((item) => item.country).filter(Boolean)),
  ];

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
      const difference =
        SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
      return criticalFirst ? difference : -difference;
    });

    return rows;
  }, [
    data,
    search,
    severity,
    category,
    sourceSystem,
    status,
    owner,
    country,
    criticalFirst,
  ]);

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
    const headings = [
      "Issue ID",
      "Customer ID",
      "Customer Name",
      "Category",
      "DQ Rule",
      "Severity",
      "DQ Score",
      "Source System",
      "Assignee",
      "Status",
      "Age",
      "Detected Date",
    ];
    const values = filteredData.map((item) => [
      item.issueId,
      item.customerId,
      item.customerName,
      item.category,
      item.rule,
      item.severity,
      item.dqScore,
      item.sourceSystem,
      item.assignee,
      item.status,
      item.age,
      item.detectedDate,
    ]);
    const csv = [headings, ...values]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
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
            className="h-[34px] w-full rounded-md border border-[#D9E1EF] bg-white pl-9 pr-4 text-[12px] outline-none"
          />
        </div>

        <button
          onClick={() => setShowFilters((visible) => !visible)}
          className="flex h-[34px] items-center gap-1.5 rounded-md bg-[#1565F9] px-3 text-[12px] font-semibold text-white"
        >
          <Filter size={14} />
          Filters
        </button>

        <button
          onClick={exportRows}
          className="flex h-[34px] items-center gap-1.5 rounded-md bg-[#1565F9] px-3 text-[12px] font-semibold text-white"
        >
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Filters */}

      {showFilters && (
        <div className="mt-6 flex flex-wrap items-start gap-3">
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
          {countryOptions.length > 0 && (
            <SelectFilter
              label="Country / Region"
              value={country}
              onChange={setCountry}
              options={countryOptions}
            />
          )}
          <SelectFilter
            label="Owner"
            value={owner}
            onChange={setOwner}
            options={ownerOptions}
          />

          <button
            onClick={handleClearAll}
            className="ml-auto mr-2 text-[#1565F9] text-[12px] font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Table */}

      <div className="mt-6 overflow-hidden rounded-[10px] border border-[#D9E1EF] bg-white shadow-sm">
        <div className="flex items-center justify-between px-3 py-3">
          <h3 className="text-[12px] font-semibold text-[#1D2939]">
            {filteredData.length.toLocaleString()} issues found
          </h3>

          <button
            onClick={() => setCriticalFirst((value) => !value)}
            className="flex items-center gap-1 text-[12px]"
          >
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
                <th className="text-left p-2">Issue ID</th>
                <th className="text-left p-2">Customer ID</th>
                <th className="text-left p-2">Customer Name</th>
                <th className="text-left p-2">Issue Category</th>
                <th className="text-left p-2">DQ Rule</th>
                <th className="text-left p-2">Severity</th>
                <th className="text-left p-2">DQ Score</th>
                <th className="text-left p-2">Source System</th>
                <th className="text-left p-2">Assign To</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Age</th>
                <th className="text-left p-2">Detected Date</th>
                <th className="text-left p-2">Action</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.issueId}
                  className="border-t border-[#EAECF0] text-[12px] text-[#475467]"
                >
                  <td className="p-2 max-w-[60px] text-[#1565F9]">
                    {item.issueId}
                  </td>

                  <td className="p-2">{item.customerId}</td>

                  <td className="p-2 max-w-[120px]">{item.customerName}</td>

                  <td className="p-2">{item.category}</td>

                  <td className="p-2 max-w-[550px]">{item.rule}</td>

                  <td className="p-2">
                    <span
                      className={`inline-flex items-center gap-1 p-2 rounded-lg text-[12px] font-semibold ${severityColors[item.severity]}`}
                    >
                      <AlertTriangle size={12} />
                      {item.severity}
                    </span>
                  </td>

                  <td className="p-2">{item.dqScore}</td>

                  <td className="p-2">{item.sourceSystem}</td>

                  <td className="p-2">{item.assignee}</td>

                  <td className="p-2">
                    <span
                      className={`inline-flex items-center justify-center min-w-[90px] p-2rounded-lg text-[12px] font-semibold ${statusColors[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-2">{item.age}</td>

                  <td className="p-2">{item.detectedDate}</td>

                  <td className="p-2">
                    <button
                      onClick={() => onReview(item)}
                      className="h-[24px] min-w-[62px] rounded-md border border-[#3B82F6] text-[12px] font-semibold text-[#155EEF] hover:bg-blue-50"
                    >
                      Review
                    </button>
                  </td>

                  {userRole === "owner" && (
                    <td className="p-2">
                      <button
                        onClick={() => {
                          setAssignName("");
                          setAssignStatus("In Progress");
                          setSelectedIssueId(item.issueId);
                          setShowAssignPopup(true);
                        }}
                        className="h-[24px] min-w-[62px] cursor-pointer rounded-md border border-[#3B82F6] text-[12px] font-semibold text-[#155EEF] hover:bg-blue-50"
                      >
                        Assign
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        <div className="flex items-center justify-between border-t border-[#EAECF0] px-4 py-5">
          <div className="flex items-center gap-4">
            <span className="text-[#667085] text-[12px]">Rows per page</span>

            <select
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
              className="rounded-md border border-[#D0D5DD] px-3 py-1 text-[#1565F9] font-semibold"
            >
              {[10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <span className="text-[12px] text-[#344054]">
              {filteredData.length === 0 ? 0 : (visiblePage - 1) * pageSize + 1}{" "}
              – {Math.min(visiblePage * pageSize, filteredData.length)} of{" "}
              {filteredData.length}
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

            {Array.from(
              {
                length: Math.min(5, totalPages),
              },
              (_, index) => {
                const startPage = Math.max(
                  1,
                  Math.min(currentPage - 2, totalPages - 4),
                );

                const page = startPage + index;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-lg text-sm ${
                      visiblePage === page
                        ? "bg-[#1565F9] text-white"
                        : "border border-[#D0D5DD] text-[#1565F9]"
                    }`}
                  >
                    {page}
                  </button>
                );
              },
            )}
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

      {showAssignPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="w-[420px] rounded-xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-[12px] font-bold">Assign Issue</h3>

              <button onClick={() => setShowAssignPopup(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-[12px] font-medium">
                Email
              </label>

              <input
                type="text"
                value={assignName}
                onChange={(e) => setAssignName(e.target.value)}
                placeholder="Type assignee name"
                className="h-10 w-full rounded-md border border-[#D0D5DD] px-3 outline-none focus:border-[#1565F9]"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-[12px] font-medium">
                Status
              </label>

              <select
                value={assignStatus}
                onChange={(e) => setAssignStatus(e.target.value)}
                className="h-10 w-full rounded-md border px-3"
              >
                <option>Open</option>
                <option>Re-opened</option>
                <option>In Progress</option>
              </select>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowAssignPopup(false)}
                className="rounded-md border px-4 py-2"
              >
                Cancel
              </button>

              <button
                disabled={!assignName.trim() || isSaving}
                onClick={async () => {
                  setIsSaving(true);
                  const toastId = toast.loading("Saving...");
                  try {
                    await assignIssue(selectedIssueId, {
                      assigned_to: assignName,
                      status: assignStatus,
                    });
                    toast.success("Action completed successfully", {
                      id: toastId,
                    });
                    setShowAssignPopup(false);
                    setAssignName("");
                    setAssignStatus("In Progress");
                  } catch (error) {
                    toast.error(
                      error?.response?.data?.message || "Something went wrong",
                      {
                        id: toastId,
                      },
                    );
                    setIsSaving(false);
                  }
                }}
                className="cursor-pointer rounded-md bg-[#1565F9] px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
