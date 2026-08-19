"use client";

import { Provider } from "react-redux";
import { store } from "@/stores/index"; // adjust to wherever your configureStore() call lives

export function ReduxProvider({ children }: { children: React.ReactNode }) {

    return <Provider store={store}>{children}</Provider>;
}