"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectCountryFromPayload = detectCountryFromPayload;
const TLD_COUNTRY_MAP = {
    'uk': { country: 'United Kingdom', countryCode: 'GB' },
    'co.uk': { country: 'United Kingdom', countryCode: 'GB' },
    'ca': { country: 'Canada', countryCode: 'CA' },
    'au': { country: 'Australia', countryCode: 'AU' },
    'com.au': { country: 'Australia', countryCode: 'AU' },
    'de': { country: 'Germany', countryCode: 'DE' },
    'fr': { country: 'France', countryCode: 'FR' },
    'es': { country: 'Spain', countryCode: 'ES' },
    'it': { country: 'Italy', countryCode: 'IT' },
    'nl': { country: 'Netherlands', countryCode: 'NL' },
    'ae': { country: 'United Arab Emirates', countryCode: 'AE' },
    'sg': { country: 'Singapore', countryCode: 'SG' },
    'ch': { country: 'Switzerland', countryCode: 'CH' },
    'se': { country: 'Sweden', countryCode: 'SE' },
    'no': { country: 'Norway', countryCode: 'NO' },
    'dk': { country: 'Denmark', countryCode: 'DK' },
    'ie': { country: 'Ireland', countryCode: 'IE' },
    'nz': { country: 'New Zealand', countryCode: 'NZ' },
    'za': { country: 'South Africa', countryCode: 'ZA' },
    'in': { country: 'India', countryCode: 'IN' },
    'br': { country: 'Brazil', countryCode: 'BR' },
    'mx': { country: 'Mexico', countryCode: 'MX' }
};
const PHONE_PREFIX_MAP = [
    { prefix: '+44', country: 'United Kingdom', code: 'GB' },
    { prefix: '+33', country: 'France', code: 'FR' },
    { prefix: '+49', country: 'Germany', code: 'DE' },
    { prefix: '+61', country: 'Australia', code: 'AU' },
    { prefix: '+34', country: 'Spain', code: 'ES' },
    { prefix: '+39', country: 'Italy', code: 'IT' },
    { prefix: '+31', country: 'Netherlands', code: 'NL' },
    { prefix: '+971', country: 'United Arab Emirates', code: 'AE' },
    { prefix: '+65', country: 'Singapore', code: 'SG' },
    { prefix: '+41', country: 'Switzerland', code: 'CH' },
    { prefix: '+46', country: 'Sweden', code: 'SE' },
    { prefix: '+47', country: 'Norway', code: 'NO' },
    { prefix: '+45', country: 'Denmark', code: 'DK' },
    { prefix: '+353', country: 'Ireland', code: 'IE' },
    { prefix: '+64', country: 'New Zealand', code: 'NZ' },
    { prefix: '+27', country: 'South Africa', code: 'ZA' },
    { prefix: '+91', country: 'India', code: 'IN' },
    { prefix: '+81', country: 'Japan', code: 'JP' },
    { prefix: '+1', country: 'United States / Canada', code: 'US' }
];
const KNOWN_US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];
function detectCountryFromPayload(payload) {
    // 1. Check JSON-LD structured data for official Organization headquarters
    if (payload.jsonLdData && payload.jsonLdData.length > 0) {
        for (const schema of payload.jsonLdData) {
            if (schema && typeof schema === 'object') {
                const address = schema.address || schema.location?.address;
                if (address) {
                    const country = address.addressCountry || address.country;
                    if (country) {
                        const countryStr = typeof country === 'string' ? country : country.name;
                        return {
                            country: countryStr,
                            countryCode: typeof country === 'string' && country.length === 2 ? country.toUpperCase() : undefined,
                            confidence: 0.98,
                            evidence: `Declared in JSON-LD Organization schema (${schema['@type'] || 'Organization'})`,
                            isHeadquarters: true
                        };
                    }
                }
            }
        }
    }
    // 2. Check explicit physical address strings in payload
    for (const rawAddr of payload.rawContacts.addresses) {
        const addr = rawAddr.trim();
        // Look for explicit country mention
        if (addr.includes('United States') || addr.includes('USA') || addr.includes('U.S.A.')) {
            return {
                country: 'United States',
                countryCode: 'US',
                confidence: 0.92,
                evidence: `Discovered in physical business address: "${addr}"`,
                isHeadquarters: true
            };
        }
        if (addr.includes('United Kingdom') || addr.includes('UK') || addr.includes('London')) {
            return {
                country: 'United Kingdom',
                countryCode: 'GB',
                confidence: 0.90,
                evidence: `Discovered in business address: "${addr}"`,
                isHeadquarters: true
            };
        }
        if (addr.includes('Canada') || addr.includes('Toronto') || addr.includes('Vancouver')) {
            return {
                country: 'Canada',
                countryCode: 'CA',
                confidence: 0.90,
                evidence: `Discovered in business address: "${addr}"`,
                isHeadquarters: true
            };
        }
        if (addr.includes('Australia') || addr.includes('Sydney') || addr.includes('Melbourne')) {
            return {
                country: 'Australia',
                countryCode: 'AU',
                confidence: 0.90,
                evidence: `Discovered in business address: "${addr}"`,
                isHeadquarters: true
            };
        }
        // Check US state abbreviations (e.g., "Austin, TX", "New York, NY")
        for (const st of KNOWN_US_STATES) {
            const statePattern = new RegExp(`[,\\s]${st}\\b(?:\\s+\\d{5})?`);
            if (statePattern.test(addr)) {
                return {
                    country: 'United States',
                    countryCode: 'US',
                    confidence: 0.88,
                    evidence: `Discovered in address with state code (${st}): "${addr}"`,
                    isHeadquarters: true
                };
            }
        }
    }
    // 3. Check Phone Number International Prefix
    for (const phone of payload.rawContacts.phones) {
        const cleanPhone = phone.trim();
        for (const item of PHONE_PREFIX_MAP) {
            if (cleanPhone.startsWith(item.prefix)) {
                return {
                    country: item.country,
                    countryCode: item.code,
                    confidence: 0.85,
                    evidence: `Inferred from official direct phone prefix (${item.prefix}): ${cleanPhone}`,
                    isHeadquarters: false // Phone could be regional line
                };
            }
        }
    }
    // 4. Check domain ccTLD
    const hostParts = payload.domain.toLowerCase().split('.');
    if (hostParts.length >= 2) {
        const tld = hostParts.slice(-1)[0];
        const secondLevelTld = hostParts.length >= 3 ? `${hostParts[hostParts.length - 2]}.${tld}` : '';
        if (secondLevelTld && TLD_COUNTRY_MAP[secondLevelTld]) {
            const match = TLD_COUNTRY_MAP[secondLevelTld];
            return {
                country: match.country,
                countryCode: match.countryCode,
                confidence: 0.80,
                evidence: `Inferred from country-code domain extension (.${secondLevelTld})`,
                isHeadquarters: false
            };
        }
        if (TLD_COUNTRY_MAP[tld]) {
            const match = TLD_COUNTRY_MAP[tld];
            return {
                country: match.country,
                countryCode: match.countryCode,
                confidence: 0.78,
                evidence: `Inferred from country-code domain extension (.${tld})`,
                isHeadquarters: false
            };
        }
    }
    // 5. Default fallback if no location data is present (No fabrication)
    return {
        country: 'International / Remote',
        countryCode: undefined,
        confidence: 0.50,
        evidence: 'No explicit physical location declared on page',
        isHeadquarters: false
    };
}
