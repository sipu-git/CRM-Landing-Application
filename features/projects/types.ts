export type ProjectStatus = "NOT_STARTED" | "IN_PROGRESS" | "ON_HOLD" | "COMPLETED" | "CANCELLED";

export type Source = "WEBSITE" | "REFERAL" | "SOCIAL_MEDIA" | "EVENT" | "WEBINAR" | "OTHER";
export type ProjectType = "Web_Application" | "Mobile_Application" | "Desktop_Application" | "SaaS_Platform" | "SaaS_Platform" | "AI_ML_Application" | "Automation_System" | "IoT_Application";

export interface Project {
    id: string;
    tenant_id: string;
    companyId: string;
    contactId: string | null;
    project_name: string;
    project_type: ProjectType;
    status: ProjectStatus;
    timeline: string | null;
    budget: string | null;
    owner_id: string | null;
    originating_lead_id: string | null;
    created_by: string;
    created_at: string;
    updated_at: string;
    company?: { id: string; name: string };
    contact?: { id: string; firstName: string; lastName: string | null; email: string | null; phone: string | null };
}

export interface CreateProjectPayload {
    company_name: string;
    source: Source;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    designation?: string;
    project_name: string;
    project_type: ProjectType;
    status?: ProjectStatus;
    timeline?: string;
    budget?: string;
    description?: string;
}

export interface ConvertLeadToProjectPayload {
    lead_id: string;
    owner_id?: string;
    start_date?: string;
    due_date?: string;
    budget?: string;
}

export interface UpdateProjectPayload {
    project_name?: string;
    project_type?: string;
    status?: ProjectStatus;
    timeline?: string;
    budget?: string;
    owner_id?: string;
}

export interface ListProjectsParams {
    status?: ProjectStatus;
    companyId?: string;
    owner_id?: string;
    search?: string;
    page?: number;
    pageSize?: number;
}
export interface ContactLookupResult {
    contactId: string;
    first_name: string;
    last_name: string | null;
    phone: string | null;
    designation: string | null;
    companyId: string;
    company: {
        name:string;
    };
}
export interface ApiSuccess<T> {
    success: true;
    message?: string;
    data: T;
}

export interface PaginatedResponse<T> {
    success: true;
    data: T[];
    pagination: { page: number; pageSize: number; total: number };
}

export type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ProjectState {
    items: Project[];
    listStatus: AsyncStatus;
    listError: string | null;
    pagination: { page: number; pageSize: number; total: number };
    filters: ListProjectsParams;
    selected: Project | null;
    selectedStatus: AsyncStatus;
    selectedError: string | null;
    createStatus: AsyncStatus;
    createError: string | null;
    convertStatus: AsyncStatus;
    convertError: string | null;
    updateStatus: AsyncStatus;
    updateError: string | null;

    // Contact autofill lookup — kept in this slice since it exists only
    // to serve the Add Project form, not a general Contacts module.
    lookupResult: ContactLookupResult | null;
    lookupStatus: AsyncStatus;
    lookupError: string | null;
}