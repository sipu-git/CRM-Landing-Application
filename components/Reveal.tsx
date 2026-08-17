'use client'
import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealTag = "div" | "li" | "h1" | "h2" | "h3" | "p" | "section";

export function Reveal({
    children,
    className,
    delay = 0,
    as = "div",
    ...rest
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: RevealTag;
} & Omit<HTMLMotionProps<"div">, "children" | "className">) {
    const reduced = useReducedMotion();
    const Tag = motion[as] as typeof motion.div;

    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y: reduced ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
            transition={{
                duration: reduced ? 0.3 : 0.5,
                delay: delay / 1000,
                ease: [0.22, 1, 0.36, 1],
            }}
            {...rest}
        >
            {children}
        </Tag>
    );
}
