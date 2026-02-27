"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CopyButton } from "./CopyButton";
import { FileText, RefreshCw } from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/Card";
import { EmailEditor } from "./EmailEditor";

interface GeneratedEmailCardProps {
    email: {
        subject: string;
        body: string;
        signature: string;
    };
    onRegenerate: () => void;
}

/** Strip HTML tags to get plain text for clipboard / download */
function htmlToPlainText(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<\/li>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")
        .trim();
}

export function GeneratedEmailCard({ email, onRegenerate }: GeneratedEmailCardProps) {
    const [editedBody, setEditedBody] = useState(email.body);

    const plainBody = htmlToPlainText(editedBody);
    const plainSignature = htmlToPlainText(email.signature);
    const fullEmailText = `Subject: ${email.subject}\n\n${plainBody}\n\n${plainSignature}`;

    const downloadTxt = () => {
        const element = document.createElement("a");
        const file = new Blob([fullEmailText], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "email.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-3xl mx-auto"
        >
            <Card>
                <CardHeader className="flex items-center justify-between flex-row">
                    <CardTitle>Generated Email</CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onRegenerate}
                        className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"
                    >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Regenerate
                    </Button>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Subject */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                            Subject Line
                        </span>
                        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            {email.subject}
                        </p>
                    </div>

                    {/* Editable body with toolbar */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                                Email Content
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                                Editable — click to modify
                            </span>
                        </div>
                        <EmailEditor
                            key={email.body}
                            content={editedBody}
                            onChange={setEditedBody}
                        />
                    </div>

                    {/* Signature — rendered as HTML */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                            Signature
                        </span>
                        <div
                            className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-1"
                            dangerouslySetInnerHTML={{ __html: email.signature }}
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadTxt}
                        className="flex items-center gap-2"
                    >
                        <FileText className="h-4 w-4" />
                        Export as .txt
                    </Button>
                    <CopyButton text={fullEmailText} />
                </CardFooter>
            </Card>
        </motion.div>
    );
}
