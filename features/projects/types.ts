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

export type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ProjectState {
    items: Project[];
    listStatus: AsyncStatus;
    listError: string | null;
    pagination: { page: number; pageSize: number; total: number };
    selected: Project | null;
    selectedStatus: AsyncStatus;
    selectedError: string | null;
    createStatus: AsyncStatus;
    createError: string | null;
    lookupResult: ContactLookupResult | null;
    lookupStatus: AsyncStatus;
    lookupError: string | null;
}