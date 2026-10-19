"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericRule = void 0;
exports.genericRule = {
    type: 'Other',
    keywords: ['business', 'services', 'solutions', 'company', 'consulting', 'enterprise'],
    techClues: [],
    defaultProblem: 'Unclear core value proposition and generic contact flow on website.',
    defaultObjective: 'Streamline customer discovery and improve conversion velocity from visitor to qualified inbound call.',
    suggestedNextQuestion: 'What is the primary conversion action you want a prospective buyer to take on your homepage?',
    suggestedFirstPitch: 'Strategic Website Messaging Redesign & Lead Capture Optimization',
    potentialOutreachAngle: 'Demonstrating how clearer outcome-based positioning directly lifts qualified inquiry volume.',
    characteristicPainPoints: [
        {
            title: 'Unclear Core Value Proposition & Generic Call-to-Action',
            category: 'Conversion',
            severity: 'medium',
            description: 'Site content is self-focused rather than highlighting customer pain points and measurable outcomes.',
            opportunity: 'Revamp hero copy and create clear, low-friction discovery call booking flow.'
        },
        {
            title: 'Missing Structured SEO Metadata & Schema Markup',
            category: 'Technical',
            severity: 'medium',
            description: 'Search engines lack rich snippet data, diminishing search result click-through rate.',
            opportunity: 'Add Organization, FAQ, and BreadcrumbList JSON-LD structured schemas.'
        }
    ],
    serviceRecommendations: {
        canDeliver: [
            {
                title: 'Strategic Website Redesign & Lead Capture Optimization',
                description: 'Realign messaging, improve visual hierarchy, and streamline contact touchpoints.',
                category: 'Conversion',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Directly resolves generic positioning and unclear inquiry mechanics.',
                value: '$2,000 - $4,500',
                time: '2 weeks',
                difficulty: 'accessible'
            }
        ],
        couldLearn: [
            {
                title: 'Custom AI Search & Interactive Lead Qualifier',
                description: 'AI assistant trained on company services to qualify prospect intent 24/7.',
                category: 'AI Assistant',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Engages website visitors in real-time conversations to capture verified email and phone.',
                value: '$3,500 - $7,000',
                time: '2-3 weeks',
                learningCurve: 'Requires RAG pipeline and vector search.'
            }
        ],
        partnerDelivery: [
            {
                title: 'Brand Identity & Corporate Video Production',
                description: 'Full logo system, brand guidelines, and high-production company documentary.',
                category: 'Branding',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Establishes commanding visual authority in crowded corporate verticals.',
                value: '$5,000 - $15,000',
                time: '4 weeks',
                partnerType: 'Brand Strategy Studio.'
            }
        ]
    }
};
