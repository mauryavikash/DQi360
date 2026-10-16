"use client";

export default function DQi360Header({ headerData }) {
  const { userName, title, subtitle, filters } = headerData || {};
  const filterFields = [
    ["Time Period", filters?.period],
    ["Source System", filters?.source],
    ["Region/Country", filters?.region],
    ["Business Unit", filters?.businessUnit],
  ].filter(([, value]) => value);

  if (!userName && !title && !subtitle && filterFields.length === 0) {
    return null;
  }

  return (
    <section
      className="w-full "

    >
      <div className="flex items-start justify-between gap-6">
        {/* Left Side */}
        <div className="flex-1">
          {userName && (
            <p className="text-[11px] font-semibold text-[#66748b]">
              Welcome back, {userName}
            </p>
          )}

          {title && (
            <h1 className="mt-1 text-[20px] font-bold leading-tight text-[#22345b]">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-1 text-[10px] text-[#6c7a90]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Side */}
        {filterFields.length > 0 && (
          <div className="flex items-start gap-2">
            {filterFields.map(([label, value]) => (
              <div key={label} className="w-[128px]">
                <label className="mb-1 block text-[9px] font-semibold text-[#4f5d73]">
                  {label}
                </label>

                <select className="h-9 w-full rounded-md border border-[#2563eb] bg-white px-3 text-[12px] font-medium text-[#2563eb] outline-none">
                  <option>{value}</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}