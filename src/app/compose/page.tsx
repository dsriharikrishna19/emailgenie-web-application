"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EmailForm } from "@/components/EmailForm";
import { EmailEditor } from "@/components/EmailEditor";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/Button";
import { Sparkles, FileText, RefreshCw } from "lucide-react";

interface EmailResult {
    subject: string;
    body: string;
    signature: string;
}

/** Strip HTML to plain text */
function htmlToPlain(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<\/li>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
        .trim();
}

export default function ComposePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<EmailResult | null>(null);
    const [editedBody, setEditedBody] = useState("");
    const [lastPayload, setLastPayload] = useState<Record<string, string> | null>(null);

    const generateEmail = async (payload: Record<string, string>) => {
        setIsLoading(true);
        setLastPayload(payload);
        try {
            const res = await fetch("/api/generate-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data);
            setEditedBody(data.body);
        } catch {
            alert("Failed to generate email. Please check your API key.");
        } finally {
            setIsLoading(false);
        }
    };

    const plainBody = htmlToPlain(editedBody);
    const plainSig = result ? htmlToPlain(result.signature) : "";
    const exportText = result ? `Subject: ${result.subject}\n\n${plainBody}\n\n${plainSig}` : "";

    const downloadTxt = () => {
        const el = document.createElement("a");
        el.href = URL.createObjectURL(new Blob([exportText], { type: "text/plain" }));
        el.download = "email.txt";
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    };

    return (
        <div className="h-screen flex flex-col bg-slate-50 dark:bg-[radial-gradient(ellipse_at_top_right,_#0f172a_0%,_#020617_50%,_#000000_100%)] text-slate-900 dark:text-slate-200 overflow-hidden">

            {/* ── Top bar ── */}
            <header className="shrink-0 border-b border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <div className="px-8 md:px-12 h-14 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0">
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">AI Email Composer</span>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        {result && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => lastPayload && generateEmail(lastPayload)}
                                    className="gap-1.5 text-slate-500"
                                >
                                    <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                                </Button>
                                <Button variant="outline" size="sm" onClick={downloadTxt} className="gap-1.5 hidden sm:flex">
                                    <FileText className="h-3.5 w-3.5" /> Export
                                </Button>
                                <CopyButton text={exportText} />
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* ── Split pane ── */}
            <div className="flex-1 flex overflow-hidden px-4">

                {/* Left — Form sidebar */}
                <aside className="w-80 lg:w-96 shrink-0 border-r border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-900/30 overflow-y-auto px-8 py-4">
                    <EmailForm onGenerate={generateEmail} isLoading={isLoading} compact />
                </aside>

                {/* Right — Editor pane */}
                <main className="flex-1 flex flex-col overflow-hidden">

                    {/* Subject bar */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="shrink-0 border-b border-slate-200 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] px-8 md:px-12 py-3 flex items-center gap-3"
                            >
                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] shrink-0">Subject</span>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{result.subject}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex-1 overflow-hidden px-8 md:px-12 py-4 flex flex-col gap-4">
                        {result ? (
                            <>
                                <div className="flex items-center justify-between shrink-0">
                                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">Email Body</span>
                                    <span className="text-[10px] text-slate-400 italic">Editable — click to modify</span>
                                </div>

                                {/* Editor fills remaining space */}
                                <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
                                    <EmailEditor
                                        key={result.body}
                                        content={editedBody}
                                        onChange={setEditedBody}
                                        className="h-full border-none rounded-xl"
                                    />
                                </div>

                                {/* Signature */}
                                <AnimatePresence>
                                    {result.signature && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="shrink-0 px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-3"
                                        >
                                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] shrink-0 mt-0.5">Signature</span>
                                            <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: result.signature }} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : (
                            /* Placeholder skeleton empty state */
                            <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-1">
                                <div className="flex items-center gap-3 shrink-0 opacity-40">
                                    <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <Sparkles className="h-3 w-3 text-blue-500" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Editor Preview</span>
                                    <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/10 p-8 space-y-10 pointer-events-none select-none relative overflow-hidden group"
                                >
                                    {/* Subject Skeleton with Shimmer */}
                                    <div className="space-y-4 relative">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-12 bg-blue-500/30 rounded-full animate-pulse" />
                                            <div className="h-px flex-1 bg-slate-100 dark:bg-white/5" />
                                        </div>
                                        <div className="h-6 w-2/3 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse" />
                                    </div>

                                    {/* Mock Editor Toolbar Shell */}
                                    <div className="flex flex-wrap gap-2 px-3 py-2.5 rounded-xl bg-slate-100/50 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/5 opacity-40">
                                        {[1, 2, 3, 4, 5, 1, 2, 3].map((i, idx) => (
                                            <div key={idx} className="h-5 w-5 rounded bg-slate-200 dark:bg-white/10 animate-pulse" style={{ animationDelay: `${idx * 100}ms` }} />
                                        ))}
                                    </div>

                                    {/* Body Skeleton with varying lengths */}
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <div className="h-2.5 w-1/5 bg-slate-200 dark:bg-white/10 rounded-full animate-pulse" />
                                            <div className="h-2.5 w-full bg-slate-200 dark:bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                                            <div className="h-2.5 w-11/12 bg-slate-200 dark:bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                                            <div className="h-2.5 w-4/5 bg-slate-200 dark:bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="h-2.5 w-full bg-slate-200 dark:bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
                                            <div className="h-2.5 w-5/6 bg-slate-200 dark:bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '750ms' }} />
                                        </div>

                                        <div className="pt-6 space-y-3 opacity-60">
                                            <div className="h-2 w-8 bg-slate-300 dark:bg-white/20 rounded-full animate-pulse" />
                                            <div className="h-4 w-1/4 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse" />
                                            <div className="h-3 w-1/3 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse" style={{ opacity: 0.5 }} />
                                        </div>
                                    </div>

                                    {/* Glassmorphism Badge */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[1px] bg-slate-50/20 dark:bg-[#020617]/20">
                                        <motion.div
                                            initial={{ y: 5 }}
                                            animate={{ y: 0 }}
                                            className="px-6 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-2xl shadow-blue-500/10 text-center space-y-2 translate-y-8"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                                                <Sparkles className="h-4 w-4 text-blue-500" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Ready to Generate</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400">Your AI-crafted email will appear here</p>
                                        </motion.div>
                                    </div>

                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 dark:via-white/[0.02] to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                                </motion.div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
