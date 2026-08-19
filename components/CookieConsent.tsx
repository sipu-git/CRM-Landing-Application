"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "northpeak.cookie-consent"; // "accepted" | "declined"

export type CookieConsentValue = "accepted" | "declined";

export function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(CONSENT_KEY);
            if (!stored) {
                // Small delay so it doesn't compete with the page's own entrance animations.
                const t = window.setTimeout(() => setVisible(true), 900);
                return () => window.clearTimeout(t);
            }
        } catch {
            /* localStorage unavailable — skip persistence, still show once */
            setVisible(true);
        }
    }, []);

    function choose(value: CookieConsentValue) {
        try {
            window.localStorage.setItem(CONSENT_KEY, value);
        } catch {
            /* ignore — worst case, banner reappears next visit */
        }
        setVisible(false);

        // Hook analytics/marketing scripts up to this event, e.g.:
        // window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value }));
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    role="region"
                    aria-label="Cookie consent"
                    className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:px-0"
                >
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-float)]">
                        <div className="flex items-start gap-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl surface-ink">
                                <Cookie className="h-4.5 w-4.5 text-amber" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold">We use cookies</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    We use cookies to run this site and understand how it's used. You can accept
                                    all cookies or decline non-essential ones.{" "}
                                    <a href="/privacy" className="font-medium text-foreground underline underline-offset-4">
                                        Learn more
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            <button
                                onClick={() => choose("declined")}
                                className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                                Decline
                            </button>
                            <button
                                onClick={() => choose("accepted")}
                                className="flex-1 rounded-xl bg-[image:var(--gradient-amber)] px-4 py-2.5 text-sm font-semibold text-amber-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
                            >
                                Accept all
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/**
 * Utility for reading the current consent value elsewhere in the app
 * (e.g. before initializing analytics scripts).
 */
export function getCookieConsent(): CookieConsentValue | null {
    if (typeof window === "undefined") return null;
    try {
        return window.localStorage.getItem(CONSENT_KEY) as CookieConsentValue | null;
    } catch {
        return null;
    }
}