"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TemplateGallery } from "@/components/TemplateGallery";
import { TemplateFillModal } from "@/components/TemplateFillModal";
import { GeneratedEmailCard } from "@/components/GeneratedEmailCard";
import { EmailTemplate } from "@/data/templates";
import { Sparkles, Mail } from "lucide-react";

interface EmailResult {
  subject: string;
  body: string;
  signature: string;
}

export default function TemplatesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmailResult | null>(null);
  const [lastPayload, setLastPayload] = useState<Record<string, string> | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

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
      setSelectedTemplate(null);
      setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 200);
    } catch (error) {
      console.error(error);
      alert("Failed to generate email. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[radial-gradient(ellipse_at_top_right,_#0f172a_0%,_#020617_50%,_#000000_100%)] text-slate-900 dark:text-slate-200 transition-colors duration-300">
      <TemplateFillModal
        template={selectedTemplate}
        isLoading={isLoading}
        onClose={() => setSelectedTemplate(null)}
        onGenerate={generateEmail}
      />

      {/* Hero */}
      <section className="px-8 md:px-12 pt-8 pb-8 border-b border-slate-200 dark:border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
            <Mail className="h-3 w-3" />
            Template Library
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
            Ready-to-use{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
              Email Templates
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Use a template instantly in the editor, or let AI enhance it for you.
          </p>
        </motion.div>
      </section>

      {/* Template Gallery */}
      <section className="px-8 md:px-12 py-4">
        <TemplateGallery
          onEnhance={(t) => setSelectedTemplate(t)}
        />
      </section>

      {/* Generated / Loaded Result */}
      <section className="px-8 md:px-12 py-4">
        <AnimatePresence>
          {result && (
            <GeneratedEmailCard
              email={result}
              onRegenerate={() => lastPayload && generateEmail(lastPayload)}
            />
          )}
        </AnimatePresence>
      </section>

      <footer className="border-t border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/20 py-8">
        <div className="px-8 md:px-12 flex items-center justify-between text-slate-400 text-sm">
          <span>© 2026 EmailGenie AI</span>
          <div className="flex items-center gap-1 text-xs">
            <Sparkles className="h-3 w-3 text-blue-500" />
            Powered by GPT-4o
          </div>
        </div>
      </footer>
    </div>
  );
}
