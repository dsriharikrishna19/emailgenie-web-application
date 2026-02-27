import { EmailTemplate } from "./template-types";

export const CAREER_TEMPLATES: EmailTemplate[] = [
    {
        id: "job-application",
        title: "Job Application",
        description: "Professional application for a job role.",
        category: "Career",
        tone: "Formal",
        tags: ["job", "application", "hiring", "career"],
        subject: "Application for {{jobTitle}} — {{yourName}}",
        body: `Dear {{hiringManagerName}},

I am writing to express my strong interest in the {{jobTitle}} position at {{companyName}}. Having spent {{yearsExperience}} years building expertise in {{yourField}}, I am confident I can deliver meaningful results from day one.

Most recently, I {{achievement}}, which gave me hands-on experience directly relevant to this role.

I would love the opportunity to discuss how my background aligns with your team's goals. I've attached my resume and portfolio for your review — please let me know a convenient time to connect.`,
        variables: [
            { key: "hiringManagerName", label: "Hiring Manager Name", placeholder: "Ms. Priya Sharma", required: true },
            { key: "jobTitle", label: "Job Title", placeholder: "Senior Frontend Developer", required: true },
            { key: "companyName", label: "Company Name", placeholder: "Zoho Corp", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Karthik Rajan", required: true },
            { key: "yearsExperience", label: "Years of Experience", placeholder: "4", required: true },
            { key: "yourField", label: "Your Field", placeholder: "React & TypeScript development", required: true },
            { key: "achievement", label: "Recent Achievement", placeholder: "led a team that shipped a 0-to-1 SaaS product in 3 months", required: false },
        ],
        popularity: 95,
        createdAt: "2026-02-27",
    },
    {
        id: "networking-request",
        title: "Networking Request",
        description: "Reach out to connect with a professional in your field.",
        category: "Career",
        tone: "Friendly",
        tags: ["networking", "career", "connection"],
        subject: "Would love to connect — {{yourName}}",
        body: `Hi {{recipientName}},

I've been following your work at {{companyName}} for a while now, and your journey in {{industryField}} is genuinely inspiring. Your approach to {{specificThing}} particularly caught my attention.

I'm currently {{yourCurrentRole}} and would love to hear your perspective on {{topic}}. Would you be open to a quick 20-minute virtual coffee sometime next week? No agenda — just a genuine conversation.

Totally understand if your schedule is packed. Either way, thank you for everything you share online.`,
        variables: [
            { key: "recipientName", label: "Recipient Name", placeholder: "Anjali Mehta", required: true },
            { key: "companyName", label: "Their Company", placeholder: "Razorpay", required: true },
            { key: "industryField", label: "Their Industry", placeholder: "fintech product design", required: true },
            { key: "specificThing", label: "Something Specific You Admire", placeholder: "how you wrote about building design systems at scale", required: false },
            { key: "yourCurrentRole", label: "Your Current Role", placeholder: "a product designer at a startup", required: true },
            { key: "topic", label: "Topic to Discuss", placeholder: "transitioning from design to product management", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Arjun Nair", required: true },
        ],
        popularity: 88,
        createdAt: "2026-02-27",
    },
    {
        id: "resignation-letter",
        title: "Resignation Letter",
        description: "Formally and gracefully resign from your current position.",
        category: "Career",
        tone: "Formal",
        tags: ["resignation", "career", "exit"],
        subject: "Resignation — {{yourName}}, {{jobTitle}}",
        body: `Dear {{managerName}},

Please accept this letter as formal notice of my resignation from my position as {{jobTitle}}, effective {{lastWorkingDate}}.

This was not an easy decision. My time at {{companyName}} has been genuinely rewarding — I've grown enormously, both professionally and personally, and I'm grateful for the trust you placed in me.

Over the next two weeks, I'm committed to ensuring a smooth handover. I'll document ongoing work, brief the team, and do whatever I can to set my successor up for success.

Thank you for your mentorship and support. I hope we stay in touch.`,
        variables: [
            { key: "managerName", label: "Manager's Name", placeholder: "Mr. Vikram Singh", required: true },
            { key: "yourName", label: "Your Name", placeholder: "Meera Iyer", required: true },
            { key: "jobTitle", label: "Your Job Title", placeholder: "Product Manager", required: true },
            { key: "companyName", label: "Company Name", placeholder: "Infosys", required: true },
            { key: "lastWorkingDate", label: "Last Working Day", placeholder: "14 March 2026", required: true },
        ],
        popularity: 90,
        createdAt: "2026-02-27",
    },
    {
        id: "interview-thankyou",
        title: "Post-Interview Thank You",
        description: "Follow up after an interview to reinforce your candidacy.",
        category: "Career",
        tone: "Semi-Formal",
        tags: ["interview", "thank-you", "follow-up"],
        subject: "Thank you — {{jobTitle}} Interview",
        body: `Hi {{interviewerName}},

Thank you for taking the time to speak with me today about the {{jobTitle}} role. I really enjoyed our conversation, especially the discussion around {{discussionHighlight}} — it confirmed how much I'd love to contribute to the team.

I came away even more excited about what {{companyName}} is building. My experience with {{relevantSkill}} feels like a natural fit for the challenges you described.

Please don't hesitate to reach out if you need anything else from my side. I look forward to hearing about the next steps.`,
        variables: [
            { key: "interviewerName", label: "Interviewer's Name", placeholder: "Divya", required: true },
            { key: "jobTitle", label: "Job Title", placeholder: "Backend Engineer", required: true },
            { key: "companyName", label: "Company Name", placeholder: "Swiggy", required: true },
            { key: "discussionHighlight", label: "Topic You Discussed", placeholder: "scaling the order management system", required: false },
            { key: "relevantSkill", label: "Your Relevant Skill", placeholder: "distributed systems and Go microservices", required: false },
            { key: "yourName", label: "Your Name", placeholder: "Rahul Desai", required: true },
        ],
        popularity: 87,
        createdAt: "2026-02-27",
    },
    {
        id: "promotion-request",
        title: "Promotion Request",
        description: "Make a confident, evidence-backed case for a promotion.",
        category: "Career",
        tone: "Confident",
        tags: ["promotion", "raise", "performance"],
        subject: "Request to Discuss My Career Growth",
        body: `Hi {{managerName}},

I'd like to schedule some time to discuss my career progression and potential for a promotion to {{targetRole}}.

Over the past {{duration}}, I've taken on responsibilities well beyond my current title. Key highlights include {{achievement1}} and {{achievement2}}. I've consistently delivered on both my goals and areas outside my formal scope.

I believe my contributions align well with what {{targetRole}} requires, and I'm ready to take on more ownership. I'd value your perspective and would love to discuss what a path forward looks like.

Would you have 30 minutes this or next week?`,
        variables: [
            { key: "managerName", label: "Manager's Name", placeholder: "Ravi Kumar", required: true },
            { key: "targetRole", label: "Target Role/Title", placeholder: "Senior Software Engineer", required: true },
            { key: "duration", label: "Time in Current Role", placeholder: "18 months", required: true },
            { key: "achievement1", label: "Achievement 1", placeholder: "led the migration of our monolith to microservices", required: true },
            { key: "achievement2", label: "Achievement 2", placeholder: "mentored 2 new team members through onboarding", required: false },
            { key: "yourName", label: "Your Name", placeholder: "Sneha Pillai", required: true },
        ],
        popularity: 84,
        createdAt: "2026-02-27",
    },
];
