import { EmailTemplate } from "./template-types";

export const PROFESSIONAL_TEMPLATES: EmailTemplate[] = [
    {
        id: "meeting-followup",
        title: "Meeting Follow-up",
        description: "Recap a meeting and clearly define next steps.",
        category: "Professional",
        tone: "Semi-Formal",
        tags: ["meeting", "follow-up", "recap", "next steps"],
        subject: "Follow-up: {{meetingTopic}}",
        body: `Hi {{recipientName}},

Great connecting today! Here's a quick recap of what we discussed:

{{meetingSummary}}

Agreed next steps:
- {{nextStep1}}
- {{nextStep2}}

Let me know if I've missed anything or if you'd like to adjust the timeline. Happy to jump on another call if needed.`,
        variables: [
            { key: "recipientName", label: "Recipient Name", placeholder: "Priya", required: true },
            { key: "meetingTopic", label: "Meeting Topic", placeholder: "Q2 Product Roadmap Discussion", required: true },
            { key: "meetingSummary", label: "Meeting Summary", placeholder: "We aligned on prioritizing the checkout redesign and agreed to deprioritize the loyalty feature until Q3.", required: true },
            { key: "nextStep1", label: "Next Step 1", placeholder: "Priya shares updated wireframes by Friday", required: true },
            { key: "nextStep2", label: "Next Step 2", placeholder: "I'll set up a stakeholder review for next Tuesday", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Aditya", required: true },
        ],
        popularity: 92,
        createdAt: "2026-02-27",
    },
    {
        id: "introduction-email",
        title: "Professional Introduction",
        description: "Introduce yourself to a new colleague, client, or partner.",
        category: "Professional",
        tone: "Friendly",
        tags: ["introduction", "onboarding", "new role"],
        subject: "Hi from {{yourName}} — {{yourRole}}",
        body: `Hi {{recipientName}},

I wanted to reach out and introduce myself. I'm {{yourName}}, and I recently joined {{companyName}} as {{yourRole}}.

I'll be {{workingContext}} and I'm really looking forward to collaborating with you on {{topic}}.

I'd love to schedule a quick 15-minute intro call to get to know you better and understand how I can best support your work. Let me know a time that works, or book directly using {{calendarLink}}.

Looking forward to working together!`,
        variables: [
            { key: "yourName", label: "Your Name", placeholder: "Ananya Krishnan", required: true },
            { key: "yourRole", label: "Your Role", placeholder: "Head of Marketing", required: true },
            { key: "companyName", label: "Company Name", placeholder: "HealthStack", required: true },
            { key: "recipientName", label: "Recipient Name", placeholder: "Rajan", required: true },
            { key: "workingContext", label: "Working Context", placeholder: "working closely with the product team on go-to-market strategy", required: true },
            { key: "topic", label: "Collaboration Topic", placeholder: "the upcoming product launch", required: false },
            { key: "calendarLink", label: "Calendar Link", placeholder: "calendly.com/ananya", required: false },
        ],
        popularity: 80,
        createdAt: "2026-02-27",
    },
    {
        id: "status-update",
        title: "Project Status Update",
        description: "Keep stakeholders informed on project progress.",
        category: "Professional",
        tone: "Professional",
        tags: ["project", "status", "update", "stakeholders"],
        subject: "{{projectName}} — Status Update ({{period}})",
        body: `Hi {{recipientName}},

Here's a quick update on {{projectName}} for {{period}}.

✅ Completed this week:
{{completedItems}}

🔄 In progress:
{{inProgressItems}}

⚠️ Blockers / Risks:
{{blockers}}

📅 Next milestone: {{nextMilestone}} by {{milestoneDate}}

Let me know if you have any questions or concerns. Happy to jump on a call to discuss further.`,
        variables: [
            { key: "recipientName", label: "Recipient Name", placeholder: "Team / Stakeholders", required: true },
            { key: "projectName", label: "Project Name", placeholder: "Dashboard Redesign", required: true },
            { key: "period", label: "Period", placeholder: "Week of 24 Feb 2026", required: true },
            { key: "completedItems", label: "Completed Items", placeholder: "- Finalized wireframes for all 6 screens\n- Got design sign-off from product", required: true },
            { key: "inProgressItems", label: "In Progress", placeholder: "- Frontend development of the analytics tab (60% done)", required: true },
            { key: "blockers", label: "Blockers", placeholder: "Awaiting API spec from backend team — ETA Friday", required: false },
            { key: "nextMilestone", label: "Next Milestone", placeholder: "Beta build ready for QA", required: true },
            { key: "milestoneDate", label: "Milestone Date", placeholder: "5 March 2026", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Varun", required: true },
        ],
        popularity: 78,
        createdAt: "2026-02-27",
    },
];
