import { EmailTemplate } from "./template-types";

export const SALES_TEMPLATES: EmailTemplate[] = [
    {
        id: "cold-outreach",
        title: "Cold Sales Outreach",
        description: "Reach out to a potential customer for the first time.",
        category: "Sales",
        tone: "Persuasive",
        tags: ["cold email", "outreach", "lead gen", "sales"],
        subject: "Quick idea for {{companyName}}",
        body: `Hi {{recipientName}},

I noticed that {{companyName}} {{painPoint}}. We've helped companies like {{similarClient}} solve exactly this — {{solutionResult}}.

I'm not here to pitch you a long demo. I just think a 15-minute call could be worth your time. If what I share isn't relevant, I'll say so myself.

Would {{proposedTime}} work for a quick chat?`,
        variables: [
            { key: "recipientName", label: "Recipient Name", placeholder: "Akash Patel", required: true },
            { key: "companyName", label: "Their Company", placeholder: "TechStack India", required: true },
            { key: "painPoint", label: "Their Likely Pain Point", placeholder: "is scaling its customer support team rapidly", required: true },
            { key: "similarClient", label: "Similar Client Example", placeholder: "Freshworks and Chargebee", required: false },
            { key: "solutionResult", label: "What Your Solution Achieved", placeholder: "reducing ticket resolution time by 40% with AI triage", required: true },
            { key: "proposedTime", label: "Proposed Time", placeholder: "Thursday at 11 AM or Friday at 2 PM", required: false },
            { key: "yourName", label: "Your Name", placeholder: "Siddharth Jain", required: true },
        ],
        popularity: 89,
        createdAt: "2026-02-27",
    },
    {
        id: "demo-followup",
        title: "Post-Demo Follow-up",
        description: "Follow up after a product demo to push towards a decision.",
        category: "Sales",
        tone: "Confident",
        tags: ["sales", "demo", "follow-up", "SaaS"],
        subject: "Following up on our {{productName}} demo",
        body: `Hi {{recipientName}},

Thank you for joining the demo today — it was great to see how excited your team got about {{featureHighlight}}.

Based on your use case around {{clientUseCase}}, I'm confident {{productName}} can deliver {{expectedOutcome}} for {{companyName}}.

Here's what I'd suggest as next steps:
1. I'll send over a tailored pricing proposal by {{deadline}}
2. You share it with your team and get internal buy-in
3. We do a short Q&A call before you decide

No pressure — but I do want to make sure you have everything you need to move forward confidently. What questions can I answer right now?`,
        variables: [
            { key: "recipientName", label: "Recipient Name", placeholder: "Pooja Verma", required: true },
            { key: "companyName", label: "Their Company", placeholder: "ZenRecruits", required: true },
            { key: "productName", label: "Your Product Name", placeholder: "HireFlow", required: true },
            { key: "featureHighlight", label: "Feature They Loved", placeholder: "the automated interview scheduling feature", required: false },
            { key: "clientUseCase", label: "Their Use Case", placeholder: "reducing time-to-hire for engineering roles", required: true },
            { key: "expectedOutcome", label: "Expected Outcome", placeholder: "cutting hiring cycles from 45 days to under 20", required: true },
            { key: "deadline", label: "Proposal Deadline", placeholder: "EOD Friday", required: false },
            { key: "yourName", label: "Your Name", placeholder: "Aryan Shah", required: true },
        ],
        popularity: 85,
        createdAt: "2026-02-27",
    },
    {
        id: "win-back",
        title: "Win-Back Email",
        description: "Re-engage a customer who has gone quiet or churned.",
        category: "Sales",
        tone: "Friendly",
        tags: ["re-engagement", "churn", "win-back", "retention"],
        subject: "We miss you, {{customerName}} — here's something for you",
        body: `Hi {{customerName}},

It's been a while since we last heard from you, and I wanted to reach out personally.

We've made a lot of improvements to {{productName}} since you left — particularly around {{keyImprovement}}, which was something many of our users (including you, I believe) had flagged.

As a token of appreciation, we'd love to offer you {{offer}} if you'd like to give us another shot.

No hard sell — if the timing isn't right, that's completely okay. But if you're open to it, I'd love to show you what's changed. A quick 15-minute call would do it.

Either way, I hope things are going well for you and {{theirCompany}}.`,
        variables: [
            { key: "customerName", label: "Customer Name", placeholder: "Kavya", required: true },
            { key: "productName", label: "Product Name", placeholder: "Analytix Pro", required: true },
            { key: "keyImprovement", label: "Key Improvement Since They Left", placeholder: "a completely rebuilt reporting dashboard with real-time data", required: true },
            { key: "offer", label: "Offer/Incentive", placeholder: "3 months free on any annual plan", required: false },
            { key: "theirCompany", label: "Their Company", placeholder: "Greenleaf Tech", required: false },
            { key: "yourName", label: "Your Name", placeholder: "Rahul — Customer Success", required: true },
        ],
        popularity: 74,
        createdAt: "2026-02-27",
    },
];
