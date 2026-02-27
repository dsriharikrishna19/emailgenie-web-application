"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History, ChevronRight, Clock } from "lucide-react";
import { Button } from "./ui/Button";

interface HistoryItem {
    id: string;
    scenario: string;
    timestamp: number;
    email: {
        subject: string;
        body: string;
        signature: string;
    };
}

interface HistorySidebarProps {
    items: HistoryItem[];
    onSelectItem: (item: HistoryItem) => void;
    onClearHistory: () => void;
}

export function HistorySidebar({
    items,
    onSelectItem,
    onClearHistory,
}: HistorySidebarProps) {
    return (
        <div className="w-full lg:w-80 space-y-6">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-bold flex items-center gap-2 text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    <History className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                    Recent Work
                </h3>
                {items.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearHistory}
                        className="text-[10px] font-bold text-red-500/70 dark:text-red-400/70 hover:text-red-600 dark:hover:text-red-400 uppercase tracking-tighter h-auto p-0"
                    >
                        Clear All
                    </Button>
                )}
            </div>

            <div className="space-y-3">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 border-dashed text-slate-400 dark:text-slate-700">
                        <Clock className="h-8 w-8 mb-3 opacity-50" />
                        <p className="text-sm text-slate-500 dark:text-slate-500 text-center font-medium">
                            No recent emails found
                        </p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                layout
                            >
                                <div
                                    className="p-4 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 rounded-xl cursor-pointer transition-all group flex items-center justify-between shadow-sm"
                                    onClick={() => onSelectItem(item)}
                                >
                                    <div className="space-y-1 overflow-hidden">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {item.scenario}
                                        </p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-500 font-medium">
                                            {new Date(item.timestamp).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
