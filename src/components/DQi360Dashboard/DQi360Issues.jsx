"use client";

import Image from "next/image";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

function Card({ children }) {
  return (
    <section className="rounded-[16px] border border-[#E5EAF1] bg-white p-4 shadow-sm">
      {children}
    </section>
  );
}

function getScoreColor(score) {
  if (score >= 90) return "#22A447";
  if (score >= 75) return "#F4B400";
  return "#E53935";
}

export default function DQi360Issues({ issuesData }) {
  const sourceSystemData = issuesData?.sourceSystemData || [];
  const topCategories = issuesData?.topCategories || [];
  const regionData = issuesData?.regionData || [];

  const maxValue = Math.max(
    ...topCategories.map((item) => item.value),
    1
  );

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      {/* ================= SOURCE SYSTEM ================= */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[11px] font-bold text-[#22345B]">
            📊 Issues by Source System
          </h2>

          <button className="text-[9px] font-semibold text-[#1664E8]">
            View by source →
          </button>
        </div>

        <div className="h-[190px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sourceSystemData}
              margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 8, fill: "#64748B" }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{ fontSize: 8, fill: "#64748B" }}
                tickLine={false}
                axisLine={false}
                width={28}
              />

              <Bar
                dataKey="value"
                fill="#378BDA"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ================= TOP ISSUE CATEGORIES ================= */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[11px] font-bold text-[#22345B]">
            📋 Top Issue Categories
          </h2>

          <button className="text-[9px] font-semibold text-[#1664E8]">
            View all categories →
          </button>
        </div>

        <div className="space-y-3">
          {topCategories.map((item) => (
            <div key={item.name}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] text-[#64748B]">
                  {item.name}
                </span>

                <span className="text-[10px] font-bold text-[#64748B]">
                  {item.value.toLocaleString()}
                </span>
              </div>

              <div className="h-[10px] overflow-hidden rounded-sm bg-[#E9EDF3]">
                <div
                  className="h-full bg-[#378BDA]"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ================= COUNTRY SCORE ================= */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[11px] font-bold text-[#22345B]">
            DQ Index by Country
          </h2>

          <button className="text-[9px] font-semibold text-[#1664E8]">
            View by region →
          </button>
        </div>

        <div className="relative h-[220px] overflow-hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            unoptimized
            className="pointer-events-none absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] object-contain opacity-30 grayscale"
          />
          {regionData.map((region) => (
            <div
              key={region.countryCode}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: region.x, top: region.y }}
            >
              <div
                className="h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: getScoreColor(region.score) }}
              />
              <div className="mt-0.5 whitespace-nowrap text-center leading-tight">
                <div className="text-[8px] font-medium text-[#64748B]">
                  {region.country}
                </div>
                <div className="text-[10px] font-bold text-[#22345B]">
                  {region.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}