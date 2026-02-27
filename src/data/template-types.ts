export type EmailCategory =
    | "Career"
    | "Professional"
    | "Business"
    | "Utility"
    | "Personal"
    | "Sales"
    | "Support";

export type EmailTone =
    | "Formal"
    | "Semi-Formal"
    | "Casual"
    | "Friendly"
    | "Confident"
    | "Persuasive"
    | "Professional";

export interface EmailVariable {
    key: string;
    label: string;
    placeholder: string;
    required: boolean;
}

export interface EmailTemplate {
    id: string;
    title: string;
    description: string;
    category: EmailCategory;
    tone: EmailTone;
    tags: string[];
    subject: string;
    body: string;
    htmlBody?: string;
    variables: EmailVariable[];
    isPremium?: boolean;
    popularity?: number;
    createdAt: string;
}
