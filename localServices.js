"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localServicesRule = void 0;
exports.localServicesRule = {
    type: 'Local Services',
    keywords: [
        'plumbing', 'roofing', 'electrician', 'hvac', 'contractor', 'landscaping',
        'dental', 'clinic', 'lawyer', 'attorney', 'auto repair', 'emergency 24/7',
        'free estimate', 'call now', 'service area', 'repairs', 'installation', 'licensed and insured'
    ],
    techClues: ['callrail', 'service titan', 'housecall pro', 'jobber', 'wordpress', 'elementor'],
    defaultProblem: 'High rate of missed inbound customer calls and friction in booking urgent estimates outside normal business hours.',
    defaultObjective: 'Capture 100% of inbound estimate inquiries instantly and automate review collection after completed service jobs.',
    suggestedNextQuestion: 'What happens when a high-value customer calls your main number on a weekend or after 6 PM?',
    suggestedFirstPitch: 'Instant Missed-Call Recovery SMS & 24/7 Online Booking Automation',
    potentialOutreachAngle: 'Highlighting that 68% of local service callers call a competitor immediately if their first phone call goes to voicemail.',
    characteristicPainPoints: [
        {
            title: 'Missing Instant Booking Automation & After-Hours Intake',
            category: 'Conversion',
            severity: 'high',
            description: 'Potential emergency customers after hours are met with a static voicemail or form with no immediate booking confirmation.',
            opportunity: 'Implement interactive online dispatch booking and instant appointment slot reservation.'
        },
        {
            title: 'Lack of Automated Missed-Call Recovery & Instant Lead Follow-Up',
            category: 'Sales Flow',
            severity: 'high',
            description: 'Inbound callers who disconnect without leaving a message are lost to local competitors.',
            opportunity: 'Deploy automated 30-second missed-call text back system to secure immediate customer intent.'
        },
        {
            title: 'Absence of Automated Review & Customer Reactivation Workflows',
            category: 'Customer Retention',
            severity: 'medium',
            description: 'Satisfied customers are rarely asked for Google reviews systematically, hurting local Google Maps ranking.',
            opportunity: 'Implement post-service SMS review request cadence and annual maintenance reactivation sequences.'
        }
    ],
    serviceRecommendations: {
        canDeliver: [
            {
                title: 'Booking Automation & Online Dispatch Funnel',
                description: 'Deploy real-time mobile booking calendar synced with technician scheduling software.',
                category: 'Booking Automation',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Enables customers to lock in service appointments 24/7 without manual telephone dispatching.',
                value: '$1,500 - $3,000',
                time: '1 week',
                difficulty: 'accessible'
            },
            {
                title: 'Lead Follow-Up & CRM Pipeline Setup',
                description: 'Set up automated multi-touch lead nurture sequences to follow up on quotes and estimates until booked.',
                category: 'CRM Implementation',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Doubles quote win rates by eliminating manual follow-up delays.',
                value: '$2,000 - $4,000',
                time: '2 weeks',
                difficulty: 'accessible'
            },
            {
                title: 'Google Review & Customer Reactivation Workflows',
                description: 'Automated post-job review generation engine and bi-annual seasonal maintenance reminders.',
                category: 'Customer Retention',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Climbs local Google Maps 3-pack rankings and reactivates past customer databases.',
                value: '$1,200 - $2,500',
                time: '1 week',
                difficulty: 'accessible'
            }
        ],
        couldLearn: [
            {
                title: 'AI Receptionists & Voice Phone Agent (Bland / Vapi AI)',
                description: 'Deploy human-sounding conversational voice AI to answer phone calls 24/7, quote prices, and book dispatch slots.',
                category: 'AI Receptionist',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Guarantees zero missed phone calls even during peak volume hours.',
                value: '$3,500 - $8,000',
                time: '3 weeks',
                learningCurve: 'Requires Twilio voice SIP trunking and prompt engineering for real-time speech latencies.'
            },
            {
                title: 'Automated Missed-Call Recovery SMS System',
                description: 'Instant automated text message triggered within 30 seconds of an unanswered incoming business call.',
                category: 'Missed-Call Recovery',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Prevents the prospect from opening Google to call the next local competitor.',
                value: '$1,200 - $2,500',
                time: '1 week',
                learningCurve: 'Requires Twilio or HighLevel webhook integration.'
            }
        ],
        partnerDelivery: [
            {
                title: 'Hyper-Local Google Guaranteed Local Services Ads (LSA) Management',
                description: 'Manage Google Local Services Pay-Per-Lead ad campaigns with background check verification.',
                category: 'Paid Acquisition',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Puts the business at the very top of Google above standard organic and pay-per-click search results.',
                value: '$1,500/mo retainer',
                time: 'Ongoing retainer',
                partnerType: 'Local PPC & Google LSA Agency Partner.'
            }
        ]
    }
};
