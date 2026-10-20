import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/backend";
const debugApiRequests = process.env.NEXT_PUBLIC_DATABRICKS_DEBUG === "true";

function getRequestUrl(config) {
  if (typeof window === "undefined") {
    return config.url;
  }

  const configuredBaseUrl = config.baseURL ?? "";
  const baseUrl = new URL(
    configuredBaseUrl.endsWith("/") ? configuredBaseUrl : `${configuredBaseUrl}/`,
    window.location.origin
  );
  return new URL(config.url ?? "", baseUrl).toString();
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const DASHBOARD_URL = `${API_BASE_URL}/api/dq/dashboard`;
export const ISSUES_URL = `${API_BASE_URL}/api/dq/issues-screen?page=1&per_page=25`;
export const AUDIT_URL = `${API_BASE_URL}/api/dq/audit-screen?page=1&per_page=25`;
// export const COPILOT_CHAT_URL = `${API_BASE_URL}/v1/copilot/chat`;
export const LOGIN_URL = `${API_BASE_URL}/auth/login`;
export const REGISTER_URL = `${API_BASE_URL}/auth/register`;
// export const AGENT_STATUS_URL = `${API_BASE_URL}/agent-status`;
// export const NOTIFICATION_URL = `${API_BASE_URL}/notification`;

let dashboardRequest;
let issuesRequest;
const myTasksRequests = new Map();
let auditRequest;
// let agentStatusRequest;
// let notificationsRequest;
// let agentStatusCache;
// let notificationsCache;
const LIVE_STATUS_CACHE_TTL_MS = 15000;
const NOTIFICATION_CACHE_TTL_MS = 15000;

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const isAuthenticationRequest = config.url?.startsWith("auth/");
      const storedToken = localStorage.getItem("access_token");
      const token = ["", "null", "undefined"].includes(storedToken)
        ? null
        : storedToken;

      if (!token && storedToken) {
        localStorage.removeItem("access_token");
      }

      if (isAuthenticationRequest) {
        delete config.headers.Authorization;
      }

      if (debugApiRequests) {
        console.debug("[Databricks API] Request", {
          method: config.method?.toUpperCase(),
          url: getRequestUrl(config),
          hasAccessToken: Boolean(token) && !isAuthenticationRequest,
        });
      }

      if (token && !isAuthenticationRequest) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (debugApiRequests && typeof window !== "undefined") {
      console.error("[Databricks API] Request failed", {
        method: error.config?.method?.toUpperCase(),
        url: getRequestUrl(error.config ?? {}),
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
    }

    return Promise.reject(error);
  }
);
// export async function getAgentStatus() {
//   const now = Date.now();

//   if (
//     agentStatusCache &&
//     now - agentStatusCache.fetchedAt < LIVE_STATUS_CACHE_TTL_MS
//   ) {
//     return agentStatusCache.data;
//   }

//   if (!agentStatusRequest) {
//     agentStatusRequest = axiosInstance
//       .get("agent-status")
//       .then((response) => {
//         agentStatusCache = {
//           data: response.data,
//           fetchedAt: Date.now(),
//         };

//         return response.data;
//       })
//       .finally(() => {
//         agentStatusRequest = undefined;
//       });
//   }

//   return agentStatusRequest;
// }
// export async function getNotifications() {
//   const now = Date.now();

//   if (
//     notificationsCache &&
//     now - notificationsCache.fetchedAt < NOTIFICATION_CACHE_TTL_MS
//   ) {
//     return notificationsCache.data;
//   }

//   if (!notificationsRequest) {
//     notificationsRequest = axiosInstance
//       .get("notification")
//       .then((response) => {
//         notificationsCache = {
//           data: response.data,
//           fetchedAt: Date.now(),
//         };

//         return response.data;
//       })
//       .finally(() => {
//         notificationsRequest = undefined;
//       });
//   }

//   return notificationsRequest;
// }

export async function loginUser(email, password) {
  const response = await axiosInstance.post("auth/login", {
  email,
  password,
  });

  return response.data;
  }
// export async function registerUser(
// email,
// name,
// password
// ) {
// const response = await axiosInstance.post("auth/register", {
// email,
// name,
// password,
// });
// return response.data;
// }

export async function registerUser(email, name, password) {
  const res = await axiosInstance.post("auth/register", {
    email,
    name,
    password,
  });
  return res.data;
}

export async function getDashboard() {
  if (!dashboardRequest) {
    dashboardRequest = axiosInstance
      .get("api/dq/dashboard")
      .then((response) => response.data)
      .catch((error) => {
        dashboardRequest = undefined;
        throw error;
      });
  }

  return dashboardRequest;
}

export async function getIssues() {
  if (!issuesRequest) {
    issuesRequest = axiosInstance
      .get("api/dq/issues-screen?page=1&per_page=25")
      .then((response) => response.data)
      .catch((error) => {
        issuesRequest = undefined;
        throw error;
      });
  }

  return issuesRequest;
}
export async function getIssueDetails(issueId) {
  const response = await axiosInstance.get(
    `api/dq/issues-screen/${encodeURIComponent(issueId)}`
  );

  return response.data;
}
export async function submitIssueProposal(issueId, payload) {
  const response = await axiosInstance.post(
    `api/dq/issues/${encodeURIComponent(issueId)}/propose`,
    payload
  );

  return response.data;
}
export async function assignIssue(issueId, payload) {
  const response = await axiosInstance.post(
    `api/dq/issues/${encodeURIComponent(issueId)}/assign`,
    payload
  );

  return response.data;
}
// export async function getMyTasks(userName) {
//   if (!userName) {
//     throw new Error("A user name is required to load tasks");
//   }

//   if (!myTasksRequests.has(userName)) {
//     const request = axiosInstance
//       .get(`api/dq/tasks-screen/${encodeURIComponent(userName)}`)
//       .then((response) => response.data)
//       .catch((error) => {
//         myTasksRequests.delete(userName);
//         throw error;
//       });

//     myTasksRequests.set(userName, request);
//   }

//   return myTasksRequests.get(userName);
// }
export async function getMyTasks(email) {
  if (!email) {
    throw new Error("User email is required to load tasks");
  }

  if (!myTasksRequests.has(email)) {
    const request = axiosInstance
      // .get(`api/dq/tasks-screen/${encodeURIComponent(email)}`)
      .get(`api/dq/tasks-screen/${email}`)
      .then((response) => response.data)
      .catch((error) => {
        myTasksRequests.delete(email);
        throw error;
      });

    myTasksRequests.set(email, request);
  }

  return myTasksRequests.get(email);
}
export async function getMyTaskDetails(
  email,
  issueId,
  action
) {
  const params = new URLSearchParams({
    issue_id: issueId,
  });

  if (action) {
    params.append("action", action);
  }

  const response = await axiosInstance.get(
    `api/dq/tasks-screen/${email}?${params.toString()}`
  );

  return response.data;
}
export async function getAudit() {
  if (!auditRequest) {
    auditRequest = axiosInstance
      .get("api/dq/audit-screen?page=1&per_page=25")
      .then((response) => response.data)
      .catch((error) => {
        auditRequest = undefined;
        throw error;
      });
  }

  return auditRequest;
}

// export async function sendCopilotMessage(message, userId, userName) {
//   const response = await axiosInstance.post("v1/copilot/chat", {
//     userId,
//     userName,
//     message,
//     timestamp: new Date().toISOString(),
//   });

//   return response.data;
// }

export default axiosInstance;