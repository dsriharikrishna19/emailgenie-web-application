import { EmailTemplate } from "./template-types";

export const PERSONAL_TEMPLATES: EmailTemplate[] = [
    {
        id: "thank-you-personal",
        title: "Thank You Note",
        description: "Send a heartfelt thank you to someone who helped you.",
        category: "Personal",
        tone: "Friendly",
        tags: ["thank you", "gratitude", "personal"],
        subject: "Thank you, {{recipientName}} — really.",
        body: `Hi {{recipientName}},

I've been meaning to reach out and properly thank you for {{whatTheyDid}}. It meant more than you might realize.

{{personalImpact}}

I'm genuinely lucky to have people like you in my corner. I hope I get the chance to return the favour someday.

Wishing you all the best with {{theirCurrentThing}}.`,
        variables: [
            { key: "recipientName", label: "Recipient Name", placeholder: "Uncle Suresh", required: true },
            { key: "whatTheyDid", label: "What They Did", placeholder: "connecting me with Priya at the startup — it led to a job offer", required: true },
            { key: "personalImpact", label: "Personal Impact", placeholder: "I've been searching for the right opportunity for months, and this feels like it. Starting next month!", required: false },
            { key: "theirCurrentThing", label: "Something Going On for Them", placeholder: "the new business venture", required: false },
            { key: "yourName", label: "Your Name", placeholder: "Rohit", required: true },
        ],
        popularity: 72,
        createdAt: "2026-02-27",
    },
    {
        id: "event-invitation",
        title: "Event Invitation",
        description: "Invite someone to an event, meetup, or gathering.",
        category: "Personal",
        tone: "Friendly",
        tags: ["invitation", "event", "meetup"],
        subject: "You're invited — {{eventName}}!",
        body: `Hi {{recipientName}},

I'd love for you to join us for {{eventName}}!

📅 Date: {{eventDate}}
📍 Venue: {{eventVenue}}
⏰ Time: {{eventTime}}

{{eventDetails}}

Your presence would make it extra special. Please let me know by {{rsvpDeadline}} so I can plan accordingly. Feel free to bring {{plusOneNote}}.

Hope to see you there!`,
        variables: [
            { key: "recipientName", label: "Recipient Name", placeholder: "Ananya", required: true },
            { key: "eventName", label: "Event Name", placeholder: "Housewarming Celebration", required: true },
            { key: "eventDate", label: "Date", placeholder: "Saturday, 15 March 2026", required: true },
            { key: "eventVenue", label: "Venue", placeholder: "42, Koramangala 5th Block, Bangalore", required: true },
            { key: "eventTime", label: "Time", placeholder: "6:00 PM onwards", required: true },
            { key: "eventDetails", label: "Extra Details", placeholder: "It'll be a small gathering — good food, good people. Dress casual!", required: false },
            { key: "rsvpDeadline", label: "RSVP Deadline", placeholder: "10th March", required: false },
            { key: "plusOneNote", label: "Plus One Note", placeholder: "a plus one if you'd like", required: false },
            { key: "yourName", label: "Your Name", placeholder: "Madhav", required: true },
        ],
        popularity: 70,
        createdAt: "2026-02-27",
    },
];
