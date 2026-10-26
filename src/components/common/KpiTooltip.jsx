// export default function KpiTooltip({ invoiceCount, invoiceValue, children }) {
//   return (
//     <div className="group relative">
//       {children}

//       <div
//         role="tooltip"
//         className="
//           pointer-events-none
//           absolute
//           left-1/2
//           bottom-full
//           z-50
//           mb-2
//           w-max
//           max-w-[220px]
//           -translate-x-1/2
//           rounded-lg
//           bg-[#0F172A]
//           px-3
//           py-2
//           text-[11px]
//           text-white
//           opacity-0
//           shadow-lg
//           transition-opacity
//           duration-150
//           group-hover:opacity-100
//         "
//       >
//         <p className="font-semibold whitespace-nowrap">
//           Invoice Count: <span className="font-normal">{invoiceCount}</span>
//         </p>
//         <p className="text-[#CBD5E1] whitespace-nowrap">
//           Invoice Value: <span className="font-normal text-white">{invoiceValue}</span>
//         </p>
//         <span
//           className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#0F172A]"
//         />
//       </div>
//     </div>
//   );
// }

export default function KpiTooltip({ children, tooltipData }) {
  return (
    <div className="group relative">
      {children}

      <div
        role="tooltip"
        className="
          pointer-events-none
          absolute
          left-1/2
          bottom-full
          z-50
          mb-2
          -translate-x-1/2
          rounded-lg
          bg-[#0F172A]
          px-3
          py-2
          text-[11px]
          text-white
          opacity-0
          shadow-lg
          transition-opacity
          duration-150
          group-hover:opacity-100
        "
      >
        {/* {Object.entries(tooltipData || {}).map(([key, value]) => (
          <p key={key} className="whitespace-nowrap">
            <span className="font-semibold">{key}:</span> {value ?? "-"}
          </p>
        ))} */}
        {tooltipData &&
  Object.entries(tooltipData).map(([key, value]) => (
    <p key={key} className="whitespace-nowrap">
      <span className="font-semibold">{key}:</span>{" "}
      {value ?? "-"}
    </p>
  ))}

        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#0F172A]" />
      </div>
    </div>
  );
}
