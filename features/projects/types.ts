export type ProjectStatus = "NOT_STARTED" | "IN_PROGRESS" | "ON_HOLD" | "COMPLETED" | "CANCELLED";
export type Source = "WEBSITE" | "REFERAL" | "SOCIAL_MEDIA" | "EVENT" | "WEBINAR" | "OTHER";

export interface CreateProjectPayload {
    companyId?: string;
    contactId?: string;
    company_name: string;
    source: Source;
    first_name?: string;
    last_name?: string;
    contact_email?: string;
    contact_phone?: string;
    designation?: string;
    project_name: string;
    project_type?: string;
    status?: ProjectStatus;
    start_date?: string;
    due_date?: string;
    budget?: number;
    owner_id?: string;
}

export interface ApiSuccess<T> {
    success: true;
    message?: string;
    data: T;
}

export type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export interface ProjectState {
    createStatus: AsyncStatus;
    createError: string | null;
    createLoading: boolean;
    createSuccess: boolean;
    // convertStatus: AsyncStatus;
}