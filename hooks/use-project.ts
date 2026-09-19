'use client'
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks"; // adjust to your actual typed-hooks path
import { lookupContactByEmail, clearLookup } from "@/features/projects/slice"; // adjust path

export function useContactAutofill(email: string) {
    const dispatch = useAppDispatch();
    const { lookupResult, lookupStatus } = useAppSelector((state) => state.projects);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            dispatch(clearLookup());
            return;
        }

        debounceRef.current = setTimeout(() => {
            dispatch(lookupContactByEmail(email));
        }, 500);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [email, dispatch]);

    return { match: lookupResult, loading: lookupStatus === "loading" };
}