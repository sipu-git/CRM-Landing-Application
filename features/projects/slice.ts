import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateProjectPayload, ProjectState } from "./types";
import { handleApiError } from "@/lib/apiError";
import { api } from "@/lib/api";

const initialState: ProjectState = {
    createStatus: "idle",
    createError: null,
    createLoading: false,
    createSuccess: false
}

const sub_url = "/project/create";

export const createProject = createAsyncThunk("projects/createProject", async (payload: CreateProjectPayload, { rejectWithValue }) => {
    try {
        const response = await api.post(sub_url, payload);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(handleApiError(error));
    }
});

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        clearError: (state) => {
            state.createError = null;
            state.createLoading = false;
        },

        clearSuccess: (state) => {
            state.createSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.createStatus = "loading";
                state.createError = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.createStatus = "succeeded";
                state.createError = null;
            })
            .addCase(createProject.rejected, (state, action) => {
                state.createStatus = "failed";
                state.createError = action?.error.message || "Something went wrong";
            });
    },
});
export const { clearError, clearSuccess } = projectSlice.actions;
export default projectSlice.reducer;