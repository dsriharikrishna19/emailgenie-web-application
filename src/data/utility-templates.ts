import { EmailTemplate } from "./template-types";

export const UTILITY_TEMPLATES: EmailTemplate[] = [
    {
        id: "out-of-office",
        title: "Out of Office",
        description: "Professional auto-reply for when you're unavailable.",
        category: "Utility",
        tone: "Professional",
        tags: ["ooo", "auto-reply", "unavailable"],
        subject: "Out of Office: Back on {{returnDate}}",
        body: `Hi there,

Thank you for your email. I'm currently out of office from {{startDate}} to {{returnDate}} and will have limited access to email.

I'll respond to your message as soon as I'm back. If your matter is urgent, please reach out to {{alternateName}} at {{alternateEmail}} — they'll be happy to help.

Thanks for your patience!`,
        variables: [
            { key: "startDate", label: "Out From", placeholder: "1 March 2026", required: true },
            { key: "returnDate", label: "Return Date", placeholder: "10 March 2026", required: true },
            { key: "alternateName", label: "Alternate Contact Name", placeholder: "Preeti Verma", required: true },
            { key: "alternateEmail", label: "Alternate Contact Email", placeholder: "preeti@company.com", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Arun Krishnan", required: true },
        ],
        popularity: 75,
        createdAt: "2026-02-27",
    },
    {
        id: "meeting-request",
        title: "Meeting Request",
        description: "Request a meeting with a colleague, manager, or client.",
        category: "Utility",
        tone: "Semi-Formal",
        tags: ["meeting", "schedule", "calendar"],
        subject: "Meeting Request — {{meetingTopic}}",
        body: `Hi {{recipientName}},

I'd like to schedule a meeting to discuss {{meetingTopic}}. I think a focused conversation would help us move faster on this.

Here are a few slots that work on my end:
- {{slot1}}
- {{slot2}}
- {{slot3}}

The meeting should take about {{duration}}. I'll share a proper agenda beforehand so we can make the most of our time.

Please let me know which works best, or feel free to suggest an alternative.`,
        variables: [
            { key: "recipientName", label: "Recipient Name", placeholder: "Kavya", required: true },
            { key: "meetingTopic", label: "Meeting Topic", placeholder: "Q1 sprint planning and resource allocation", required: true },
            { key: "slot1", label: "Time Slot 1", placeholder: "Mon, 3 Mar at 10 AM", required: true },
            { key: "slot2", label: "Time Slot 2", placeholder: "Tue, 4 Mar at 2 PM", required: true },
            { key: "slot3", label: "Time Slot 3", placeholder: "Wed, 5 Mar at 11 AM", required: false },
            { key: "duration", label: "Expected Duration", placeholder: "45 minutes", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Rishab", required: true },
        ],
        popularity: 81,
        createdAt: "2026-02-27",
    },
    {
        id: "referral-request",
        title: "Referral Request",
        description: "Ask a happy customer or colleague for a referral.",
        category: "Utility",
        tone: "Friendly",
        tags: ["referral", "word of mouth", "recommendation"],
        subject: "A small favour — could you refer us to {{targetPerson}}?",
        body: `Hi {{recipientName}},

I hope you're doing well! I wanted to reach out with a small ask.

We're currently looking to connect with {{targetAudience}}, and I immediately thought of you — specifically, {{targetPerson}} at {{targetCompany}} who you're connected with.

If you've had a positive experience with {{productOrService}} and feel comfortable making an intro, it would mean a lot to us. Even a quick email or LinkedIn message from you would go a long way.

Of course, no pressure at all — I completely understand if it's not the right time. Either way, I appreciate your continued support.`,
        variables: [
            { key: "recipientName", label: "Recipient Name", placeholder: "Amitabh", required: true },
            { key: "targetPerson", label: "Person to Be Referred To", placeholder: "Sneha Kapoor", required: true },
            { key: "targetCompany", label: "Their Company", placeholder: "FutureTech Solutions", required: true },
            { key: "targetAudience", label: "Ideal Customer Profile", placeholder: "growing SaaS companies looking to automate their compliance workflows", required: true },
            { key: "productOrService", label: "Your Product/Service", placeholder: "CompliAI", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Deepak", required: true },
        ],
        popularity: 68,
        createdAt: "2026-02-27",
    },
];
