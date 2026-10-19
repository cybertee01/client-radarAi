"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saasRule = void 0;
exports.saasRule = {
    type: 'SaaS & Software',
    keywords: [
        'saas', 'software', 'platform', 'api', 'pricing', 'monthly plan', 'annual billing',
        'sign up free', 'schedule demo', 'integrations', 'sdk', 'developer docs', 'workflow automation',
        'cloud', 'devops', 'enterprise solution', 'b2b software'
    ],
    techClues: ['next.js', 'react', 'stripe', 'intercom', 'segment', 'mixpanel', 'posthog', 'hubspot', 'auth0'],
    defaultProblem: 'High friction in user onboarding leading to early trial drop-off before feature value activation.',
    defaultObjective: 'Accelerate Time-to-Value (TTV), boost free-to-paid conversion, and reduce Day-30 churn.',
    suggestedNextQuestion: 'At what step of the signup and product onboarding flow do the majority of your trial users currently drop off?',
    suggestedFirstPitch: 'Product Onboarding UX Redesign & User Activation Workflow Audit',
    potentialOutreachAngle: 'A 3-minute video teardown highlighting the cognitive friction points between signup and their product aha-moment.',
    characteristicPainPoints: [
        {
            title: 'High User Onboarding Drop-Off & Feature Activation Gap',
            category: 'Conversion',
            severity: 'high',
            description: 'Signup leads into an empty dashboard without guided milestone checklists, pre-populated sandbox data, or interactive walkthroughs.',
            opportunity: 'Design product-led onboarding flow with progress gamification and initial value activation.'
        },
        {
            title: 'Generic Landing Page Positioning & Weak Social Proof Above Fold',
            category: 'Marketing',
            severity: 'medium',
            description: 'Landing page lists technical features rather than highlighting measurable enterprise business outcomes or customer benchmarks.',
            opportunity: 'Refactor hero messaging, pricing comparison tiers, and integrate quantitative case study widgets.'
        },
        {
            title: 'Support Overload From Inadequate Self-Serve Documentation',
            category: 'Customer Retention',
            severity: 'medium',
            description: 'Customer success team overwhelmed by repetitive setup questions that could be solved via in-app interactive guidance.',
            opportunity: 'Deploy automated in-app support workflows and searchable interactive documentation.'
        }
    ],
    serviceRecommendations: {
        canDeliver: [
            {
                title: 'Product-Led Onboarding Workflows & User Activation',
                description: 'Design step-by-step product walkthroughs, activation milestone checklists, and progress gamification.',
                category: 'Activation',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Directly addresses detected onboarding drop-off to drive higher free-to-paid trial conversion.',
                value: '$3,500 - $7,000',
                time: '2-3 weeks',
                difficulty: 'accessible'
            },
            {
                title: 'UI/UX Design & Landing-Page Development',
                description: 'Complete redesign of SaaS landing page with developer-focused clarity, modern aesthetics, and pricing tiers.',
                category: 'UX/Design',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Increases conversion rate from cold visitor traffic to qualified demo requests / free trial signups.',
                value: '$4,000 - $8,500',
                time: '3 weeks',
                difficulty: 'accessible'
            },
            {
                title: 'User Retention & Churn Reduction Email Lifecycle',
                description: 'Behavior-triggered customer emails based on product usage events (feature unlocked, inactive 7 days, limit reached).',
                category: 'Retention',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Systematically prompts disengaged users back into the core application workflow.',
                value: '$2,500 - $5,000',
                time: '2 weeks',
                difficulty: 'accessible'
            }
        ],
        couldLearn: [
            {
                title: 'Customer Support Automation with AI Copilot Agents',
                description: 'Embed LLM assistant inside the SaaS dashboard to answer technical documentation questions and execute actions.',
                category: 'Support Automation',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Deflects 40%+ of repetitive support tickets while providing instant 24/7 technical answers.',
                value: '$6,000 - $14,000',
                time: '3-5 weeks',
                learningCurve: 'Requires vector database embeddings (Pinecone/pgvector) and OpenAI tool calling.'
            }
        ],
        partnerDelivery: [
            {
                title: 'Interactive Product Demo Videos & Motion Walkthroughs',
                description: 'Studio-grade animated product motion graphics, UI micro-interactions, and 60-second keynote video.',
                category: 'Creative Production',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Explains complex technical software mechanics visually in seconds to busy enterprise executives.',
                value: '$4,000 - $10,000',
                time: '2-3 weeks',
                partnerType: 'SaaS Motion Design & 3D Animation Agency.'
            }
        ]
    }
};
