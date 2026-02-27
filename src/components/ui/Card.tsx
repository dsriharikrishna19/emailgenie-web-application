"use client";

import { type ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }: CardProps) {
    return (
        <div className={`px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 ${className}`}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = "" }: CardProps) {
    return (
        <h2 className={`text-xl font-bold text-slate-900 dark:text-white ${className}`}>
            {children}
        </h2>
    );
}

export function CardDescription({ children, className = "" }: CardProps) {
    return (
        <p className={`text-slate-500 dark:text-slate-400 text-sm mt-1 ${className}`}>
            {children}
        </p>
    );
}

export function CardContent({ children, className = "" }: CardProps) {
    return (
        <div className={`p-8 ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = "" }: CardProps) {
    return (
        <div className={`px-8 py-6 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 ${className}`}>
            {children}
        </div>
    );
}
