"use client";

import { Select } from "./ui/Select";

export const scenarios = [
    "Job Application",
    "Client Proposal",
    "Follow Up",
    "Resignation",
    "Complaint",
    "Meeting Request",
    "Cold Outreach",
    "Apology",
    "Internship Request",
    "Custom Scenario",
] as const;

export type ScenarioType = (typeof scenarios)[number];

interface ScenarioSelectorProps {
    value: string;
    onChange: (value: ScenarioType) => void;
}

export function ScenarioSelector({ value, onChange }: ScenarioSelectorProps) {
    return (
        <Select
            label="Scenario Type"
            value={value}
            onChange={(e) => onChange(e.target.value as ScenarioType)}
            options={scenarios}
        />
    );
}
