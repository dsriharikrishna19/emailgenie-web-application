"use client";

import { Select } from "./ui/Select";
import { Input } from "./ui/Input";

export const tones = [
    "Professional",
    "Formal",
    "Basic (Simple & Direct)",
    "Custom AI",
] as const;

export type ToneType = (typeof tones)[number];

interface ToneSelectorProps {
    value: string;
    onChange: (value: ToneType) => void;
    customInstruction: string;
    onCustomInstructionChange: (value: string) => void;
}

export function ToneSelector({
    value,
    onChange,
    customInstruction,
    onCustomInstructionChange,
}: ToneSelectorProps) {
    return (
        <div className="flex flex-col gap-2">
            <Select
                label="Email Tone"
                value={value}
                onChange={(e) => onChange(e.target.value as ToneType)}
                options={tones}
            />
            {value === "Custom AI" && (
                <div className="mt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <Input
                        label="Custom Instruction"
                        placeholder="e.g. Write it like a excited startup founder"
                        value={customInstruction}
                        onChange={(e) => onCustomInstructionChange(e.target.value)}
                        className="h-10 text-sm"
                    />
                </div>
            )}
        </div>
    );
}
