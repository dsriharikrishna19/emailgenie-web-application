"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScenarioSelector, type ScenarioType } from "./ScenarioSelector";
import { ToneSelector, type ToneType } from "./ToneSelector";
import { Loader2, Send } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Card, CardContent } from "./ui/Card";

interface EmailFormProps {
    initialData?: {
        scenario?: string;
        context?: string;
    };
    onGenerate: (data: {
        scenario: string;
        tone: string;
        recipient: string;
        sender: string;
        company: string;
        context: string;
    }) => void;
    isLoading: boolean;
    /** When true, renders without Card wrapper (for use in sidebars) */
    compact?: boolean;
}

export function EmailForm({ onGenerate, isLoading, initialData, compact }: EmailFormProps) {
    const [scenario, setScenario] = useState<ScenarioType>((initialData?.scenario as ScenarioType) || "Job Application");
    const [tone, setTone] = useState<ToneType>("Professional");
    const [customTone, setCustomTone] = useState("");
    const [recipient, setRecipient] = useState("");
    const [sender, setSender] = useState("");
    const [company, setCompany] = useState("");
    const [context, setContext] = useState(initialData?.context || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate({
            scenario,
            tone: tone === "Custom AI" ? customTone : tone,
            recipient,
            sender,
            company,
            context,
        });
    };

    const formContent = (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScenarioSelector value={scenario} onChange={setScenario} />
                <ToneSelector
                    value={tone}
                    onChange={setTone}
                    customInstruction={customTone}
                    onCustomInstructionChange={setCustomTone}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Recipient Name"
                    required
                    placeholder="e.g. John Doe"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <Input
                    label="Sender Name"
                    required
                    placeholder="Your Name"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                />
            </div>

            <Input
                label="Company Name (Optional)"
                placeholder="Google, Microsoft, etc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <Textarea
                label="Key Points / Context"
                required
                placeholder="Describe the context, key points to include, or any specific details..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
            />

            <Button
                type="submit"
                isLoading={isLoading}
                className="w-full h-12 text-lg"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Send className="h-5 w-5" />
                        Generate Email
                    </>
                )}
            </Button>
        </form>
    );

    if (compact) return formContent;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-3xl mx-auto"
        >
            <Card>
                <CardContent>
                    {formContent}
                </CardContent>
            </Card>
        </motion.div>
    );
}
