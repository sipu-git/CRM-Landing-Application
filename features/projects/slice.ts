import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { projectClient } from "./client";
import { handleApiError } from "@/lib/apiError";
import { ProjectState, CreateProjectPayload, ContactLookupResult, Project } from "./types";

const initialState: ProjectState = {
    items: [],
    listStatus: "idle",
    listError: null,
    pagination: { page: 1, pageSize: 20, total: 0 },
    selected: null,
    selectedStatus: "idle",
    selectedError: null,
    createStatus: "idle",
    createError: null,
    lookupResult: null,
    lookupStatus: "idle",
    lookupError: null,
};

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

        resetCreateStatus(state) {
            state.createStatus = "idle";
            state.createError = null;
        },
        clearLookup(state) {
            state.lookupResult = null;
            state.lookupStatus = "idle";
            state.lookupError = null;
        },
    },
    extraReducers: (builder) => {
        builder
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

export const { resetCreateStatus, clearLookup } = projectSlice.actions;
export default projectSlice.reducer;