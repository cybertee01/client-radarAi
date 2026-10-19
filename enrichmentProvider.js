"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrichmentManager = exports.EnrichmentManager = exports.FallbackEnrichmentProvider = exports.HunterEnrichmentProvider = void 0;
class HunterEnrichmentProvider {
    name = 'Hunter.io API';
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey || process.env.HUNTER_API_KEY;
    }
    isConfigured() {
        return Boolean(this.apiKey && this.apiKey.trim().length > 0);
    }
    async enrichDomain(domain) {
        if (!this.isConfigured())
            return [];
        try {
            const url = `https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(domain)}&api_key=${this.apiKey}`;
            const res = await fetch(url);
            if (!res.ok)
                return [];
            const data = (await res.json());
            const emails = data.data?.emails || [];
            return emails.slice(0, 5).map(e => ({
                id: `enrich_${Math.random().toString(36).substring(2, 8)}`,
                type: 'email',
                value: e.value,
                label: e.position ? `${e.position} (${e.first_name || ''} ${e.last_name || ''})`.trim() : 'Enriched Contact',
                sourceType: 'enrichment_api',
                sourceUrl: `https://${domain}`,
                evidenceSnippet: `Enriched via authorized provider (${e.confidence || 90}% confidence)`,
                confidence: (e.confidence || 90) / 100,
                verificationStatus: 'verified_appropriate_source',
                discoveryDate: new Date().toISOString()
            }));
        }
        catch (err) {
            console.warn('Enrichment API lookup failed:', err);
            return [];
        }
    }
}
exports.HunterEnrichmentProvider = HunterEnrichmentProvider;
class FallbackEnrichmentProvider {
    name = 'Public Web Discovery (Default)';
    isConfigured() {
        return true; // Always active
    }
    async enrichDomain() {
        return []; // No external calls, relies on public DOM discovery
    }
}
exports.FallbackEnrichmentProvider = FallbackEnrichmentProvider;
class EnrichmentManager {
    providers = [];
    constructor() {
        this.providers.push(new HunterEnrichmentProvider());
        this.providers.push(new FallbackEnrichmentProvider());
    }
    registerProvider(provider) {
        this.providers.unshift(provider);
    }
    async enrich(domain) {
        for (const provider of this.providers) {
            if (provider.isConfigured()) {
                const results = await provider.enrichDomain(domain);
                if (results.length > 0)
                    return results;
            }
        }
        return [];
    }
}
exports.EnrichmentManager = EnrichmentManager;
exports.enrichmentManager = new EnrichmentManager();
