"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsProps {
    tabs: { id: string; label: string; icon?: React.ReactNode }[];
    activeTab: string;
    onChange: (id: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
    return (
        <div className={cn("flex space-x-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200 dark:border-white/10", className)}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={cn(
                            "relative flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg outline-none",
                            isActive
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        )}
                    >
                        {/* Indicator behind content */}
                        {isActive && (
                            <motion.div
                                layoutId="active-tab"
                                className="absolute inset-0 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-sm dark:shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {/* Content above indicator */}
                        {tab.icon && <span className="relative z-10">{tab.icon}</span>}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
