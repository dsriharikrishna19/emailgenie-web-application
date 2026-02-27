"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/Button";

interface CopyButtonProps {
    text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <Button
            onClick={handleCopy}
            variant={copied ? "secondary" : "primary"}
            className={`px-5 py-2.5 ${copied ? "text-green-400" : ""}`}
        >
            {copied ? (
                <>
                    <Check className="h-4 w-4" />
                    <span>Email Copied!</span>
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4" />
                    <span>Copy to Clipboard</span>
                </>
            )}
        </Button>
    );
}
