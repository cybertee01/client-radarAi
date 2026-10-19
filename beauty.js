"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beautyRule = void 0;
exports.beautyRule = {
    type: 'Beauty, Skincare & Fragrance',
    keywords: [
        'serum', 'skincare', 'perfume', 'fragrance', 'cosmetics', 'eau de parfum',
        'clean beauty', 'cruelty-free', 'vegan', 'spf', 'moisturizer', 'botanical',
        'scent profile', 'ingredients', 'barrier repair', 'lip gloss', 'anti-aging', 'dermatologist'
    ],
    techClues: ['shopify', 'klaviyo', 'recharge', 'okendo', 'yotpo', 'kudobuzz', 'loox'],
    defaultProblem: 'High buying hesitation online due to customer inability to test scent or match skin shades virtually.',
    defaultObjective: 'Boost first-order conversion with personalized routine finders and establish recurring auto-replenishment subscriptions.',
    suggestedNextQuestion: 'What percentage of first-time shoppers bounce from your collection pages without finding their specific skin-type or scent match?',
    suggestedFirstPitch: 'Interactive 4-Step Scent/Routine Diagnostic Quiz with Direct Bundle Add-to-Cart',
    potentialOutreachAngle: 'How diagnostic quiz funnels increase DTC beauty average order values by 32% and capture rich zero-party quiz data for Klaviyo.',
    characteristicPainPoints: [
        {
            title: 'High Buying Hesitation: Absence of Skin / Scent Matcher Quiz',
            category: 'Conversion',
            severity: 'high',
            description: 'Customers cannot smell fragrance or test shade online, leading to high abandon rate without a personalized recommendation quiz.',
            opportunity: 'Build an interactive 4-step Scent/Skin Type Finder quiz with personalized product bundle output.'
        },
        {
            title: 'Underutilized Subscription & Auto-Replenishment Engine',
            category: 'Customer Retention',
            severity: 'high',
            description: 'Consumable beauty items (serums, fragrance refills) lack seamless Subscribe & Save with flexible delivery frequencies.',
            opportunity: 'Implement Recharge / Skio subscription model with discounted refill program.'
        },
        {
            title: 'Lack of Visible Ingredient Transparency & Clinical Badges',
            category: 'UX/Design',
            severity: 'medium',
            description: 'Active ingredients are buried in dense text tabs rather than highlighted with interactive visual active-ingredient cards.',
            opportunity: 'Design interactive clinical proof sections and clean beauty certification icons.'
        }
    ],
    serviceRecommendations: {
        canDeliver: [
            {
                title: 'Interactive Skin Diagnostic & Scent Matcher Quiz',
                description: 'Custom React quiz funnel recommending tailored regimens and adding bundles directly to checkout.',
                category: 'Conversion Funnel',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Directly solves buying hesitation by recommending exact matched products based on skin concerns.',
                value: '$2,500 - $5,000',
                time: '2 weeks',
                difficulty: 'accessible'
            },
            {
                title: 'Beauty DTC High-Converting Product Page Overhaul',
                description: 'Redesign PDP with UGC video reels, before/after sliders, and clinical claims proof.',
                category: 'Conversion',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Provides the visual social proof beauty consumers require before purchasing high-end cosmetics.',
                value: '$2,500 - $4,500',
                time: '2 weeks',
                difficulty: 'accessible'
            },
            {
                title: 'Automated Beauty Replenishment & VIP Retention Flows',
                description: 'Timed post-purchase sequences calculated around product jar depletion dates (30/60/90 days).',
                category: 'Retention',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Captures repeat re-orders right when the customer is running low on moisturizer or serum.',
                value: '$2,000 - $4,000',
                time: '2 weeks',
                difficulty: 'accessible'
            }
        ],
        couldLearn: [
            {
                title: 'AR Virtual Complexion & Shade Try-on Module',
                description: 'Browser-based camera skin tone detector or virtual lipstick try-on widget.',
                category: 'Interactive Tech',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Reduces cosmetic return rates by allowing live digital shade testing.',
                value: '$6,000 - $14,000',
                time: '4 weeks',
                learningCurve: 'Requires WebRTC video capture and face-landmarks TensorFlow model.'
            }
        ],
        partnerDelivery: [
            {
                title: 'TikTok & Instagram Influencer Seeding & Whitelisting',
                description: 'Manage 50+ micro-creator giftings and run spark ads directly through creator handles.',
                category: 'Influencer Marketing',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'The primary growth engine for DTC cosmetics and viral clean beauty brands.',
                value: '$4,000/mo retainer',
                time: 'Ongoing retainer',
                partnerType: 'Influencer Marketing Agency.'
            }
        ]
    }
};
