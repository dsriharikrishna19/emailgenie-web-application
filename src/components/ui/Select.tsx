"use client";

import { type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: readonly string[] | string[];
}

export function Select({ label, options, className = "", ...props }: SelectProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 ml-1 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <div className="relative w-full">
                <select
                    className={`w-full h-11 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 text-slate-900 dark:text-slate-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer hover:border-slate-300 dark:hover:border-white/20 ${className}`}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option} value={option} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200">
                            {option}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
                    <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 1.5L6 6.5L11 1.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
