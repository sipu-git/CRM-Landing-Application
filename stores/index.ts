import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import auth from "@/features/auth/slice";
import projects from "@/features/projects/slice";

const appReducer = combineReducers({
  // auth,
  projects
});

// Root reducer resets tenant-scoped slices on TENANT_RESET.
export const rootReducer: typeof appReducer = (state, action) => {
  if (action.type === "app/tenantReset" && state) {
    return appReducer(
      {...state,projects: undefined as never},
      action,
    );
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const tenantReset = () => ({ type: "app/tenantReset" as const });
