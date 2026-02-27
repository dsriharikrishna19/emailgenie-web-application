"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    isLoading,
    className = "",
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed gap-2";

    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20",
        secondary: "bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10",
        outline: "border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white",
        ghost: "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
        danger: "bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20",
    };

    const sizes = {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10 px-0",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {children}
        </motion.button>
    );
}
