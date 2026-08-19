'use client'

import {createContext,useCallback,useContext,useEffect,useMemo,useState,type ReactNode} from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks"; // adjust to your actual typed-hooks path
import { login, registerUser, logoutUser, fetchMe, resetRegisterStatus } from "@/features/auth/slice";
import type { ApiUser, LoginPayload, RegisterPayload } from "@/features/auth/types";

type AuthMode = "signin" | "signup";

type AuthContextValue = {
  user: ApiUser | null;
  ready: boolean;
  modalOpen: boolean;
  mode: AuthMode;
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  setMode: (mode: AuthMode) => void;
  signIn: (payload: LoginPayload) => Promise<boolean>;
  signUp: (payload: RegisterPayload) => Promise<boolean>;
  signOut: () => void;
  authLoading: boolean;
  authError: string | null;
  registerLoading: boolean;
  registerError: string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, token, status, error, registerStatus, registerError } = useAppSelector(
    (state) => state.auth,
  );

  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchMe()).finally(() => setReady(true));
    } else {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Signed out (initially, or right after logout) -> the sign-in modal pops up.
  useEffect(() => {
    if (!ready) return;
    if (user) {
      setModalOpen(false);
      return;
    }
    setMode("signin");
    const t = window.setTimeout(() => setModalOpen(true), 450);
    return () => window.clearTimeout(t);
  }, [ready, user]);

  const openAuth = useCallback((next: AuthMode = "signin") => {
    setMode(next);
    setModalOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setModalOpen(false);
    dispatch(resetRegisterStatus());
  }, [dispatch]);

  const signIn = useCallback(
    async (payload: LoginPayload) => {
      const result = await dispatch(login(payload));
      const ok = login.fulfilled.match(result);
      if (ok) setModalOpen(false);
      return ok;
    },
    [dispatch],
  );

  const signUp = useCallback(
    async (payload: RegisterPayload) => {
      const result = await dispatch(registerUser(payload));
      const ok = registerUser.fulfilled.match(result);
      // Registration returns { userId, tenantId } — not a session.
      // Route the user to sign in (or auto-login here if your backend
      // returns an access token on register instead).
      if (ok) setMode("signin");
      return ok;
    },
    [dispatch],
  );

  const signOut = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const value = useMemo(
    () => ({
      user,
      ready,
      modalOpen,
      mode,
      openAuth,
      closeAuth,
      setMode,
      signIn,
      signUp,
      signOut,
      authLoading: status === "loading",
      authError: error,
      registerLoading: registerStatus === "loading",
      registerError,
    }),
    [user, ready, modalOpen, mode, openAuth, closeAuth, signIn, signUp, signOut, status, error, registerStatus, registerError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}