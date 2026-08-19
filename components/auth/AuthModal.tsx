'use client'
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, Loader2, Lock, Mail, Mountain, User, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "./AuthProvider";

const field =
    "w-full rounded-xl border border-border bg-background py-3 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

export function AuthModal() {
    const { modalOpen, mode, setMode, closeAuth, signIn, signUp, user, authLoading, registerLoading } = useAuth();
    const reduced = useReducedMotion();
    const [fullName, setFullName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isSignup = mode === "signup";
    const busy = isSignup ? registerLoading : authLoading;

    useEffect(() => {
        if (!modalOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && user) closeAuth();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [modalOpen, closeAuth, user]);

    async function submit(e: React.FormEvent) {
        e.preventDefault();

        if (isSignup && fullName.trim().length < 2) {
            toast.error("Please enter your full name.");
            return;
        }
        if (isSignup && companyName.trim().length < 1) {
            toast.error("Please enter your company name.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Enter a valid work email address.");
            return;
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        if (isSignup) {
            const ok = await signUp({
                full_name: fullName.trim(),
                company_name: companyName.trim(),
                email,
                password,
                role: "OWNER",
            });
            if (ok) {
                toast.success("Workspace created — sign in to continue.");
                setFullName("");
                setCompanyName("");
                setPassword("");
            } else {
                toast.error("Could not create your workspace. Please try again.");
            }
        } else {
            const ok = await signIn({ email, password });
            if (ok) {
                toast.success("Signed in to Northpeak.");
                setPassword("");
            } else {
                toast.error("Invalid email or password.");
            }
        }
    }

    return (
        <AnimatePresence>
            {modalOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] grid place-items-center px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="auth-modal-title"
                >
                    <div
                        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
                        onClick={() => user && closeAuth()}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: reduced ? 0 : -36, scale: reduced ? 1 : 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: reduced ? 0 : -24, scale: reduced ? 1 : 0.98 }}
                        transition={{ duration: reduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-float)] sm:p-8"
                    >
                        {user && (
                            <button
                                onClick={closeAuth}
                                aria-label="Close"
                                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}

                        <span className="grid h-11 w-11 place-items-center rounded-2xl surface-ink">
                            <Mountain className="h-5 w-5 text-amber" />
                        </span>

                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, y: reduced ? 0 : -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduced ? 0 : 10 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <h2 id="auth-modal-title" className="mt-5 text-2xl font-bold">
                                    {isSignup ? "Create your workspace" : "Sign in to Northpeak"}
                                </h2>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {isSignup
                                        ? "Set up your team, invite reps, and let the automation engine take the follow-ups."
                                        : "Pick up your pipeline exactly where your team left it."}
                                </p>

                                <form onSubmit={submit} className="mt-6 grid gap-3">
                                    {isSignup && (
                                        <div className="relative">
                                            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                className={field}
                                                placeholder="Full name"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                autoComplete="name"
                                            />
                                        </div>
                                    )}
                                    {isSignup && (
                                        <div className="relative">
                                            <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                className={field}
                                                placeholder="Company name"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                autoComplete="organization"
                                            />
                                        </div>
                                    )}
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            className={field}
                                            type="email"
                                            placeholder="Work email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="email"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            className={field}
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete={isSignup ? "new-password" : "current-password"}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={busy}
                                        className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-amber)] px-5 py-3.5 text-sm font-semibold text-amber-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                                    >
                                        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                                        {isSignup ? "Create account" : "Sign in"}
                                    </button>
                                </form>

                                <p className="mt-5 text-center text-sm text-muted-foreground">
                                    {isSignup ? "Already have a workspace?" : "New to Northpeak?"}{" "}
                                    <button
                                        onClick={() => setMode(isSignup ? "signin" : "signup")}
                                        className="font-semibold text-foreground underline underline-offset-4"
                                    >
                                        {isSignup ? "Sign in" : "Create account"}
                                    </button>
                                </p>
                                <p className="mt-3 text-center text-xs text-muted-foreground">
                                    No credit card required · Cancel anytime
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}