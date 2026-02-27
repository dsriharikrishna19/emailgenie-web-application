"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EMAIL_TEMPLATES } from "@/data/templates";
import { EmailEditor } from "@/components/EmailEditor";
import { CopyButton } from "@/components/CopyButton";
import { Button } from "@/components/ui/Button";
import { Sparkles, FileText, ArrowLeft, Loader2 } from "lucide-react";

/** Convert plain-text template body to HTML paragraphs */
function textToHtml(text: string): string {
    return text
        .split(/\n\n+/)
        .map(para => `<p>${para.split("\n").join("<br>")}</p>`)
        .join("\n");
}

/** Strip HTML to plain text for copy/export */
function htmlToPlain(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<\/li>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
        .trim();
}

export default function EditorPage() {
    const params = useSearchParams();
    const router = useRouter();
    const id = params.get("id");

    const template = useMemo(() => EMAIL_TEMPLATES.find(t => t.id === id) ?? null, [id]);

    const [body, setBody] = useState(() => template ? textToHtml(template.body) : "<p></p>");
    const [subject, setSubject] = useState(template?.subject ?? "");
    const [isLoading, setIsLoading] = useState(false);
    const [aiSignature, setAiSignature] = useState<string | null>(null);

    if (!template) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
                <div className="text-center space-y-4">
                    <p className="text-slate-500">Template not found.</p>
                    <Button variant="secondary" onClick={() => router.push("/")}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Templates
                    </Button>
                </div>
            </div>
        );
    }

    const plainBody = htmlToPlain(body);
    const exportText = `Subject: ${subject}\n\n${plainBody}`;

    const downloadTxt = () => {
        const el = document.createElement("a");
        el.href = URL.createObjectURL(new Blob([exportText], { type: "text/plain" }));
        el.download = "email.txt";
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    };

    const enhanceWithAI = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/generate-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    scenario: template.title,
                    tone: template.tone,
                    context: `Template: ${template.title}\n\nCurrent draft:\n${plainBody}\n\nPlease enhance this email to be polished and professional while keeping the same tone (${template.tone}).`,
                }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setBody(data.body);
            setSubject(data.subject);
            if (data.signature) setAiSignature(data.signature);
        } catch {
            alert("AI enhancement failed. Check your API key.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-slate-50 dark:bg-[radial-gradient(ellipse_at_top_right,_#0f172a_0%,_#020617_50%,_#000000_100%)] text-slate-900 dark:text-slate-200 overflow-hidden">

            {/* ── Top bar ── */}
            <header className="shrink-0 border-b border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <div className="px-8 md:px-12 h-14 flex items-center gap-4">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors shrink-0"
                    >
                        <ArrowLeft className="h-4 w-4" /> Templates
                    </button>

                    <div className="h-4 w-px bg-slate-200 dark:bg-white/10 shrink-0" />

                    <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            {template.category}
                        </span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[240px]">
                            {template.title}
                        </span>
                    </div>

                    {/* Right actions */}
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={downloadTxt} className="gap-1.5 hidden sm:flex">
                            <FileText className="h-3.5 w-3.5" /> Export
                        </Button>
                        <CopyButton text={exportText} />
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={enhanceWithAI}
                            isLoading={isLoading}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-none shadow-md shadow-blue-500/20 gap-1.5"
                        >
                            {isLoading ? (
                                <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Enhancing…</>
                            ) : (
                                <><Sparkles className="h-3.5 w-3.5" /> Enhance with AI</>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            {/* ── Subject line bar ── */}
            <div className="shrink-0 border-b border-slate-200 dark:border-white/5 bg-white/40 dark:bg-white/[0.02]">
                <div className="px-8 md:px-12 py-3 flex items-center gap-3">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] shrink-0">
                        Subject
                    </span>
                    <input
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="flex-1 text-sm font-medium bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                        placeholder="Email subject..."
                    />
                </div>
            </div>

            {/* ── Editor — fills remaining height ── */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col px-8 md:px-12 py-4 gap-4">
                    <div className="flex items-center justify-between shrink-0">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                            Email Body
                        </span>
                        <span className="text-[10px] text-slate-400 italic">
                            Click to edit · Replace <span className="font-mono not-italic">{"{{variables}}"}</span> with your info
                        </span>
                    </div>

                    {/* EmailEditor stretched to fill */}
                    <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
                        <EmailEditor
                            key={template.id}
                            content={body}
                            onChange={setBody}
                            className="h-full border-none rounded-xl"
                        />
                    </div>

                    {/* AI Signature */}
                    <AnimatePresence>
                        {aiSignature && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="shrink-0 px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-3"
                            >
                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] shrink-0 mt-0.5">
                                    Signature
                                </span>
                                <div
                                    className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: aiSignature }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
