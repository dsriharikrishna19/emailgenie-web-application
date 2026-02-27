import { EmailTemplate } from "./template-types";

export const SUPPORT_TEMPLATES: EmailTemplate[] = [
    {
        id: "apology-email",
        title: "Customer Apology",
        description: "Apologize for a service failure and rebuild trust.",
        category: "Support",
        tone: "Friendly",
        tags: ["apology", "customer", "support", "service recovery"],
        subject: "We're sorry, {{customerName}} — here's what happened",
        body: `Hi {{customerName}},

I want to personally apologize for {{issueDescription}}. This is not the experience we want for you, and I completely understand your frustration.

Here's what happened on our end: {{rootCause}}.

We've already {{remedyAction}}. Additionally, as a token of our appreciation for your patience, {{compensation}}.

We take this seriously, and we're putting measures in place to make sure it doesn't happen again. If you have any further concerns, please reply directly to this email — I'll personally make sure they're resolved.

Thank you for giving us the chance to make this right.`,
        variables: [
            { key: "customerName", label: "Customer Name", placeholder: "Nandini", required: true },
            { key: "issueDescription", label: "Issue Description", placeholder: "the 6-hour service outage you experienced on February 25th", required: true },
            { key: "rootCause", label: "Root Cause (brief)", placeholder: "a misconfigured deployment caused cascading failures in our API gateway", required: false },
            { key: "remedyAction", label: "What You've Fixed", placeholder: "restored full service and added redundancy to prevent recurrence", required: true },
            { key: "compensation", label: "Compensation Offered", placeholder: "we've applied a 30-day credit to your account", required: false },
            { key: "yourName", label: "Your Name", placeholder: "Vikram — Head of Customer Success", required: true },
        ],
        popularity: 82,
        createdAt: "2026-02-27",
    },
    {
        id: "feedback-request",
        title: "Feedback Request",
        description: "Ask a customer for a review or testimonial.",
        category: "Support",
        tone: "Friendly",
        tags: ["feedback", "review", "NPS", "testimonial"],
        subject: "Quick question for you, {{customerName}}",
        body: `Hi {{customerName}},

You've been using {{productName}} for {{duration}} now, and I wanted to check in personally.

How's it going? Is there anything that's been genuinely valuable, or anything that's felt frustrating?

If you have 2 minutes, I'd love to hear your honest thoughts — you can reply directly to this email, or leave a quick review here: {{reviewLink}}

Your feedback directly shapes what we build next. Thank you for being part of our journey.`,
        variables: [
            { key: "customerName", label: "Customer Name", placeholder: "Karan", required: true },
            { key: "productName", label: "Product Name", placeholder: "Budgetly", required: true },
            { key: "duration", label: "Time Using Product", placeholder: "3 months", required: true },
            { key: "reviewLink", label: "Review Link", placeholder: "g.page/budgetly/review", required: false },
            { key: "yourName", label: "Your Name", placeholder: "Simran — Product Team", required: true },
        ],
        popularity: 76,
        createdAt: "2026-02-27",
    },
    {
        id: "issue-resolution",
        title: "Issue Resolution Notice",
        description: "Notify a customer that their reported issue has been resolved.",
        category: "Support",
        tone: "Professional",
        tags: ["support", "resolution", "ticket", "customer"],
        subject: "Update on your support request — {{ticketId}}",
        body: `Hi {{customerName}},

Great news — the issue you reported (Ticket #{{ticketId}}: {{issueTitle}}) has been resolved.

What we did: {{resolutionSummary}}.

You can resume normal usage now. If the problem persists or anything else comes up, please don't hesitate to reply to this email or open a new ticket.

We appreciate your patience while we worked on this.`,
        variables: [
            { key: "customerName", label: "Customer Name", placeholder: "Preethi", required: true },
            { key: "ticketId", label: "Ticket ID", placeholder: "TKT-20260227-883", required: true },
            { key: "issueTitle", label: "Issue Title", placeholder: "Unable to export reports to PDF", required: true },
            { key: "resolutionSummary", label: "Resolution Summary", placeholder: "Fixed a rendering bug in the PDF generator that was triggered by tables with more than 20 columns", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Latha — Support Team", required: true },
        ],
        popularity: 71,
        createdAt: "2026-02-27",
    },
];
