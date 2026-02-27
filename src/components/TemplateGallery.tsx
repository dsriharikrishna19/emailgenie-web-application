"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { EMAIL_TEMPLATES, EmailTemplate } from "@/data/templates";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileEdit, Sparkles } from "lucide-react";
import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";

interface TemplateGalleryProps {
    onEnhance: (template: EmailTemplate) => void;
}

export function TemplateGallery({ onEnhance }: TemplateGalleryProps) {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState<string>("Career");
    const [usedId, setUsedId] = useState<string | null>(null);

    const categories = ["All", ...Array.from(new Set(EMAIL_TEMPLATES.map(t => t.category)))];

    const filteredTemplates = activeCategory === "All"
        ? EMAIL_TEMPLATES
        : EMAIL_TEMPLATES.filter(t => t.category === activeCategory);

    const handleUse = (template: EmailTemplate) => {
        setUsedId(template.id);
        router.push(`/editor?id=${template.id}`);
    };

    return (
        <div className="space-y-8">
            <Tabs
                tabs={categories.map(cat => ({ id: cat, label: cat }))}
                activeTab={activeCategory}
                onChange={setActiveCategory}
                className="flex-wrap h-auto"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template, index) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        layout
                    >
                        <Card className="h-full flex flex-col bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] -mr-16 -mt-16 pointer-events-none group-hover:bg-blue-600/10 transition-colors" />

                            <CardHeader className="relative z-10">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                        {template.category}
                                    </span>
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                                        {template.tone}
                                    </span>
                                </div>
                                <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                                    {template.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 h-10">
                                    {template.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1 relative z-10">
                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 text-sm text-slate-600 dark:text-slate-400 font-mono italic group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors whitespace-pre-wrap line-clamp-6">
                                    {template.body}
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col md:flex-row gap-3 items-center justify-between relative z-10 pt-4">
                                {/* Use Template — loads directly into editor */}
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="flex-1 px-2"
                                    onClick={() => handleUse(template)}
                                >
                                    <FileEdit className="h-4 w-4 mr-2 shrink-0" />
                                    <span className="truncate">
                                        {usedId === template.id ? "Loaded ✓" : "Use Template"}
                                    </span>
                                </Button>

                                {/* Enhance — opens variable modal → AI polish */}
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="flex-[1.5] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-none shadow-lg shadow-blue-500/20 dark:shadow-blue-900/20"
                                    onClick={() => onEnhance(template)}
                                >
                                    <Sparkles className="h-4 w-4 mr-2 shrink-0" />
                                    <span className="truncate">Enhance with AI</span>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
