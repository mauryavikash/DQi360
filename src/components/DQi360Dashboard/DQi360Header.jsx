"use client";

import { useEffect, useState } from "react";

export default function DQi360Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(
        sessionStorage.getItem("user") || "null"
      );

      setUser(storedUser);
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  }, []);

  const userName = user?.name;

   // const { userName, title, subtitle, filters } = headerData || {};
  // const filterFields = [
  //   ["Time Period", filters?.period],
  //   ["Source System", filters?.source],
  //   ["Region/Country", filters?.region],
  //   ["Business Unit", filters?.businessUnit],
  // ].filter(([, value]) => value);

  // const {
  //   filters = {},
  // } = headerData || {};

  return (
    <section className="w-full">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          {userName && (
            <p className="text-[11px] font-semibold text-[#66748b]">
              Welcome back, {userName}
            </p>
          )}

          <h1 className="mt-1 text-[20px] font-bold leading-tight text-[#22345b]">
           Customer Master Data Quality Dashboard
          </h1>
          <p className="mt-1 text-[10px] text-[#6c7a90]">
            Enterprise view of customer master data quality across all
            sources.
          </p>
        </div>
        {/* Right Side */}
        {/* {filterFields.length > 0 && (
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
        )} */}
      </div>
    </section>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// export default function DQi360Header({
//   filters = {},
//   selectedPeriod,
//   setSelectedPeriod,
//   selectedSource,
//   setSelectedSource,
//   selectedCountry,
//   setSelectedCountry,
//   selectedBusinessUnit,
//   setSelectedBusinessUnit,
// }) {
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     try {
//       const user = JSON.parse(
//         sessionStorage.getItem("user") || "null"
//       );

//       setUserName(user?.name || "");
//     } catch {
//       setUserName("");
//     }
//   }, []);

//   return (
//     <section className="w-full">
//       <div className="flex items-start justify-between gap-6">
//         <div className="flex-1">
//           <p className="text-[13px] font-semibold text-[#6B7A90]">
//             Welcome back, {userName}
//           </p>

//           <h1 className="text-[20px] font-bold text-[#22345B]">
//             Customer Master Data Quality Dashboard
//           </h1>

//           <p className="text-[12px] text-[#6B7A90]">
//             Enterprise view of customer master data
//             quality across all sources
//           </p>
//         </div>

//         <div className="flex gap-2">
//           <div>
//             <label className="mb-1 block text-[10px] font-semibold">
//               Time Period
//             </label>

//             <select
//               value={selectedPeriod}
//               onChange={(e) =>
//                 setSelectedPeriod(e.target.value)
//               }
//               className="h-10 w-[140px] rounded border border-blue-500 px-2"
//             >
//               <option value="">
//                 Last 6 Months
//               </option>

//               {(filters?.periods || []).map(
//                 (item) => (
//                   <option
//                     key={item}
//                     value={item}
//                   >
//                     {item}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>

//           <div>
//             <label className="mb-1 block text-[10px] font-semibold">
//               Source System
//             </label>

//             <select
//               value={selectedSource}
//               onChange={(e) =>
//                 setSelectedSource(e.target.value)
//               }
//               className="h-10 w-[140px] rounded border border-blue-500 px-2"
//             >
//               <option value="">
//                 All Sources
//               </option>

//               {(filters?.source_systems || []).map(
//                 (item) => (
//                   <option
//                     key={item}
//                     value={item}
//                   >
//                     {item}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>

//           <div>
//             <label className="mb-1 block text-[10px] font-semibold">
//               Region/Country
//             </label>

//             <select
//               value={selectedCountry}
//               onChange={(e) =>
//                 setSelectedCountry(e.target.value)
//               }
//               className="h-10 w-[140px] rounded border border-blue-500 px-2"
//             >
//               <option value="">
//                 All Regions
//               </option>

//               {(filters?.countries || []).map(
//                 (item) => (
//                   <option
//                     key={item.country_code}
//                     value={item.country_code}
//                   >
//                     {item.country_name}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>

//           <div>
//             <label className="mb-1 block text-[10px] font-semibold">
//               Business Unit
//             </label>

//             <select
//               value={selectedBusinessUnit}
//               onChange={(e) =>
//                 setSelectedBusinessUnit(
//                   e.target.value
//                 )
//               }
//               className="h-10 w-[140px] rounded border border-blue-500 px-2"
//             >
//               <option value="">
//                 All Business Units
//               </option>

//               {(filters?.business_units || []).map(
//                 (item) => (
//                   <option
//                     key={item}
//                     value={item}
//                   >
//                     {item}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }