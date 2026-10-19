"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ecommerceRule = void 0;
exports.ecommerceRule = {
    type: 'E-commerce',
    keywords: [
        'shop', 'cart', 'checkout', 'add to cart', 'sku', 'free shipping', 'returns policy',
        'collection', 'store', 'shopify', 'woocommerce', 'orders', 'catalog', 'brand',
        'apparel', 'accessories', 'd2c', 'dtc'
    ],
    techClues: ['shopify', 'woocommerce', 'bigcommerce', 'magento', 'klaviyo', 'recharge', 'gorgias', 'yotpo', 'judge.me'],
    defaultProblem: 'High mobile cart abandonment and unoptimized product page conversion mechanics.',
    defaultObjective: 'Maximize Average Order Value (AOV) and recover abandoned checkouts through automated lifecycle marketing.',
    suggestedNextQuestion: 'What is your current cart-to-checkout drop-off rate on mobile devices versus desktop?',
    suggestedFirstPitch: 'Product Detail Page (PDP) Conversion Rate Optimization & Mobile Checkout Streamline',
    potentialOutreachAngle: 'Sharing specific friction points in their current add-to-cart drawer and post-purchase retention journey.',
    characteristicPainPoints: [
        {
            title: 'Suboptimal Product-Page (PDP) Improvements Needed',
            category: 'Conversion',
            severity: 'high',
            description: 'Product pages lack in-cart slideout upsells, bundle tier incentives, and one-click express checkout options.',
            opportunity: 'Implement high-converting sticky add-to-cart, clear delivery guarantees, and dynamic bundle discounts.'
        },
        {
            title: 'Underdeveloped Abandoned-Cart & Retention Campaigns',
            category: 'Customer Retention',
            severity: 'high',
            description: 'Default transactional notifications without personalized SMS/email recovery sequences.',
            opportunity: 'Deploy behavioral Klaviyo recovery flows: Browse Abandonment, Cart Abandonment, and VIP replenishment.'
        },
        {
            title: 'Missing Advanced Conversion Tracking & Core Web Vitals Bloat',
            category: 'Technical',
            severity: 'medium',
            description: 'Script bloat from multiple disconnected plugins degrading mobile load time and skewing attribution.',
            opportunity: 'Implement server-side conversion API (CAPI) tracking and clean up redundant apps.'
        }
    ],
    serviceRecommendations: {
        canDeliver: [
            {
                title: 'Product-Page (PDP) Improvements & CRO Overhaul',
                description: 'Redesign product detail page layout, sticky mobile CTA, customer review integration, and urgency mechanics.',
                category: 'Conversion',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Directly resolves detected friction in product browsing and checkout initiation.',
                value: '$2,000 - $4,500',
                time: '1-2 weeks',
                difficulty: 'accessible'
            },
            {
                title: 'Abandoned-Cart Automation & Klaviyo Retention Campaigns',
                description: 'End-to-end setup of multi-step cart recovery, browse abandonment, and win-back flows.',
                category: 'Customer Retention',
                recommendationClass: 'B_evidence_supported',
                whyRelevant: 'Recovers 12-25% of abandoned carts automatically with zero ad spend.',
                value: '$2,500 - $5,000',
                time: '2 weeks',
                difficulty: 'accessible'
            },
            {
                title: 'Server-Side Conversion Tracking & Analytics Audit',
                description: 'Implement Meta CAPI, Google Tag Manager server container, and clean attribution tracking.',
                category: 'Analytics',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Fixes signal loss from iOS privacy updates for paid ad optimization.',
                value: '$1,500 - $3,000',
                time: '1 week',
                difficulty: 'accessible'
            }
        ],
        couldLearn: [
            {
                title: 'AI Customer Support Workflows (Gorgias + LLM Agent)',
                description: 'Deploy automated AI resolution for order tracking, returns, and FAQs across email and live chat.',
                category: 'Support Automation',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Reduces support ticket response times from hours to seconds.',
                value: '$3,500 - $7,000',
                time: '2-3 weeks',
                learningCurve: 'Requires Gorgias API and custom webhook intent routing.'
            }
        ],
        partnerDelivery: [
            {
                title: 'Product Videos & Creative Asset Production',
                description: 'High-converting TikTok/Instagram UGC video ads, 3D product renders, and studio photography.',
                category: 'Creative Production',
                recommendationClass: 'C_potential_opportunity',
                whyRelevant: 'Fuel high-performing social ad creative to scale top-of-funnel customer acquisition.',
                value: '$3,000 - $8,000',
                time: '2 weeks',
                partnerType: 'DTC E-Commerce Video Production Studio.'
            }
        ]
    }
};
