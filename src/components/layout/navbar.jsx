"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bot,
  Boxes,
  ChevronDown,
  ChevronUp,
  FileText,
  Home,
  Layers3,
  MessageCircle,
  Network,
  UsersRound,
} from "lucide-react";

const customerLinks = [
  { name: "Dashboard", href: "/DQi360Dashboard", icon: Home },
  { name: "Issues", href: "/issues", icon: FileText },
  { name: "My Task", href: "/myTask", icon: Layers3 },
  { name: "Audit", href: "/audit", icon: Network },
];

function Group({ title, subtitle, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-white/10"
      >
        <Icon size={16} className="shrink-0 text-white" />
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] font-semibold text-white">
            {title}
          </span>
          {subtitle && (
            <span className="block text-[10px] text-white/55">{subtitle}</span>
          )}
        </span>
        {open ? (
          <ChevronUp size={14} className="text-white/80" />
        ) : (
          <ChevronDown size={14} className="text-white/80" />
        )}
      </button>
      {open && children}
    </div>
  );
}

export default function Navbar({ isCollapsed = false }) {
  const pathname = usePathname();
  if (isCollapsed)
    return (
      <nav className="flex w-full flex-col items-center gap-3 pt-6">
        {customerLinks.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            title={name}
            className={`flex h-9 w-9 items-center justify-center rounded-md ${pathname === href ? "bg-[#1B3155] text-white" : "text-white/85 hover:bg-white/10"}`}
          >
            <Icon size={16} />
          </Link>
        ))}
      </nav>
    );
  return (
    <nav className="flex w-full flex-col gap-1">
      <p className="px-3 pb-1 pt-1 text-[12px] font-semibold text-white">
        Master Data - Category
      </p>
      <Group
        title="Customer Master Data"
        subtitle="Active"
        icon={UsersRound}
        defaultOpen
      >
        <div className="ml-3 mt-1 space-y-1 border-l border-white/15 pl-3">
          {customerLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-[12px] font-semibold ${pathname === href ? "bg-[#1B3155] text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
            >
              <Icon size={14} />
              {name}
            </Link>
          ))}
        </div>
      </Group>
      <Group
        title="Vendor Master Data"
        subtitle="Coming soon"
        icon={FileText}
      />
      <Group title="GL Master Data" subtitle="Coming soon" icon={Boxes} />
    </nav>
  );
}

export function SidebarCapabilities({ isCollapsed = false }) {
  if (isCollapsed)
    return (
      <div className="mt-auto flex flex-col items-center gap-4 border-t border-white/10 py-4 text-white">
        <MessageCircle size={16} />
        <Bot size={16} />
      </div>
    );
  return (
    <div className="mt-auto border-t border-white/10 px-3 py-4">
      <p className="text-[12px] font-semibold text-white">
        Future Capabilities
      </p>
      <p className="mb-3 text-[10px] text-white/55">Coming soon</p>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-white">
          <MessageCircle size={16} />
          <div>
            <p className="text-[12px] font-semibold">Conversational BI</p>
            <p className="text-[10px] text-white/55">Coming soon</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white">
          <Bot size={16} />
          <div>
            <p className="text-[12px] font-semibold">AI Command Center</p>
            <p className="text-[10px] text-white/55">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
