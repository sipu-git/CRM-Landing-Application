import { api } from "@/lib/api"; // your configured axios instance
import { Project, CreateProjectPayload, ApiSuccess, ContactLookupResult } from "./types";

const BASE_URL = "/enquiry";

export const projectClient = {
  create(payload: CreateProjectPayload) {
    return api.post<ApiSuccess<Project>>(`${BASE_URL}`, payload)
      .then((res) => res.data.data);
  },
  lookupContactByEmail(email: string) {
    return api.get<ApiSuccess<ContactLookupResult | null>>("/contacts/auto-fetch", { params: { email } })
      .then((res) => res.data.data);
  },
};