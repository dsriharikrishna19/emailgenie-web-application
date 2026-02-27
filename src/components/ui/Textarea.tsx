"use client";

import { type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export function Textarea({ label, className = "", ...props }: TextareaProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <textarea
                className={`min-h-[140px] bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none leading-relaxed w-full ${className}`}
                {...props}
            />
        </div>
    );
}
