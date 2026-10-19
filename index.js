"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.industryRegistry = exports.IndustryRuleRegistry = void 0;
const realEstate_js_1 = require("./realEstate.js");
const ecommerce_js_1 = require("./ecommerce.js");
const saas_js_1 = require("./saas.js");
const localServices_js_1 = require("./localServices.js");
const marketingAgency_js_1 = require("./marketingAgency.js");
const beauty_js_1 = require("./beauty.js");
const generic_js_1 = require("./generic.js");
class IndustryRuleRegistry {
    rules = new Map();
    constructor() {
        this.register(realEstate_js_1.realEstateRule);
        this.register(ecommerce_js_1.ecommerceRule);
        this.register(saas_js_1.saasRule);
        this.register(localServices_js_1.localServicesRule);
        this.register(marketingAgency_js_1.marketingAgencyRule);
        this.register(beauty_js_1.beautyRule);
        this.register(generic_js_1.genericRule);
    }
    register(rule) {
        this.rules.set(rule.type, rule);
    }
    get(industry) {
        return this.rules.get(industry) || generic_js_1.genericRule;
    }
    getAll() {
        return Array.from(this.rules.values());
    }
    classify(payload, userConfig) {
        const haystack = [
            payload.title,
            payload.metaDescription ?? '',
            payload.metaKeywords ?? '',
            payload.headings.h1.join(' '),
            payload.headings.h2.join(' '),
            payload.visibleTextSample.substring(0, 3500),
            ...payload.detectedTechClues
        ].join(' ').toLowerCase();
        // Determine target pool based on user configuration
        let candidateRules = Array.from(this.rules.values());
        if (userConfig?.targetIndustryMode === 'single' && userConfig.selectedIndustries && userConfig.selectedIndustries.length > 0) {
            const singleTarget = userConfig.selectedIndustries[0];
            const match = this.rules.get(singleTarget);
            if (match)
                candidateRules = [match];
        }
        else if (userConfig?.targetIndustryMode === 'multiple' && userConfig.selectedIndustries && userConfig.selectedIndustries.length > 0) {
            candidateRules = userConfig.selectedIndustries
                .map(ind => this.rules.get(ind))
                .filter((r) => r !== undefined);
            if (candidateRules.length === 0)
                candidateRules = Array.from(this.rules.values());
        }
        const scores = new Map();
        for (const rule of candidateRules) {
            let score = 0;
            for (const kw of rule.keywords) {
                if (haystack.includes(kw))
                    score += 2;
            }
            for (const tech of rule.techClues) {
                if (payload.detectedTechClues.some(c => c.toLowerCase().includes(tech)) || haystack.includes(tech)) {
                    score += 4;
                }
            }
            scores.set(rule.type, score);
        }
        let bestIndustry = 'Other';
        let maxScore = -1;
        for (const [ind, score] of scores.entries()) {
            if (score > maxScore) {
                maxScore = score;
                bestIndustry = ind;
            }
        }
        // Calculate normalized confidence
        const confidence = maxScore >= 8 ? 0.95 : maxScore >= 4 ? 0.84 : maxScore >= 2 ? 0.72 : 0.60;
        const resolvedRule = this.get(bestIndustry);
        return {
            industry: bestIndustry,
            confidence,
            rule: resolvedRule
        };
    }
}
exports.IndustryRuleRegistry = IndustryRuleRegistry;
exports.industryRegistry = new IndustryRuleRegistry();
