"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runHeuristicAnalysis = runHeuristicAnalysis;
const contactValidator_js_1 = require("./contactValidator.js");
const countryDetector_js_1 = require("./countryDetector.js");
const index_js_1 = require("./industryRules/index.js");
function runHeuristicAnalysis(payload, userConfig) {
    // 1. Classify Industry using modular registry & user preferences
    const { industry, confidence: industryConfidence, rule } = index_js_1.industryRegistry.classify(payload, userConfig);
    // 2. Detect Tech Stack
    const techStack = detectTechStack(payload);
    // 3. Process & Clean Contacts with WhatsApp and Verification statuses
    const contacts = (0, contactValidator_js_1.sanitizeAndDeduplicateContacts)(payload.rawContacts, payload.snippetsWithEvidence, payload.url);
    // 4. Detect Country with confidence & HQ distinction
    const countryInfo = (0, countryDetector_js_1.detectCountryFromPayload)(payload);
    // 5. Derive Pain Points with Evidence Snippets
    const painPoints = identifyPainPoints(payload, rule);
    // 6. Partition Services into canDeliver, couldLearn, partnerDelivery with Tri-Tier classifications
    const services = buildServiceMatrix(payload, rule, userConfig);
    // 7. Calculate Explainable 6-Factor Lead Score
    const scoreBreakdown = calculateTransparentScore(payload, contacts, painPoints, techStack, services, countryInfo);
    const leadScore = Math.min(100, Math.max(0, scoreBreakdown.factors.intentScore +
        scoreBreakdown.factors.relevanceScore +
        scoreBreakdown.factors.problemScore +
        scoreBreakdown.factors.capabilityFitScore +
        scoreBreakdown.factors.budgetScore +
        scoreBreakdown.factors.recencyScore));
    // 8. Extract Clean Company Name & Tagline
    const companyName = extractCompanyName(payload);
    const tagline = payload.metaDescription || (payload.headings.h1[0] ?? 'High-potential client discovery');
    // 9. Stated problem, requested service, and outreach angles
    const sourceType = payload.sourceType || 'business_website';
    const requestedService = sourceType === 'job_post' ? (payload.jobTitle || payload.headings.h1[0] || 'Technical / Marketing Services') : undefined;
    const statedProblem = sourceType === 'job_post' ? 'Seeking specialized fulfillment support for active business requirements.' : rule.defaultProblem;
    const likelyObjective = rule.defaultObjective;
    // 10. Tags
    const tags = [
        industry,
        sourceType.replace('_', ' '),
        leadScore >= 75 ? 'High Priority' : leadScore >= 50 ? 'Medium Priority' : 'Nurture',
        ...techStack.slice(0, 3).map(t => t.name)
    ];
    if (countryInfo.country && countryInfo.country !== 'International / Remote') {
        tags.push(countryInfo.country);
    }
    return {
        id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        url: payload.url,
        domain: payload.domain,
        companyName,
        tagline,
        industry,
        industryConfidence,
        sourceType,
        countryInfo,
        status: 'discovered',
        leadScore,
        scoreBreakdown: {
            ...scoreBreakdown,
            needScore: Math.min(100, Math.round((scoreBreakdown.factors.intentScore + scoreBreakdown.factors.problemScore) * 2.2)),
            reachabilityScore: contacts.length > 0 ? 88 : 45,
            fitScore: Math.min(100, Math.round((scoreBreakdown.factors.relevanceScore + scoreBreakdown.factors.capabilityFitScore) * 2.8)),
            techMaturity: Math.min(95, 40 + techStack.length * 10)
        },
        requestedService,
        statedProblem,
        likelyObjective,
        suggestedNextQuestion: rule.suggestedNextQuestion,
        suggestedFirstPitch: rule.suggestedFirstPitch,
        potentialOutreachAngle: rule.potentialOutreachAngle,
        techStack,
        painPoints,
        services,
        contacts,
        location: countryInfo.country !== 'International / Remote' ? countryInfo.country : payload.rawContacts.addresses[0],
        publicationDate: payload.publicationDate,
        statedBudget: payload.statedBudget,
        notes: '',
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}
function detectTechStack(payload) {
    const results = [];
    const clues = payload.detectedTechClues.map(c => c.toLowerCase());
    const haystack = (payload.visibleTextSample + ' ' + (payload.metaDescription || '')).toLowerCase();
    const TECH_CATALOG = [
        { name: 'Shopify', category: 'E-commerce', trigger: ['shopify', 'cdn.shopify.com', 'myshopify'], detection: 'Detected Shopify CDN & theme scripts' },
        { name: 'WooCommerce', category: 'E-commerce', trigger: ['woocommerce', 'wp-content/plugins/woocommerce'], detection: 'Detected WooCommerce plugin traces' },
        { name: 'Klaviyo', category: 'Marketing/CRM', trigger: ['klaviyo', 'static.klaviyo.com'], detection: 'Found Klaviyo marketing script integration' },
        { name: 'WordPress', category: 'CMS', trigger: ['wp-content', 'wp-includes', 'wordpress'], detection: 'WordPress core assets identified' },
        { name: 'Webflow', category: 'CMS', trigger: ['webflow', 'assets.website-files.com'], detection: 'Webflow styling and responsive assets' },
        { name: 'Next.js', category: 'Framework', trigger: ['__next', '_next/static', 'next.js'], detection: 'Next.js hydration runtime identified' },
        { name: 'React', category: 'Framework', trigger: ['react', 'react-dom'], detection: 'React framework detected' },
        { name: 'Google Analytics 4', category: 'Analytics', trigger: ['gtag', 'google-analytics', 'googletagmanager', 'ga4'], detection: 'Google Tag Manager / GA4 tracking tags' },
        { name: 'Meta Pixel', category: 'Marketing/CRM', trigger: ['fbevents.js', 'facebook pixel', 'connect.facebook.net'], detection: 'Meta Pixel conversion tracker' },
        { name: 'Stripe', category: 'Payments', trigger: ['stripe', 'stripe.com', 'js.stripe.com'], detection: 'Stripe Payment Gateway' },
        { name: 'HubSpot', category: 'Marketing/CRM', trigger: ['hubspot', 'hs-scripts.com'], detection: 'HubSpot CRM and tracking code' },
        { name: 'Intercom', category: 'Marketing/CRM', trigger: ['intercom', 'widget.intercom.io'], detection: 'Intercom live chat & engagement widget' },
        { name: 'Calendly', category: 'Marketing/CRM', trigger: ['calendly.com', 'calendly-inline-widget', 'calendly'], detection: 'Calendly meeting scheduling widget' },
        { name: 'Recharge', category: 'Payments', trigger: ['recharge', 'rechargepayments.com'], detection: 'Recharge Subscriptions integration' }
    ];
    for (const tech of TECH_CATALOG) {
        const matched = tech.trigger.some(trig => clues.some(c => c.includes(trig)) || haystack.includes(trig));
        if (matched) {
            results.push({
                name: tech.name,
                category: tech.category,
                confidence: 0.95,
                detectedVia: tech.detection
            });
        }
    }
    return results;
}
function identifyPainPoints(payload, rule) {
    const points = [];
    for (let i = 0; i < rule.characteristicPainPoints.length; i++) {
        const template = rule.characteristicPainPoints[i];
        let evidence = `Observed from landing page structure on ${payload.domain}`;
        if (payload.snippetsWithEvidence.length > i) {
            evidence = `Context on page: "${payload.snippetsWithEvidence[i].text.substring(0, 120)}..."`;
        }
        points.push({
            id: `pain_${i + 1}`,
            title: template.title,
            category: template.category,
            severity: template.severity,
            description: template.description,
            evidenceSnippet: evidence,
            opportunity: template.opportunity
        });
    }
    return points;
}
function buildServiceMatrix(payload, rule, userConfig) {
    const isJobPost = payload.sourceType === 'job_post';
    const canDeliver = rule.serviceRecommendations.canDeliver.map((s, idx) => ({
        id: `cd_${idx + 1}`,
        title: s.title,
        description: s.description,
        category: s.category,
        recommendationClass: isJobPost && idx === 0 ? 'A_explicitly_requested' : s.recommendationClass,
        whyRelevant: s.whyRelevant,
        estimatedValueRange: s.value,
        implementationTime: s.time,
        difficulty: s.difficulty,
        delivererType: 'can_deliver'
    }));
    const couldLearn = rule.serviceRecommendations.couldLearn.map((s, idx) => ({
        id: `cl_${idx + 1}`,
        title: s.title,
        description: s.description,
        category: s.category,
        recommendationClass: s.recommendationClass,
        whyRelevant: s.whyRelevant,
        estimatedValueRange: s.value,
        implementationTime: s.time,
        difficulty: 'moderate',
        delivererType: 'could_learn',
        learningCurveNote: s.learningCurve
    }));
    const partnerDelivery = rule.serviceRecommendations.partnerDelivery.map((s, idx) => ({
        id: `pd_${idx + 1}`,
        title: s.title,
        description: s.description,
        category: s.category,
        recommendationClass: s.recommendationClass,
        whyRelevant: s.whyRelevant,
        estimatedValueRange: s.value,
        implementationTime: s.time,
        difficulty: 'advanced',
        delivererType: 'partner_delivery',
        partnerRecommendation: s.partnerType
    }));
    return { canDeliver, couldLearn, partnerDelivery };
}
function calculateTransparentScore(payload, contacts, painPoints, techStack, services, countryInfo) {
    // 1. Evidence of purchase intent (0-25)
    let intentScore = 12;
    if (payload.sourceType === 'job_post')
        intentScore = 24; // Explicit job post or RFP = highest purchase intent
    else if (payload.rawContacts.contactFormUrls.length > 0)
        intentScore += 5;
    if (payload.statedBudget)
        intentScore = Math.min(25, intentScore + 4);
    // 2. Relevance of requested / matched service (0-20)
    let relevanceScore = 15;
    if (services.canDeliver.some(s => s.recommendationClass === 'A_explicitly_requested'))
        relevanceScore = 20;
    else if (services.canDeliver.length > 0)
        relevanceScore = 17;
    // 3. Strength of identified business problem (0-20)
    const highSev = painPoints.filter(p => p.severity === 'high').length;
    let problemScore = Math.min(20, 10 + highSev * 4);
    // 4. Fit with user's capabilities (0-15)
    let capabilityFitScore = 13;
    if (services.canDeliver.length >= 2)
        capabilityFitScore = 15;
    // 5. Evidence of viable budget (0-10)
    let budgetScore = 5;
    if (payload.statedBudget)
        budgetScore = 10;
    else if (techStack.some(t => ['Shopify', 'Stripe', 'HubSpot', 'Recharge'].includes(t.name)))
        budgetScore = 8;
    // 6. Recency where reliable date is available (0-10)
    let recencyScore = 6;
    if (payload.publicationDate) {
        const diffDays = (Date.now() - new Date(payload.publicationDate).getTime()) / (1000 * 3600 * 24);
        if (diffDays <= 7)
            recencyScore = 10;
        else if (diffDays <= 30)
            recencyScore = 8;
    }
    else if (payload.sourceType === 'job_post') {
        recencyScore = 8;
    }
    const factors = {
        intentScore,
        relevanceScore,
        problemScore,
        capabilityFitScore,
        budgetScore,
        recencyScore
    };
    const total = intentScore + relevanceScore + problemScore + capabilityFitScore + budgetScore + recencyScore;
    const scoreExplanation = `Score of ${total}/100 driven by strong purchase intent (${intentScore}/25), clear service relevance (${relevanceScore}/20), verified on-page bottlenecks (${problemScore}/20), and close alignment with core capabilities (${capabilityFitScore}/15).`;
    return {
        factors,
        scoreExplanation,
        needScore: 80,
        reachabilityScore: 80,
        fitScore: 80,
        techMaturity: 80
    };
}
function extractCompanyName(payload) {
    if (payload.openGraph && payload.openGraph['site_name']) {
        return payload.openGraph['site_name'].trim();
    }
    if (payload.title) {
        const parts = payload.title.split(/[-|–•:]/);
        if (parts.length > 0 && parts[0].trim().length > 1 && parts[0].trim().length < 40) {
            return parts[0].trim();
        }
    }
    const cleanDomain = payload.domain.replace(/^www\./, '').split('.')[0];
    return cleanDomain.charAt(0).toUpperCase() + cleanDomain.slice(1);
}
