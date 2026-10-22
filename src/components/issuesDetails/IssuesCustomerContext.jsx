"use client";

import { useState } from "react";
import { Building2, X } from "lucide-react";

export default function IssuesCustomerContext({ issueData }) {
  const [showDocuments, setShowDocuments] = useState(false);

  if (!issueData) return null;

  const existingDocuments =
    issueData?.existing_documents ||
    issueData?.documents ||
    [];

  const recentDocuments =
    issueData?.recent_documents || [];

  // const allDocuments = [
  //   ...existingDocuments,
  //   ...recentDocuments,
  // ];

  return (
    <>
      <section className="rounded-[10px] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-[12px] font-bold text-[#22345B]">
            <Building2 size={13} className="text-blue-600" />
            Customer Context
          </h3>

          <button
            type="button"
            className="text-[12px] font-semibold text-[#2563EB]"
          >
            View in source (read-only) →
          </button>
        </div>

        <dl className="mt-4 space-y-2 break-words text-[12px]">
          {[
            ["Customer ID", issueData?.customer_id],
            ["Customer Name", issueData?.customer_name],

            [
              "Country / Region",
              issueData?.COUNTRY_NAME
                ? `${issueData.COUNTRY_NAME}${
                    issueData?.country_code
                      ? ` (${issueData.country_code})`
                      : ""
                  }`
                : "",
            ],

            ["Customer Type", issueData?.CUSTOMER_TYPE],

            ["Customer Segment", issueData?.CUSTOMER_SEGMENT],

            ["Sales Organisation", issueData?.SALES_ORGANISATION],

            ["Credit Control Area", issueData?.CREDIT_CONTROL_AREA],

            ["Email", issueData?.EMAIL_ADDRESS],

            ["Phone", issueData?.PHONE_NUMBER],

            [
              "Address",
              [
                issueData?.STREET,
                issueData?.CITY,
                issueData?.POSTAL_CODE,
              ]
                .filter(Boolean)
                .join(", "),
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[110px_1fr] gap-2"
            >
              <dt className="text-slate-400">{label}</dt>

              <dd className="min-w-0 break-all font-medium text-slate-700">
                {value || "-"}
              </dd>
            </div>
          ))}

          {/* Existing Documents */}

          <div className="grid grid-cols-[110px_1fr] gap-2 pt-2">
            <dt className="text-slate-400">
              Existing Documents
            </dt>

            <dd>
              <div className="flex flex-wrap items-center gap-2">
                {existingDocuments.length > 0 ? (
                  existingDocuments
                    .slice(0, 2)
                    .map((doc, index) => (
                      <span
                        key={index}
                        className="rounded bg-blue-100 px-2 py-1 text-[12px] font-semibold text-blue-700"
                      >
                        {doc?.document_name ||
                          doc?.name ||
                          "-"}
                      </span>
                    ))
                ) : (
                  <span className="rounded bg-blue-100 px-2 py-1 text-[12px] font-semibold text-blue-700">
                    -
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setShowDocuments(true)}
                  className="rounded bg-[#1565F9] px-3 py-1 text-[12px] font-semibold text-white"
                >
                  View All Documents
                </button>
              </div>
            </dd>
          </div>

          {/* Recent Documents */}

          {/* <div className="grid grid-cols-[110px_1fr] gap-2">
            <dt className="text-slate-400">
              Recent Documents
            </dt>

            <dd>
              <div className="flex flex-wrap items-center gap-2">
                {recentDocuments.length > 0 ? (
                  recentDocuments
                    .slice(0, 1)
                    .map((doc, index) => (
                      <span
                        key={index}
                        className="rounded bg-blue-100 px-2 py-1 text-[8px] font-semibold text-blue-700"
                      >
                        {doc?.document_name ||
                          doc?.name ||
                          "-"}
                      </span>
                    ))
                ) : (
                  <span className="rounded bg-blue-100 px-2 py-1 text-[8px] font-semibold text-blue-700">
                    -
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setShowDocuments(true)}
                  className="rounded bg-[#1565F9] px-3 py-1 text-[8px] font-semibold text-white"
                >
                  View Documents
                </button>
              </div>
            </dd>
          </div> */}
        </dl>
      </section>

      {/* Documents Popup */}

     {/* Customer Context Popup */}
{showDocuments && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
    <div className="w-[700px] rounded-xl bg-white p-5 shadow-xl">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-[14px] font-bold text-[#22345B]">
          Customer Context Details
        </h2>

        <button
          type="button"
          onClick={() => setShowDocuments(false)}
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-4 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-[180px_1fr] gap-y-3 gap-x-4 text-[13px]">
          <div className="text-slate-500">Customer ID</div>
          <div className="font-medium text-slate-700">
            {issueData?.customer_id || "-"}
          </div>

          <div className="text-slate-500">Customer Name</div>
          <div className="font-medium text-slate-700">
            {issueData?.customer_name || "-"}
          </div>

          <div className="text-slate-500">Country / Region</div>
          <div className="font-medium text-slate-700">
            {issueData?.COUNTRY_NAME
              ? `${issueData.COUNTRY_NAME}${
                  issueData?.country_code
                    ? ` (${issueData.country_code})`
                    : ""
                }`
              : "-"}
          </div>

          <div className="text-slate-500">Customer Type</div>
          <div className="font-medium text-slate-700">
            {issueData?.CUSTOMER_TYPE || "-"}
          </div>

          <div className="text-slate-500">Customer Segment</div>
          <div className="font-medium text-slate-700">
            {issueData?.CUSTOMER_SEGMENT || "-"}
          </div>

          <div className="text-slate-500">Sales Organisation</div>
          <div className="font-medium text-slate-700">
            {issueData?.SALES_ORGANISATION || "-"}
          </div>

          <div className="text-slate-500">Credit Control Area</div>
          <div className="font-medium text-slate-700">
            {issueData?.CREDIT_CONTROL_AREA || "-"}
          </div>

          <div className="text-slate-500">Email</div>
          <div className="font-medium break-all text-slate-700">
            {issueData?.EMAIL_ADDRESS || "-"}
          </div>

          <div className="text-slate-500">Phone</div>
          <div className="font-medium text-slate-700">
            {issueData?.PHONE_NUMBER || "-"}
          </div>

          <div className="text-slate-500">Address</div>
          <div className="font-medium text-slate-700">
            {[
              issueData?.STREET,
              issueData?.CITY,
              issueData?.POSTAL_CODE,
            ]
              .filter(Boolean)
              .join(", ") || "-"}
          </div>
        </div>

        
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => setShowDocuments(false)}
          className="rounded-md border border-[#D0D5DD] px-4 py-2 text-[12px] font-medium"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}