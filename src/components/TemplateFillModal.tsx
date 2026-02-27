"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Loader2 } from "lucide-react";
import { EmailTemplate } from "@/data/templates";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface TemplateFillModalProps {
    template: EmailTemplate | null;
    isLoading: boolean;
    onClose: () => void;
    onGenerate: (payload: Record<string, string>) => void;
}

export function TemplateFillModal({ template, isLoading, onClose, onGenerate }: TemplateFillModalProps) {
    const [values, setValues] = React.useState<Record<string, string>>({});

    // Reset form values when template changes
    React.useEffect(() => {
        if (template) {
            const initial: Record<string, string> = {};
            template.variables.forEach(v => { initial[v.key] = ""; });
            setValues(initial);
        }
    }, [template]);

    if (!template) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Replace all {{variable}} tokens in the subject and body
        let subject = template.subject;
        let body = template.body;
        Object.entries(values).forEach(([key, val]) => {
            const token = new RegExp(`\\{\\{${key}\\}\\}`, "g");
            subject = subject.replace(token, val || `[${key}]`);
            body = body.replace(token, val || `[${key}]`);
        });
        onGenerate({
            scenario: template.title,
            tone: template.tone,
            context: `Template: ${template.title}\n\nPre-filled Subject: ${subject}\n\nPre-filled Draft:\n${body}\n\nPlease enhance this email to be polished and professional while keeping the same tone (${template.tone}).`,
        });
    };

    return (
        <AnimatePresence>
            {template && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div
                            className="pointer-events-auto w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 dark:border-white/10">
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                            {template.category}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            {template.tone}
                                        </span>
                                    </div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{template.title}</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{template.description}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="px-8 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Fill in the details below. AI will use these to craft a polished email.
                                    </p>
                                    {template.variables.map((variable) => (
                                        <Input
                                            key={variable.key}
                                            label={variable.label + (variable.required ? " *" : " (optional)")}
                                            placeholder={variable.placeholder}
                                            value={values[variable.key] || ""}
                                            onChange={(e) =>
                                                setValues((prev) => ({ ...prev, [variable.key]: e.target.value }))
                                            }
                                            required={variable.required}
                                        />
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="px-8 py-4 border-t border-slate-100 dark:border-white/10 flex justify-end gap-3">
                                    <Button type="button" variant="secondary" size="sm" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="sm"
                                        isLoading={isLoading}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 min-w-[140px]"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="h-4 w-4" />
                                                Enhance with AI
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
