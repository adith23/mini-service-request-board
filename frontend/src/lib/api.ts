import type { JobStatus } from "./constants";

const TOKEN_STORAGE_KEY = "service-board-token";

export interface JobRequest {
  _id: string;
  title: string;
  description: string;
  category?: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
  status: JobStatus;
  createdAt: string;
}

export interface CreateJobPayload {
  title: string;
  description: string;
  category?: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
}

export interface JobFilters {
  category?: string;
  status?: JobStatus;
  search?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthPayload {
  name?: string;
  email: string;
  password: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details: unknown = null,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getJobs(filters: JobFilters = {}, options: RequestInit = {}) {
  return apiRequest<JobRequest[]>(`/jobs${toQueryString(filters)}`, options);
}

export function getJobById(id: string, options: RequestInit = {}) {
  return apiRequest<JobRequest>(`/jobs/${encodeURIComponent(id)}`, options);
}

export function createJob(payload: CreateJobPayload, options: RequestInit = {}) {
  return apiRequest<JobRequest>("/jobs", {
    ...options,
    method: "POST",
    body: JSON.stringify(compactPayload(payload)),
  });
}

export function updateJobStatus(
  id: string,
  status: JobStatus,
  options: RequestInit = {},
) {
  return apiRequest<JobRequest>(`/jobs/${encodeURIComponent(id)}`, {
    ...options,
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteJob(id: string, options: RequestInit = {}) {
  return apiRequest<void>(`/jobs/${encodeURIComponent(id)}`, {
    ...options,
    method: "DELETE",
  });
}

export function registerUser(payload: AuthPayload, options: RequestInit = {}) {
  return apiRequest<AuthResponse>("/auth/register", {
    ...options,
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: AuthPayload, options: RequestInit = {}) {
  return apiRequest<AuthResponse>("/auth/login", {
    ...options,
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getCurrentUser(options: RequestInit = {}) {
  return apiRequest<{ user: AuthUser }>("/auth/me", options);
}

export function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function storeToken(token: string) {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearStoredToken() {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw await buildApiError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function getApiBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

  if (configuredUrl) {
    return configuredUrl.endsWith("/api") ? configuredUrl : `${configuredUrl}/api`;
  }

  // Local fallback: Next.js rewrites /api/* to the Express dev server.
  return "/api";
}

function toQueryString(filters: JobFilters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const query = params.toString();
  return query ? `?${query}` : "";
}

function compactPayload(payload: CreateJobPayload) {
  return Object.fromEntries(
    Object.entries(payload)
      .map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
      .filter(([, value]) => value !== ""),
  );
}

async function buildApiError(response: Response) {
  const fallbackMessage = `Request failed with status ${response.status}`;

  try {
    const payload = await response.json();
    const message = payload?.error?.message || payload?.message || fallbackMessage;

    return new ApiError(message, response.status, payload);
  } catch {
    return new ApiError(fallbackMessage, response.status);
  }
}
