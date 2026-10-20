"use client";

import React, { useState } from "react";
import { Box, X } from "lucide-react";
import Navbar, { SidebarCapabilities } from "./navbar";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [isHovered, setIsHovered] = useState(false);

  const showExpandedContent = isOpen || isHovered;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#070D22]/30 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          group fixed inset-y-0 left-0 z-50 flex h-full flex-col overflow-hidden
          bg-[linear-gradient(180deg,#111A38_0%,#0F89D1_55%,#01D4D1_100%)]
          text-dgem-white
          border-r border-white/10
          shadow-[0_10px_40px_rgba(18,26,56,0.18)]
          transition-all duration-300 ease-in-out

          ${
            showExpandedContent
  ? "translate-x-0 w-[220px] lg:w-[220px]"
  : "-translate-x-full w-[220px] lg:translate-x-0 lg:w-14"

          }

          lg:absolute
        `}
      >
        <div className="relative flex shrink-0 items-center justify-between px-3 py-4">
          <div
            className={`
              w-full flex items-center gap-3 whitespace-nowrap transition-all duration-200
              ${showExpandedContent ? "opacity-100" : "hidden"}
            `}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-white/25 bg-[#19507E]">
                <Box size={14} className="text-white" />
              </div>

              <div>
                <h2 className="text-[12px] font-bold text-white">
                  Master DQ i360
                </h2>

                <p className="text-[10px] text-white/70">
                  Customer Master Data | C2C
                </p>
              </div>
            </div>
          </div>

          {!showExpandedContent && (
            <div className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md border border-white/25 bg-[#19507E]">
              <Box size={14} className="text-white" />
            </div>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 transition-colors hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden px-2 py-2 scrollbar-thin">
          <Navbar isCollapsed={!showExpandedContent} />

          <SidebarCapabilities
            isCollapsed={!showExpandedContent}
          />
        </div>
      </aside>
    </>
  );
}