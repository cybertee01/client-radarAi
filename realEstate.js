"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realEstateRule = void 0;
exports.realEstateRule = {
    type: 'Real Estate',
    keywords: [
        'real estate', 'property', 'realtor', 'brokerage', 'idx', 'mls', 'listings',
        'condo', 'penthouse', 'residential', 'commercial lease', 'mortgage', 'home valuation',
        'realty', 'properties', 'apartments', 'luxury homes'
    ],
    techClues: ['idxbroker', 'chime', 'boomtown', 'realgeeks', 'placester', 'matterport'],
    defaultProblem: 'High friction in property lead qualification and slow agent follow-up on listing inquiries.',
    defaultObjective: 'Capture high-intent home buyers and sellers and automate immediate viewing scheduling.',
    suggestedNextQuestion: 'What percentage of your website visitors currently request an instant property valuation or schedule a private showing before bouncing?',
    suggestedFirstPitch: 'Automated 2-Step Home Valuation Lead Magnet & Instant Viewing Scheduler',
    potentialOutreachAngle: 'Demonstrating how local competitor brokerages are capturing exclusive seller listings through automated valuation funnels.',
    characteristicPainPoints: [
        {
            title: 'Friction in Property Search & Filter UI',
            category: 'UX/Design',
            severity: 'high',
            description: 'Listing filters lack instant responsive faceted search, causing property seekers to bounce to national portals like Zillow/Redfin.',
            opportunity: 'Implement interactive map search and instant neighborhood filter widgets.'
        },
        {
            title: 'Missing Instant Home Valuation Lead Magnet',
            category: 'Conversion',
            severity: 'high',
            description: 'No automated property valuation tool or home equity calculator to capture high-intent prospective home sellers.',
            opportunity: 'Deploy a high-converting 2-step home valuation funnel with instant report delivery.'
        },
        {
            title: 'Lack of Automated Viewing Scheduling & Lead Reactivation',
            category: 'Sales Flow',
            severity: 'medium',
            description: 'Viewing requests rely on generic email forms rather than instant calendar sync or WhatsApp dispatch.',
            opportunity: 'Integrate automated WhatsApp & calendar booking for same-day private walkthroughs.'
        }
    ],
    serviceRecommendations: {
        canDeliver: [
            {
                title: 'Lead Capture & Qualification Funnel',
                description: 'Deploy an automated property valuation lead magnet and interactive seller questionnaire.',
                category: 'Lead Capture',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Directly addresses missing seller capture mechanics observed on property landing pages.',
                value: '$1,800 - $3,500',
                time: '1-2 weeks',
                difficulty: 'accessible'
            },
            {
                title: 'Appointment Scheduling & Calendar Sync',
                description: 'Integrate automated two-way tour booking synced with agent calendar schedules.',
                category: 'Sales Flow',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Replaces delayed static email forms with instant confirmation.',
                value: '$1,200 - $2,500',
                time: '1 week',
                difficulty: 'accessible'
            },
            {
                title: 'Lead Reactivation Campaign Automation',
                description: 'Re-engage stale CRM buyer/seller databases with automated SMS and email sequences.',
                category: 'Retention',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Unlocks immediate listing pipeline from past dormant inquiries.',
                value: '$2,000 - $4,000',
                time: '2 weeks',
                difficulty: 'accessible'
            }
        ],
        couldLearn: [
            {
                title: 'WhatsApp Business Workflow & CRM Integration',
                description: 'Automate instant WhatsApp lead notifications, automated property brochures, and two-way CRM chat.',
                category: 'CRM Implementation',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Enables sub-minute lead response times, which 10x appointment conversion rates.',
                value: '$3,000 - $6,500',
                time: '2-3 weeks',
                learningCurve: 'Requires WhatsApp Business Cloud API setup and webhook middleware.'
            },
            {
                title: 'Real Estate CRM Implementation (Follow Up Boss / Chime)',
                description: 'End-to-end setup of lead routing, pipeline stages, automated tasks, and agent performance tracking.',
                category: 'CRM Implementation',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Prevents leads from slipping through the cracks across multi-agent broker teams.',
                value: '$3,500 - $7,500',
                time: '3 weeks',
                learningCurve: 'Requires deep knowledge of real estate CRM webhook schemas.'
            }
        ],
        partnerDelivery: [
            {
                title: 'Property Video Creation & 3D Drone Cinematography',
                description: 'Broadcast-quality 4K aerial drone tours and 3D Matterport virtual walkthroughs.',
                category: 'Creative Production',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Dramatically elevates perceived listing luxury for multimillion-dollar properties.',
                value: '$1,500 - $4,000 / listing',
                time: '3 days',
                partnerType: 'Licensed FAA Part 107 Drone Videographer.'
            }
        ]
    }
};
