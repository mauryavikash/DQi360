// "use client";

// import { Lightbulb } from "lucide-react";

// export default function DQi360Footer({ criticalIssueCount, message }) {
//   return (
//     <div className="w-full">
//       <div
//         className="flex items-center justify-between rounded-md border px-6 py-3"
//         style={{
//           background:
//             "linear-gradient(90deg, #e4f6f7 0%, #edf2ff 65%, #e8ddff 100%)",
//           borderColor: "#d8e5f1",
//         }}
//       >
//         {/* Left Section */}
//         <div className="flex items-center gap-4">
//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
//             <Lightbulb
//               size={20}
//               strokeWidth={1.8}
//               className="text-[#2563EB]"
//             />
//           </div>

//           <div>
//             <h3 className="text-[11px] font-bold leading-none text-[#2563EB]">
//               Focus for Today
//             </h3>

//             {message && (
//               <p className="mt-1 text-[10px] leading-5 text-[#334155]">
//                 {message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           <button
//             type="button"
//             className="rounded-md bg-[#2563EB] px-5 py-2 text-[10px] font-semibold text-white transition hover:bg-[#1D4ED8]"
//           >
//             View Critical Issues
//           </button>

//           <button
//             type="button"
//             className="rounded-md border border-[#93C5FD] bg-white px-5 py-2 text-[10px] font-semibold text-[#2563EB] transition hover:bg-blue-50"
//           >
//             View My Tasks
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DQi360Footer({ criticalIssueCount, message }) {
  const router = useRouter();

  const handleIssuesClick = () => {
    router.push("/issues");
  };

  const handleMyTaskClick = () => {
    router.push("/myTask");
  };

  return (
    <div className="w-full">
      <div
        className="flex items-center justify-between rounded-md border px-6 py-3"
        style={{
          background:
            "linear-gradient(90deg, #e4f6f7 0%, #edf2ff 65%, #e8ddff 100%)",
          borderColor: "#d8e5f1",
        }}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <Lightbulb
              size={20}
              strokeWidth={1.8}
              className="text-[#2563EB]"
            />
          </div>

          <div>
            <h3 className="text-[11px] font-bold leading-none text-[#2563EB]">
              Focus for Today
            </h3>

            {message && (
              <p className="mt-1 text-[10px] leading-5 text-[#334155]">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleIssuesClick}
            className="rounded-md bg-[#2563EB] px-5 py-2 text-[10px] font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            View Critical Issues
            {criticalIssueCount > 0 && ` (${criticalIssueCount})`}
          </button>

          <button
            type="button"
            onClick={handleMyTaskClick}
            className="rounded-md border border-[#93C5FD] bg-white px-5 py-2 text-[10px] font-semibold text-[#2563EB] transition hover:bg-blue-50"
          >
            View My Tasks
          </button>
        </div>
      </div>
    </div>
  );
}