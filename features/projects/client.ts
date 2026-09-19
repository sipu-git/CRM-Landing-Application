import { api } from "@/lib/api"; // your configured axios instance
import { Project, CreateProjectPayload, ApiSuccess, ContactLookupResult } from "./types";

const BASE_URL = "/enquiry";

export const projectClient = {
  create(payload: CreateProjectPayload) {
    return api.post<ApiSuccess<Project>>(`${BASE_URL}`, payload)
      .then((res) => res.data.data);
  },

  // convertLead(payload: ConvertLeadToProjectPayload) {
  //   return api.post<ApiSuccess<Project>>(`${BASE_URL}/convert-lead`, payload)
  //     .then((res) => res.data.data);
  // },

  // getById(id: string) {
  //   return api.get<ApiSuccess<Project>>(`${BASE_URL}/${id}`)
  //     .then((res) => res.data.data);
  // },

  // list(params: ListProjectsParams) {
  //   return api.get<PaginatedResponse<Project>>(BASE_URL, { params })
  //     .then((res) => res.data);
  // },

  // update(id: string, payload: UpdateProjectPayload) {
  //   return api.patch<ApiSuccess<Project>>(`${BASE_URL}/${id}`, payload)
  //     .then((res) => res.data.data);
  // },

  lookupContactByEmail(email: string) {
    return api.get<ApiSuccess<ContactLookupResult | null>>("/contacts/auto-fetch", { params: { email } })
      .then((res) => res.data.data);
  },
};