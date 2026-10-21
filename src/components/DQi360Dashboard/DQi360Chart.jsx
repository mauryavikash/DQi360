"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Card({ children }) {
  return (
    <div className="rounded-xl border border-[#E5EAF1] bg-white p-4 shadow-sm">
      {children}
    </div>
  );
}

export default function DQi360Chart({ chartData }) {
  const trendData = chartData?.trendData || [];
  const severityData = chartData?.severityData || [];
  const domainScores = chartData?.domainScores || [];
  const openIssueTotal = severityData.reduce(
    (total, item) => total + Number(item?.value ?? 0),
    0,
  );

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1fr_1fr]">
      {/* ==================== DATA QUALITY INDEX TREND ==================== */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[11px] font-bold text-[#22345B]">
            Data Quality Index Trend
          </h2>

          {/* <button className="text-[9px] font-semibold text-[#1664E8]">
            View details →
          </button> */}
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            {/* <LineChart
              data={trendData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                tick={{ fontSize: 8, fill: "#64748B" }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tick={{ fontSize: 8, fill: "#64748B" }}
                tickLine={false}
                axisLine={false}
                width={28}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#1664E8"
                strokeWidth={2}
                dot={{
                  r: 3,
                  fill: "#1664E8",
                }}
              />
              <ReferenceLine y={60} stroke="#22C55E" strokeDasharray="4 4" />
              <ReferenceLine y={85} stroke="#94A3B8" strokeDasharray="4 4" />
            </LineChart> */}

            <LineChart
              data={trendData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid stroke="#E2E8F0" vertical={false} />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#64748B" }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tick={{ fontSize: 11, fill: "#64748B" }}
                tickLine={false}
                axisLine={false}
                width={35}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  fontSize: "12px",
                }}
              />

              <ReferenceLine
                y={60}
                stroke="#22C55E"
                strokeDasharray="5 5"
                strokeWidth={2}
              />

              <ReferenceLine
                y={85}
                stroke="#64748B"
                strokeDasharray="5 5"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#1664E8"
                strokeWidth={3}
                activeDot={{
                  r: 7,
                  fill: "#1664E8",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                dot={{
                  r: 4,
                  fill: "#1664E8",
                  stroke: "#1664E8",
                  strokeWidth: 1,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex justify-center gap-8 text-[12px] text-[#64748B]">
          <div className="flex items-center gap-1">
            <div className="h-[2px] w-6 bg-[#1664E8]" />
            <span>DQ Index</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="h-[2px] w-6 bg-[#22C55E]" />
            <span>Baseline (60)</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="h-[2px] w-6 bg-[#64748B]" />
            <span>Target (85)</span>
          </div>
        </div>
      </Card>

      {/* ==================== OPEN ISSUES ==================== */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-[#22345B]">
            Open Issues by Severity
          </h2>

          {/* <button className="text-[9px] font-semibold text-[#1664E8]">
            View all issues →
          </button> */}
        </div>

        <div className="flex items-center justify-between">
          <div className="relative h-[320px] w-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  formatter={(value) => [value.toLocaleString(), "Issues"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12px",
                  }}
                />
                <Pie
                  data={severityData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={112}
                  paddingAngle={0}
                  stroke="none"
                >
                  {severityData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[16px] font-bold leading-none text-[#22345B]">
                {openIssueTotal.toLocaleString()}
              </div>

              <div className="mt-2 text-[12px] text-[#64748B]">Open Issues</div>
            </div>
          </div>

          <div className="space-y-4">
            {severityData.map((item) => (
              <div key={item.name} className="flex items-start gap-2">
                <div
                  className="mt-[2px] h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <div>
                  <div className="text-[16px] text-[#475569]">{item.name}</div>

                  <div className="text-[14px] font-bold text-[#22345B]">
                    {item.value.toLocaleString()} ({item.percent})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ==================== DOMAIN SCORE ==================== */}
      <Card>
        <div className="mb-5">
          <h2 className="text-[11px] font-bold text-[#22345B]">
            Domain Score Breakdown
          </h2>
        </div>

        <div className="space-y-4">
          {domainScores.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[12px] text-[#64748B]">{item.label}</span>

                <span className="text-[12px] font-bold text-[#64748B]">
                  {item.score}
                </span>
              </div>

              <div className="h-[10px] overflow-hidden rounded-sm bg-[#E9EDF3]">
                <div
                  className="h-full rounded-sm"
                  style={{
                    width: `${item.score}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
