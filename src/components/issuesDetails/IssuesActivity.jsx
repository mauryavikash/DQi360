"use client";

import {
  MessageSquare,
  Pencil,
  Play,
  Eye,
  UserPlus,
  Cog,
} from "lucide-react";

export default function IssuesActivity({
  comments = [],
  audit = [],
}) {
  const items = [
    ...comments.map((item) => ({
      type: "comment",
      title: "Comment Added",
      description: item.comment_text,
      user: item.user_name,
      timestamp: item.created_at,
    })),

    ...audit.map((item) => ({
      type: item.attribute_event,
      title: item.event_type,
      description:
        item.new_value ||
        item.previous_value ||
        "-",
      user: item.performed_by,
      timestamp: item.event_time,
    })),
  ].sort(
    (a, b) =>
      new Date(b.timestamp) - new Date(a.timestamp)
  );

  const getIcon = (type) => {
    switch (type) {
      case "comment":
        return {
          Icon: MessageSquare,
          bg: "bg-blue-600",
        };

      case "proposed_value":
        return {
          Icon: Pencil,
          bg: "bg-blue-600",
        };

      case "remediation_status":
        return {
          Icon: Play,
          bg: "bg-green-600",
        };

      case "viewed":
        return {
          Icon: Eye,
          bg: "bg-blue-600",
        };

      case "assigned_to":
        return {
          Icon: UserPlus,
          bg: "bg-[#164C96]",
        };

      default:
        return {
          Icon: Cog,
          bg: "bg-[#164C96]",
        };
    }
  };

  return (
    <section className="rounded-[14px] bg-white p-5 shadow-sm h-[650px] flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-[12px] font-bold text-[#22345B]">
          Activity & Audit History
        </h3>

        <button
          type="button"
          className="text-[12px] font-semibold text-[#1565F9]"
        >
          All activity (newest first) →
        </button>
      </div>

      {items.length ? (
        <div
  className="
    mt-5
    flex-1
    overflow-y-auto
    space-y-5
    pr-2
    scrollbar-thin
    scrollbar-thumb-slate-300
    scrollbar-track-transparent
  "
>

          {items.map((item, index) => {
            const { Icon, bg } = getIcon(item.type);

            return (
              <div
                key={index}
                className="flex gap-3"
              >
                {/* Icon */}

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white ${bg}`}
                >
                  <Icon size={16} />
                </div>

                {/* Content */}

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[12px] font-semibold text-[#22345B]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-[12px] text-slate-500 break-words">
                        {item.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[12px] text-slate-500">
                        {item.timestamp
                          ? new Date(
                              item.timestamp
                            ).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </p>

                      <p className="mt-1 text-[12px] text-slate-400">
                        {item.user || "System"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-[12px] text-slate-400">
          No activity history was returned for this issue.
        </p>
      )}
    </section>
  );
}
