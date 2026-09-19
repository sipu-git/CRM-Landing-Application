// Simplified API client without authentication
import axios from "axios";
import { toast } from "sonner";

// Adjust BASE_URL as needed for your environment
// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = process.env.NEXT_PUBLIC_RENDER_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  // No credentials or auth headers required
});

// Generic error handling interceptor (keeps user feedback for server errors)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      if (typeof window !== "undefined") toast.error("Network error");
      return Promise.reject(error);
    }
    const status = error.response.status;
    const msg = error.response.data?.message || error.message;
    if (status >= 500) {
      if (typeof window !== "undefined") toast.error(msg || "Server error");
    } else if (status === 403) {
      if (typeof window !== "undefined") toast.error("You don't have access to this resource.");
    }
    return Promise.reject(error);
  }
);

// Optional stub for configureApi – no‑op now that auth is removed
export function configureApi(_opts: any) {
  // No authentication configuration needed
}