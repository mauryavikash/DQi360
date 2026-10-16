"use client";

import {
  ClipboardList,
  RefreshCw,
  Clock3,
  CheckCircle,
} from "lucide-react";

export default function AuditKpis({ summary = [] }) {
  const getIcon = (type) => {
    switch (type) {
      case "todo":
        return (
          <ClipboardList
            size={34}
            strokeWidth={1.8}
            className="text-[#1565FF]"
          />
        );

      case "progress":
        return (
          <RefreshCw
            size={34}
            strokeWidth={1.8}
            className="text-[#1565FF]"
          />
        );

      case "approval":
        return (
          <Clock3
            size={34}
            strokeWidth={1.8}
            className="text-[#617194]"
          />
        );

      case "approved":
        return (
          <CheckCircle
            size={34}
            strokeWidth={1.8}
            className="text-[#169C37]"
          />
        );

      default:
        return null;
    }
  };

  const getIconBg = (type) => {
    if (type === "approved") {
      return "bg-[#E4F3E8]";
    }

    return "bg-[#EDF1F7]";
  };

  return (
    <section className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
      {summary.map((item) => (
        <div
          key={item.title}
          className="
            relative
            flex
            h-[72px]
            items-center
            justify-between
            rounded-[9px]
            border-[2px]
            border-[#2F63D8]
            bg-white
            px-3
            shadow-sm
            overflow-hidden
          "
        >
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#1CC8D1]" />

          <div className="w-full">
            <div
              className={`
                absolute
                right-3
                top-2
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-md
                ${getIconBg(item.type)}
              `}
            >
              {getIcon(item.type)}
            </div>

            <div className="flex flex-col justify-center">
              <h3
                className="
                  text-[9px]
                  font-semibold
                  leading-3
                  text-[#1D2A57]
                "
              >
                {item.title}
              </h3>

              <div
                className="
                  mt-1
                  text-[20px]
                  font-bold
                  leading-none
                  text-[#1D2A57]
                "
              >
                {item.value}
              </div>

            </div>
          </div>
        </div>
      ))}
    </section>
  );
}