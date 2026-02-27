import { EmailTemplate } from "./template-types";

export const BUSINESS_TEMPLATES: EmailTemplate[] = [
    {
        id: "project-proposal",
        title: "Project Proposal",
        description: "Send a polished project proposal to a client.",
        category: "Business",
        tone: "Formal",
        tags: ["proposal", "client", "business", "pricing"],
        subject: "Proposal: {{projectName}} for {{clientName}}",
        body: `Dear {{clientName}},

Thank you for the opportunity to present this proposal. Based on our discussion, I've put together a plan for {{projectName}} that addresses your goals around {{clientGoal}}.

Here's a quick overview:
- Scope: {{scope}}
- Timeline: {{timeline}}
- Investment: {{pricing}}

I've kept the approach lean and focused on outcomes that matter most to your team. The full proposal document is attached for your review.

I'd love to walk you through it on a call — would {{proposedTime}} work for you?`,
        variables: [
            { key: "clientName", label: "Client Name", placeholder: "ABC Technologies Pvt Ltd", required: true },
            { key: "projectName", label: "Project Name", placeholder: "E-commerce Platform Redesign", required: true },
            { key: "clientGoal", label: "Client's Main Goal", placeholder: "improving conversion rates and mobile UX", required: true },
            { key: "scope", label: "Scope Summary", placeholder: "Full redesign of 6 core pages + CMS integration", required: true },
            { key: "timeline", label: "Timeline", placeholder: "6 weeks", required: true },
            { key: "pricing", label: "Pricing", placeholder: "₹1,20,000 fixed price", required: true },
            { key: "proposedTime", label: "Proposed Meeting Time", placeholder: "Thursday at 3 PM IST", required: false },
            { key: "yourName", label: "Your Name", placeholder: "Vikash Sharma", required: true },
        ],
        popularity: 93,
        createdAt: "2026-02-27",
    },
    {
        id: "partnership-request",
        title: "Partnership Proposal",
        description: "Propose a business collaboration or partnership.",
        category: "Business",
        tone: "Confident",
        tags: ["partnership", "collaboration", "B2B"],
        subject: "Partnership Opportunity — {{yourCompany}} × {{theirCompany}}",
        body: `Dear {{recipientName}},

I'm reaching out because I believe there's a compelling opportunity for {{yourCompany}} and {{theirCompany}} to work together.

We {{yourValueProp}}, and your expertise in {{theirStrength}} would complement this perfectly. Together, we could {{mutualBenefit}}.

I've seen how {{theirCompany}} operates and I'm genuinely excited about what we could build. I'd love to share more details — would you have 30 minutes for an intro call this week or next?`,
        variables: [
            { key: "recipientName", label: "Recipient Name", placeholder: "Sanjay Mehta", required: true },
            { key: "yourCompany", label: "Your Company", placeholder: "LearnFlow AI", required: true },
            { key: "theirCompany", label: "Their Company", placeholder: "EdTech Ventures", required: true },
            { key: "yourValueProp", label: "Your Value Proposition", placeholder: "build adaptive learning tools for corporate training teams", required: true },
            { key: "theirStrength", label: "Their Strength", placeholder: "enterprise distribution and sales networks", required: true },
            { key: "mutualBenefit", label: "Mutual Benefit", placeholder: "bring AI-powered L&D solutions to 500+ enterprises in India", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Nisha Patel", required: true },
        ],
        popularity: 78,
        createdAt: "2026-02-27",
    },
    {
        id: "payment-reminder",
        title: "Payment Reminder",
        description: "Politely follow up on an overdue invoice.",
        category: "Business",
        tone: "Semi-Formal",
        tags: ["invoice", "payment", "finance", "reminder"],
        subject: "Friendly Reminder: Invoice #{{invoiceNumber}} Due",
        body: `Hi {{clientName}},

I hope things are going well on your end. I wanted to send a quick and friendly reminder that Invoice #{{invoiceNumber}} for {{invoiceAmount}}, issued on {{invoiceDate}}, is now {{daysOverdue}} days past due.

If payment has already been processed, please disregard this message — and thank you! If not, I'd appreciate it if you could arrange the transfer at your earliest convenience. You'll find the payment details in the attached invoice.

If there's anything on your end causing a delay, please do reach out — I'm happy to work something out.`,
        variables: [
            { key: "clientName", label: "Client Name", placeholder: "Rohan Gupta", required: true },
            { key: "invoiceNumber", label: "Invoice Number", placeholder: "INV-2026-047", required: true },
            { key: "invoiceAmount", label: "Invoice Amount", placeholder: "₹45,000", required: true },
            { key: "invoiceDate", label: "Invoice Date", placeholder: "1 February 2026", required: true },
            { key: "daysOverdue", label: "Days Overdue", placeholder: "14", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Deepika Rao", required: true },
        ],
        popularity: 86,
        createdAt: "2026-02-27",
    },
];
