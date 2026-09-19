import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { projectClient } from "./client";
import { handleApiError } from "@/lib/apiError";
import {
    Project, ProjectState, CreateProjectPayload, ConvertLeadToProjectPayload,
    UpdateProjectPayload, ListProjectsParams, ContactLookupResult,
} from "./types";

const initialState: ProjectState = {
    items: [],
    listStatus: "idle",
    listError: null,
    pagination: { page: 1, pageSize: 20, total: 0 },
    filters: {},
    selected: null,
    selectedStatus: "idle",
    selectedError: null,

    createStatus: "idle",
    createError: null,

    convertStatus: "idle",
    convertError: null,

    updateStatus: "idle",
    updateError: null,

    lookupResult: null,
    lookupStatus: "idle",
    lookupError: null,
};

export const fetchProjects = createAsyncThunk<
    Awaited<ReturnType<typeof projectClient.list>>,
    ListProjectsParams,
    { rejectValue: string }
>("projects/fetchProjects", async (params, { rejectWithValue }) => {
    try {
        return await projectClient.list(params);
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});

export const fetchProjectById = createAsyncThunk<Project, string, { rejectValue: string }>(
    "projects/fetchProjectById",
    async (id, { rejectWithValue }) => {
        try {
            return await projectClient.getById(id);
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    },
);

export const createProject = createAsyncThunk<Project, CreateProjectPayload, { rejectValue: string }>(
    "projects/createProject",
    async (payload, { rejectWithValue }) => {
        try {
            return await projectClient.create(payload);
        } catch (error) {
            return rejectWithValue(handleApiError(error));
        }
    },
);

export const convertLeadToProject = createAsyncThunk<
    Project,
    ConvertLeadToProjectPayload,
    { rejectValue: string }
>("projects/convertLeadToProject", async (payload, { rejectWithValue }) => {
    try {
        return await projectClient.convertLead(payload);
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});

export const updateProject = createAsyncThunk<
    Project,
    { id: string; payload: UpdateProjectPayload },
    { rejectValue: string }
>("projects/updateProject", async ({ id, payload }, { rejectWithValue }) => {
    try {
        return await projectClient.update(id, payload);
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});

export const lookupContactByEmail = createAsyncThunk<
    ContactLookupResult | null,
    string,
    { rejectValue: string }
>("projects/lookupContactByEmail", async (email, { rejectWithValue }) => {
    try {
        return await projectClient.lookupContactByEmail(email);
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<ListProjectsParams>) {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearSelected(state) {
            state.selected = null;
            state.selectedStatus = "idle";
            state.selectedError = null;
        },
        resetCreateStatus(state) {
            state.createStatus = "idle";
            state.createError = null;
        },
        resetConvertStatus(state) {
            state.convertStatus = "idle";
            state.convertError = null;
        },
        clearLookup(state) {
            state.lookupResult = null;
            state.lookupStatus = "idle";
            state.lookupError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // list
            .addCase(fetchProjects.pending, (state) => {
                state.listStatus = "loading";
                state.listError = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.listStatus = "succeeded";
                state.items = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.listStatus = "failed";
                state.listError = action.payload ?? "Failed to load projects";
            })

            // single
            .addCase(fetchProjectById.pending, (state) => {
                state.selectedStatus = "loading";
                state.selectedError = null;
            })
            .addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<Project>) => {
                state.selectedStatus = "succeeded";
                state.selected = action.payload;
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.selectedStatus = "failed";
                state.selectedError = action.payload ?? "Failed to load project";
            })

            // create
            .addCase(createProject.pending, (state) => {
                state.createStatus = "loading";
                state.createError = null;
            })
            .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
                state.createStatus = "succeeded";
                state.items.unshift(action.payload);
            })
            .addCase(createProject.rejected, (state, action) => {
                state.createStatus = "failed";
                state.createError = action.payload ?? "Failed to create project";
            })

            // convert lead
            .addCase(convertLeadToProject.pending, (state) => {
                state.convertStatus = "loading";
                state.convertError = null;
            })
            .addCase(convertLeadToProject.fulfilled, (state, action: PayloadAction<Project>) => {
                state.convertStatus = "succeeded";
                state.items.unshift(action.payload);
            })
            .addCase(convertLeadToProject.rejected, (state, action) => {
                state.convertStatus = "failed";
                state.convertError = action.payload ?? "Failed to convert lead to project";
            })

            // update
            .addCase(updateProject.pending, (state) => {
                state.updateStatus = "loading";
                state.updateError = null;
            })
            .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
                state.updateStatus = "succeeded";
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
                if (state.selected?.id === action.payload.id) state.selected = action.payload;
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.updateStatus = "failed";
                state.updateError = action.payload ?? "Failed to update project";
            })

            // contact autofill lookup
            .addCase(lookupContactByEmail.pending, (state) => {
                state.lookupStatus = "loading";
                state.lookupError = null;
            })
            .addCase(lookupContactByEmail.fulfilled, (state, action: PayloadAction<ContactLookupResult | null>) => {
                state.lookupStatus = "succeeded";
                state.lookupResult = action.payload;
            })
            .addCase(lookupContactByEmail.rejected, (state, action) => {
                state.lookupStatus = "failed";
                state.lookupError = action.payload ?? "Lookup failed";
                state.lookupResult = null;
            });
    },
});

export const { setFilters, clearSelected, resetCreateStatus, resetConvertStatus, clearLookup } = projectSlice.actions;
export default projectSlice.reducer;