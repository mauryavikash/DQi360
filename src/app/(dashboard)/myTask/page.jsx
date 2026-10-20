"use client";

import { useEffect, useMemo, useState } from "react";
import MyTaskKpis from "@/components/myTask/MyTaskKpis";
import MyTaskTable from "@/components/myTask/MyTaskTable";
import MyTaskDetail from "@/components/myTask/MyTaskDetail";
import { LoadingState } from "@/components/common/LoadingState";
import { getMyTasks, getMyTaskDetails } from "@/app/lib/api";
const KPI_PRESENTATION = [
  ["to_do", "To Do", "Tasks assigned to you", "todo"],
  ["in_progress", "In Progress", "Tasks in progress", "progress"],
  ["awaiting_approval", "Awaiting Approval", "Read-only view", "approval"],
  ["approved", "Approved", "Read-only view", "approved"],
];

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function normalizeTask(task) {
  return {
    issueId: task.issue_id,
    customer: task.customer_name,
    customerId: task.customer_id,
    attention: task.dq_rule,
    issueType: task.issue_category,
    sourceSystem: task.source_system,
    severity: task.severity,
    status: task.status,
    assignedDate: formatDate(task.assigned_date ?? task.detected_date),
    age: `${task.age_days ?? 0}d`,
    assignee: task.assignee,
  };
}

export default function MyTaskPage() {
  const [workbenchApiData, setWorkbenchApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleOpenTask = async (task, action = "") => {
    try {
      setLoading(true);

      const sessionUser = JSON.parse(sessionStorage.getItem("user") || "null");

      const userEmail = sessionUser?.email;

const response = await getMyTaskDetails(
  userEmail,
  task.issueId,
  action
);

      setSelectedTask(response);
      setShowDetails(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    let isMounted = true;
    let sessionUser;

    try {
      sessionUser = JSON.parse(sessionStorage.getItem("user") ?? "null");
    } catch {
      sessionUser = null;
    }

    const currentUserEmail = sessionUser?.email;

    async function loadWorkbenchData() {
      if (!currentUserEmail) {
        if (isMounted) {
          setError(new Error("No signed-in user was found"));
          setLoading(false);
        }
        return;
      }

      try {
        setError(null);

        const response = await getMyTasks(currentUserEmail);
        const payload = response?.data ?? response;
        const hasPayload = Boolean(
          payload &&
          typeof payload === "object" &&
          Object.keys(payload)?.length,
        );

        if (isMounted) {
          setWorkbenchApiData(hasPayload ? payload : null);
        }
      } catch (error) {
        console.error("Workbench API Error:", error);
        if (isMounted) {
          setError(error);
          setWorkbenchApiData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkbenchData();

    return () => {
      isMounted = false;
    };
  }, []);

  //   useEffect(() => {
  //   let isMounted = true;
  //   let sessionUser;

  //   try {
  //     sessionUser = JSON.parse(
  //       sessionStorage.getItem("user") ?? "null"
  //     );
  //   } catch {
  //     sessionUser = null;
  //   }

  //   const currentUserEmail = sessionUser?.email;

  //   const OWNER_EMAILS = [
  //     "unnati.gaur@capgemini.com",
  //     "d-vigneshwaran.d-vigneshwaran@capgemini.com",
  //     "vikash-chand.maury@capgemini.com",
  //   ];

  //   const isOwner = OWNER_EMAILS.includes(
  //     currentUserEmail?.toLowerCase()
  //   );

  //   async function loadWorkbenchData() {
  //     try {
  //       setError(null);

  //       const response = isOwner
  //         ? await getMyTasks("ALL")
  //         : await getMyTasks(currentUserEmail);

  //       const payload = response?.data ?? response;

  //       if (isMounted) {
  //         setWorkbenchApiData(payload);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       if (isMounted) {
  //         setError(error);
  //       }
  //     } finally {
  //       if (isMounted) {
  //         setLoading(false);
  //       }
  //     }
  //   }

  //   loadWorkbenchData();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // const tasks = useMemo(
  //   () => (workbenchApiData?.tasks ?? []).map(normalizeTask),
  //   [workbenchApiData],
  // );
  const tasks = useMemo(
  () => workbenchApiData?.tasks ?? [],
  [workbenchApiData]
);
  const summary = useMemo(
    () =>
      KPI_PRESENTATION.map(([key, title, subtitle, type]) => ({
        title,
        subtitle,
        type,
        value: Number(workbenchApiData?.summary?.[key] ?? 0),
      })),
    [workbenchApiData],
  );

  if (loading) {
    return <LoadingState label="Loading workbench data..." />;
  }

  return (
    <main
      className="min-h-full text-slate-700"
      aria-busy={loading}
      data-has-error={Boolean(error)}
    >
      <div className="mx-auto max-w-[1600px]">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-[18px] font-bold leading-5 text-slate-800">
              My Tasks
            </h1>

            <p className="mt-0.5 text-[12px] text-slate-500">
              Assigned customer master data quality work
            </p>
          </div>
        </header>

        {/* {selectedTask ? 
        <MyTaskDetail task={selectedTask} onBack={() => setSelectedTask(null)} /> : <><MyTaskKpis summary={summary} />
        <MyTaskTable tasks={tasks} onOpenTask={setSelectedTask} /></>} */}
        {showDetails ? (
          <MyTaskDetail task={selectedTask} onBack={handleBack} />
        ) : (
          <>
            <MyTaskKpis summary={summary} />

            <MyTaskTable tasks={tasks} onOpenTask={handleOpenTask} />
          </>
        )}
      </div>
    </main>
  );
}
