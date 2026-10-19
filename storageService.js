"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageService = void 0;
class StorageService {
    leads = new Map();
    constructor() {
        this.seedDemoLeads();
    }
    seedDemoLeads() {
        const demoLeads = [
            {
                id: 'lead_demo_1',
                url: 'https://lumina-botanics.example.com',
                domain: 'lumina-botanics.example.com',
                companyName: 'Lumina Botanics',
                tagline: 'Clean clinical botanicals & barrier repair skincare',
                industry: 'Beauty, Skincare & Fragrance',
                industryConfidence: 0.94,
                sourceType: 'business_website',
                countryInfo: {
                    country: 'United States',
                    countryCode: 'US',
                    confidence: 0.95,
                    evidence: 'Declared in JSON-LD Organization headquarters schema (New York, NY, USA)',
                    isHeadquarters: true
                },
                status: 'reviewed',
                leadScore: 88,
                scoreBreakdown: {
                    needScore: 92,
                    reachabilityScore: 85,
                    fitScore: 90,
                    techMaturity: 85,
                    factors: {
                        intentScore: 20,
                        relevanceScore: 19,
                        problemScore: 18,
                        capabilityFitScore: 15,
                        budgetScore: 8,
                        recencyScore: 8
                    },
                    scoreExplanation: 'Score of 88/100 driven by high DTC purchase intent, clear PDP conversion bottleneck, and high-synergy Shopify CRO capabilities.'
                },
                statedProblem: 'High buying hesitation online due to customer inability to test scent or match skin shades virtually.',
                likelyObjective: 'Boost first-order conversion with diagnostic quiz funnels and establish recurring replenishment subscriptions.',
                suggestedNextQuestion: 'What percentage of first-time shoppers bounce from your collection pages without finding their specific skin-type or scent match?',
                suggestedFirstPitch: 'Interactive 4-Step Scent/Routine Diagnostic Quiz with Direct Bundle Add-to-Cart',
                potentialOutreachAngle: 'How diagnostic quiz funnels increase DTC beauty average order values by 32% and capture rich zero-party quiz data for Klaviyo.',
                techStack: [
                    { name: 'Shopify', category: 'E-commerce', confidence: 0.99, detectedVia: 'Shopify CDN scripts' },
                    { name: 'Klaviyo', category: 'Marketing/CRM', confidence: 0.95, detectedVia: 'Klaviyo onsite tracking' },
                    { name: 'Recharge', category: 'Payments', confidence: 0.90, detectedVia: 'Recharge subscription checkout' },
                    { name: 'Google Analytics 4', category: 'Analytics', confidence: 0.95, detectedVia: 'GA4 tag' }
                ],
                painPoints: [
                    {
                        id: 'pain_1',
                        title: 'High Buying Hesitation: Absence of Scent / Skin Matcher Quiz',
                        category: 'Conversion',
                        severity: 'high',
                        description: 'Customers cannot smell fragrance or test shade online, leading to high bounce rate without an interactive quiz.',
                        evidenceSnippet: 'Observed from product collection page: no quiz prompt or discovery assistant.',
                        opportunity: 'Build an interactive 4-step Routine Finder quiz that auto-recommends bundles.'
                    },
                    {
                        id: 'pain_2',
                        title: 'Underutilized Subscription & Auto-Replenishment Engine',
                        category: 'Customer Retention',
                        severity: 'high',
                        description: 'Consumable beauty items lack visible Subscribe & Save incentives with flexible refill delivery frequencies.',
                        evidenceSnippet: 'Single purchase option dominates PDP; subscription toggle is secondary.',
                        opportunity: 'Implement smart auto-replenishment widget with 15% discount tiered incentive.'
                    }
                ],
                services: {
                    canDeliver: [
                        {
                            id: 'cd_1',
                            title: 'Interactive Skin Diagnostic & Routine Quiz Funnel',
                            description: 'Custom React quiz funnel recommending tailored regimens and adding bundles directly to cart.',
                            category: 'Conversion Funnel',
                            recommendationClass: 'B_evidence_supported',
                            whyRelevant: 'Directly solves buying hesitation by recommending exact matched products based on skin concerns.',
                            estimatedValueRange: '$2,500 - $4,500',
                            implementationTime: '1-2 weeks',
                            difficulty: 'accessible',
                            delivererType: 'can_deliver'
                        },
                        {
                            id: 'cd_2',
                            title: 'PDP Conversion Rate & Social Proof Optimization',
                            description: 'Redesign product detail page with UGC video reels, clean beauty badges, and instant checkout.',
                            category: 'Conversion',
                            recommendationClass: 'B_evidence_supported',
                            whyRelevant: 'Provides visual clinical claims and UGC social proof required before purchasing premium cosmetics.',
                            estimatedValueRange: '$2,000 - $3,500',
                            implementationTime: '1 week',
                            difficulty: 'accessible',
                            delivererType: 'can_deliver'
                        }
                    ],
                    couldLearn: [
                        {
                            id: 'cl_1',
                            title: 'AR Virtual Complexion & Shade Try-on Module',
                            description: 'Browser-based camera skin tone detector or virtual lipstick try-on widget.',
                            category: 'Interactive Tech',
                            recommendationClass: 'C_potential_opportunity',
                            whyRelevant: 'Reduces cosmetic return rates by allowing live digital shade testing.',
                            estimatedValueRange: '$6,000 - $12,000',
                            implementationTime: '4 weeks',
                            difficulty: 'moderate',
                            delivererType: 'could_learn',
                            learningCurveNote: 'Requires WebRTC video capture and face-landmarks TensorFlow model.'
                        }
                    ],
                    partnerDelivery: [
                        {
                            id: 'pd_1',
                            title: 'TikTok & Instagram Influencer Seeding & Whitelisting',
                            description: 'Manage 50+ micro-creator giftings and run spark ads directly through creator handles.',
                            category: 'Influencer Marketing',
                            recommendationClass: 'C_potential_opportunity',
                            whyRelevant: 'The primary growth engine for viral clean beauty brands.',
                            estimatedValueRange: '$4,000/mo retainer',
                            implementationTime: 'Ongoing retainer',
                            difficulty: 'advanced',
                            delivererType: 'partner_delivery',
                            partnerRecommendation: 'Specialized DTC Influencer Marketing Agency.'
                        }
                    ]
                },
                contacts: [
                    {
                        id: 'contact_1',
                        type: 'email',
                        value: 'partnerships@lumina-botanics.example.com',
                        label: 'Public Email',
                        sourceType: 'mailto',
                        sourceUrl: 'https://lumina-botanics.example.com/contact',
                        evidenceSnippet: 'Found on contact page: partnerships@lumina-botanics.example.com',
                        confidence: 0.95,
                        verificationStatus: 'verified_appropriate_source',
                        discoveryDate: new Date().toISOString()
                    },
                    {
                        id: 'contact_2',
                        type: 'whatsapp',
                        value: 'https://wa.me/15552345678',
                        label: 'Official WhatsApp Concierge',
                        sourceType: 'whatsapp_link',
                        sourceUrl: 'https://lumina-botanics.example.com',
                        evidenceSnippet: 'Direct WhatsApp Concierge link: https://wa.me/15552345678',
                        confidence: 0.98,
                        verificationStatus: 'verified_appropriate_source',
                        discoveryDate: new Date().toISOString()
                    },
                    {
                        id: 'contact_3',
                        type: 'instagram',
                        value: 'https://instagram.com/luminabotanics',
                        label: 'INSTAGRAM Profile',
                        sourceType: 'social_link',
                        sourceUrl: 'https://lumina-botanics.example.com',
                        evidenceSnippet: 'Footer social link: https://instagram.com/luminabotanics',
                        confidence: 0.92,
                        verificationStatus: 'verified_appropriate_source',
                        discoveryDate: new Date().toISOString()
                    }
                ],
                location: 'New York, NY',
                tags: ['Beauty, Skincare & Fragrance', 'High Priority', 'Shopify', 'Klaviyo', 'United States'],
                createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                updatedAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 'lead_demo_2',
                url: 'https://vortex-cloud.example.com/jobs/lead-growth-engineer',
                domain: 'vortex-cloud.example.com',
                companyName: 'Vortex Cloud Platform',
                tagline: 'Developer-first infrastructure monitoring and telemetry',
                industry: 'SaaS & Software',
                industryConfidence: 0.96,
                sourceType: 'job_post',
                countryInfo: {
                    country: 'United States',
                    countryCode: 'US',
                    confidence: 0.92,
                    evidence: 'San Francisco, CA headquarters declared in job posting',
                    isHeadquarters: true
                },
                status: 'discovered',
                leadScore: 94,
                scoreBreakdown: {
                    needScore: 95,
                    reachabilityScore: 88,
                    fitScore: 92,
                    techMaturity: 94,
                    factors: {
                        intentScore: 24,
                        relevanceScore: 20,
                        problemScore: 19,
                        capabilityFitScore: 15,
                        budgetScore: 9,
                        recencyScore: 7
                    },
                    scoreExplanation: 'Score of 94/100 driven by active hiring intent for growth engineering, high budget range ($120k-$160k budget stated), and verified tech leadership contacts.'
                },
                requestedService: 'Growth Engineering & Onboarding Funnel Architecture',
                statedProblem: 'Seeking specialized growth fulfillment to reduce user trial drop-off before feature value activation.',
                likelyObjective: 'Accelerate Time-to-Value (TTV), boost free-to-paid conversion, and reduce Day-30 churn.',
                suggestedNextQuestion: 'At what step of the signup and product onboarding flow do the majority of your trial users currently drop off?',
                suggestedFirstPitch: 'Product-Led Onboarding Workflows & User Activation Architecture',
                potentialOutreachAngle: 'A 3-minute video teardown highlighting the cognitive friction points between signup and their product aha-moment.',
                publicationDate: new Date(Date.now() - 86400000 * 3).toISOString(),
                statedBudget: '$120,000 - $160,000 / project budget',
                techStack: [
                    { name: 'Next.js', category: 'Framework', confidence: 0.98, detectedVia: 'Next.js hydration runtime' },
                    { name: 'Stripe', category: 'Payments', confidence: 0.95, detectedVia: 'Stripe Elements SDK' },
                    { name: 'HubSpot', category: 'Marketing/CRM', confidence: 0.90, detectedVia: 'HubSpot tracking' }
                ],
                painPoints: [
                    {
                        id: 'pain_v1',
                        title: 'High User Onboarding Drop-Off & Feature Activation Gap',
                        category: 'Conversion',
                        severity: 'high',
                        description: 'Signup leads into an unpopulated dashboard without interactive guided onboarding milestones or sandbox telemetry.',
                        evidenceSnippet: 'Observed from free trial onboarding route: empty charts without guidance.',
                        opportunity: 'Design interactive guided onboarding wizard with pre-populated sandbox data.'
                    }
                ],
                services: {
                    canDeliver: [
                        {
                            id: 'cd_v1',
                            title: 'Product-Led Onboarding Workflows & User Activation',
                            description: 'Design step-by-step product walkthroughs, activation milestone checklists, and progress gamification.',
                            category: 'Activation',
                            recommendationClass: 'A_explicitly_requested',
                            whyRelevant: 'Directly requested in active recruitment notice to solve trial onboarding churn.',
                            estimatedValueRange: '$4,500 - $8,500',
                            implementationTime: '2-3 weeks',
                            difficulty: 'accessible',
                            delivererType: 'can_deliver'
                        }
                    ],
                    couldLearn: [
                        {
                            id: 'cl_v1',
                            title: 'Customer Support Automation with AI Copilot Agents',
                            description: 'Embed LLM assistant inside the SaaS dashboard to answer technical documentation questions and execute actions.',
                            category: 'Support Automation',
                            recommendationClass: 'C_potential_opportunity',
                            whyRelevant: 'Deflects 40%+ of repetitive support tickets while providing instant 24/7 technical answers.',
                            estimatedValueRange: '$7,000 - $14,000',
                            implementationTime: '3-4 weeks',
                            difficulty: 'moderate',
                            delivererType: 'could_learn',
                            learningCurveNote: 'Requires OpenAI Function Calling and vector embeddings.'
                        }
                    ],
                    partnerDelivery: [
                        {
                            id: 'pd_v1',
                            title: 'Enterprise SOC2 Compliance Readiness & Pen-Testing',
                            description: 'Formal security gap analysis and infrastructure audit for enterprise procurement.',
                            category: 'Security',
                            recommendationClass: 'C_potential_opportunity',
                            whyRelevant: 'Enterprise procurement gatekeeper for 6-figure SaaS contracts.',
                            estimatedValueRange: '$12,000 - $25,000',
                            implementationTime: '6 weeks',
                            difficulty: 'advanced',
                            delivererType: 'partner_delivery',
                            partnerRecommendation: 'Certified CyberSecurity & SOC2 Firm.'
                        }
                    ]
                },
                contacts: [
                    {
                        id: 'contact_v1',
                        type: 'email',
                        value: 'careers@vortex-cloud.example.com',
                        label: 'Hiring & Partnerships',
                        sourceType: 'mailto',
                        sourceUrl: 'https://vortex-cloud.example.com/jobs',
                        evidenceSnippet: 'Hiring contact: careers@vortex-cloud.example.com',
                        confidence: 0.95,
                        verificationStatus: 'verified_appropriate_source',
                        discoveryDate: new Date().toISOString()
                    },
                    {
                        id: 'contact_v2',
                        type: 'linkedin',
                        value: 'https://linkedin.com/company/vortex-cloud',
                        label: 'LINKEDIN Company Page',
                        sourceType: 'social_link',
                        sourceUrl: 'https://vortex-cloud.example.com',
                        evidenceSnippet: 'Discovered company LinkedIn page',
                        confidence: 0.95,
                        verificationStatus: 'verified_appropriate_source',
                        discoveryDate: new Date().toISOString()
                    }
                ],
                location: 'San Francisco, CA',
                tags: ['SaaS & Software', 'Job Post', 'High Priority', 'Next.js', 'Stripe', 'United States'],
                createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
                updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
            }
        ];
        for (const lead of demoLeads) {
            this.leads.set(lead.id, lead);
        }
    }
    getAll(filterIndustry, filterStatus, searchQuery, filterCountry, filterSource) {
        let list = Array.from(this.leads.values());
        if (filterIndustry && filterIndustry !== 'All') {
            list = list.filter(l => l.industry.toLowerCase() === filterIndustry.toLowerCase());
        }
        if (filterStatus && filterStatus !== 'All') {
            list = list.filter(l => l.status === filterStatus);
        }
        if (filterCountry && filterCountry !== 'All') {
            list = list.filter(l => l.countryInfo?.country?.toLowerCase() === filterCountry.toLowerCase());
        }
        if (filterSource && filterSource !== 'All') {
            list = list.filter(l => l.sourceType === filterSource);
        }
        if (searchQuery && searchQuery.trim().length > 0) {
            const q = searchQuery.toLowerCase().trim();
            list = list.filter(l => l.companyName.toLowerCase().includes(q) ||
                l.domain.toLowerCase().includes(q) ||
                (l.countryInfo?.country || '').toLowerCase().includes(q) ||
                l.tags.some(t => t.toLowerCase().includes(q)) ||
                l.painPoints.some(p => p.title.toLowerCase().includes(q)));
        }
        return list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
    getById(id) {
        return this.leads.get(id);
    }
    save(lead) {
        const existing = Array.from(this.leads.values()).find(l => l.domain.toLowerCase() === lead.domain.toLowerCase());
        if (existing) {
            const merged = {
                ...lead,
                id: existing.id,
                createdAt: existing.createdAt,
                updatedAt: new Date().toISOString()
            };
            this.leads.set(existing.id, merged);
            return merged;
        }
        this.leads.set(lead.id, lead);
        return lead;
    }
    update(id, updates) {
        const existing = this.leads.get(id);
        if (!existing)
            return undefined;
        const updated = {
            ...existing,
            ...updates,
            updatedAt: new Date().toISOString()
        };
        this.leads.set(id, updated);
        return updated;
    }
    delete(id) {
        return this.leads.delete(id);
    }
}
exports.storageService = new StorageService();
