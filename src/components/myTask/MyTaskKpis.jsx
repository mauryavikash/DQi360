"use client";

import {
  ClipboardList,
  RefreshCw,
  Clock3,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

export default function MyTaskKpis({ summary = [] }) {
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
    <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summary.map((item) => (
        <div
          key={item.title}
          className="
            relative
            flex
            h-[88px]
            items-center
            justify-between
            rounded-[10px]
            border-[2px]
            border-[#2F63D8]
            bg-white
            px-4
            shadow-sm
            overflow-hidden
          "
        >
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#1CC8D1]" />

          <div className="flex items-center gap-4">
            <div
              className={`
                flex
                h-[60px]
                w-[60px]
                items-center
                justify-center
                rounded-[12px]
                ${getIconBg(item.type)}
              `}
            >
              {getIcon(item.type)}
            </div>

            <div className="flex flex-col justify-center">
              <h3
                className="
                  text-[16px]
                  font-semibold
                  leading-5
                  text-[#1D2A57]
                "
              >
                {item.title}
              </h3>

              <div
                className="
                  mt-1
                  text-[32px]
                  font-bold
                  leading-none
                  text-[#1D2A57]
                "
              >
                {item.value}
              </div>

              <p
                className="
                  mt-2
                  text-[12px]
                  font-medium
                  leading-4
                  text-[#667695]
                "
              >
                {item.subtitle}
              </p>
            </div>
          </div>

          <ChevronRight
            size={20}
            strokeWidth={2.4}
            className="text-[#1565FF] flex-shrink-0"
          />
        </div>
      ))}
    </section>
  );
}