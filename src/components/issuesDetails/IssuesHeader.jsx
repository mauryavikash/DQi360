"use client";

import { ChevronsLeft, ChevronLeft, ChevronRight } from "lucide-react";

export default function IssuesHeader({ issueHeaderData }) {
  const { breadcrumb = [], title, subtitle, onBack } = issueHeaderData || {};

  return (
    <section
      className="rounded-md px-4 py-3"
      style={{
        background:
          "linear-gradient(90deg,#E5F3F5 0%,#E8F3F7 45%,#DDE7FA 100%)",
      }}
    >
      {/* Breadcrumb */}
      <div className="mb-2 flex items-center gap-2 text-[12px]">
        {breadcrumb.map((item, index) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className={
                item.active ? "font-semibold text-[#1E5BDB]" : "text-[#7C8AA5]"
              }
            >
              {item.label}
            </span>

            {index !== breadcrumb.length - 1 && (
              <span className="text-[#A0AEC0]">›</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        {/* Left Content */}
        <div>
          <h1 className="text-[20px] font-bold leading-none text-[#1F2F56]">
            {title}
          </h1>

          <p className="mt-2 text-[12px] text-[#73809A]">{subtitle}</p>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex h-[28px] items-center gap-1 rounded-md bg-[#2563EB] px-4 text-[12px] font-semibold text-white"
          >
            <ChevronsLeft size={12} />
            Back to Issues
          </button>

          <button
            type="button"
            className="flex h-[28px] items-center gap-1 rounded-md border border-[#7EA6FF] bg-white px-4 text-[12px] font-semibold text-[#2563EB]"
          >
            <ChevronLeft size={12} />
            Previous
          </button>

          <button
            type="button"
            className="flex h-[28px] items-center gap-1 rounded-md border border-[#7EA6FF] bg-white px-4 text-[12px] font-semibold text-[#2563EB]"
          >
            Next
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
}
