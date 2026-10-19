"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeAndDeduplicateContacts = sanitizeAndDeduplicateContacts;
const DISALLOWED_EMAIL_EXTENSIONS = [
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif',
    '.js', '.css', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.pdf', '.zip'
];
const DISALLOWED_EMAIL_DOMAINS = [
    'example.com', 'test.com', 'sample.com', 'yourdomain.com',
    'domain.com', 'mysite.com', 'email.com', 'sentry.io', 'cloudflare.com',
    'wixpress.com', 'shopify.com'
];
const DISALLOWED_EMAIL_PREFIXES = [
    'noreply', 'no-reply', 'donotreply', 'privacy', 'mailer-daemon', 'postmaster'
];
function sanitizeAndDeduplicateContacts(rawContacts, snippetsWithEvidence, pageUrl) {
    const result = [];
    const seenValues = new Set();
    const now = new Date().toISOString();
    // 1. Process Official WhatsApp Business Links
    if (rawContacts.whatsappLinks && Array.isArray(rawContacts.whatsappLinks)) {
        for (const rawWa of rawContacts.whatsappLinks) {
            const cleanWa = rawWa.trim();
            if (!cleanWa || seenValues.has(cleanWa))
                continue;
            seenValues.add(cleanWa);
            result.push({
                id: `wa-${Math.random().toString(36).substring(2, 9)}`,
                type: 'whatsapp',
                value: cleanWa,
                label: 'Official WhatsApp Business Channel',
                sourceType: 'whatsapp_link',
                sourceUrl: pageUrl,
                evidenceSnippet: `Public WhatsApp link on page: ${cleanWa}`,
                confidence: 0.98,
                verificationStatus: 'verified_appropriate_source',
                discoveryDate: now
            });
        }
    }
    // 2. Process Emails
    for (const rawEmail of rawContacts.emails) {
        const cleanEmail = rawEmail.trim().toLowerCase();
        // Check validity
        if (!isValidEmail(cleanEmail))
            continue;
        if (seenValues.has(cleanEmail))
            continue;
        seenValues.add(cleanEmail);
        // Look for matching evidence snippet
        const evidence = findSnippetForContact(cleanEmail, snippetsWithEvidence);
        // Confidence scoring and verification status
        let confidence = 0.85;
        let verificationStatus = 'publicly_listed_unverified';
        if (evidence && (evidence.includes('mailto:') || evidence.includes('Contact:'))) {
            confidence = 0.95;
            verificationStatus = 'verified_appropriate_source';
        }
        else if (cleanEmail.startsWith('hello@') || cleanEmail.startsWith('contact@') || cleanEmail.startsWith('info@')) {
            confidence = 0.90;
            verificationStatus = 'verified_appropriate_source';
        }
        result.push({
            id: `email-${Math.random().toString(36).substring(2, 9)}`,
            type: 'email',
            value: cleanEmail,
            label: 'Public Email',
            sourceType: 'mailto',
            sourceUrl: pageUrl,
            evidenceSnippet: evidence || `Found email reference: ${cleanEmail}`,
            confidence,
            verificationStatus,
            discoveryDate: now
        });
    }
    // 3. Process Phones
    for (const rawPhone of rawContacts.phones) {
        const cleanPhone = sanitizePhone(rawPhone);
        if (!cleanPhone || seenValues.has(cleanPhone))
            continue;
        seenValues.add(cleanPhone);
        const evidence = findSnippetForContact(rawPhone, snippetsWithEvidence);
        result.push({
            id: `phone-${Math.random().toString(36).substring(2, 9)}`,
            type: 'phone',
            value: cleanPhone,
            label: 'Direct Phone',
            sourceType: 'tel',
            sourceUrl: pageUrl,
            evidenceSnippet: evidence || `Found phone reference: ${cleanPhone}`,
            confidence: 0.88,
            verificationStatus: evidence?.includes('tel:') ? 'verified_appropriate_source' : 'publicly_listed_unverified',
            discoveryDate: now
        });
    }
    // 4. Process Social Profiles
    for (const social of rawContacts.socialLinks) {
        const cleanUrl = social.url.trim();
        if (!cleanUrl || seenValues.has(cleanUrl))
            continue;
        if (cleanUrl.includes('/share') || cleanUrl.includes('/intent/tweet') || cleanUrl.includes('sharer.php')) {
            continue;
        }
        const platformType = normalizeSocialPlatform(social.platform, cleanUrl);
        seenValues.add(cleanUrl);
        result.push({
            id: `social-${Math.random().toString(36).substring(2, 9)}`,
            type: platformType,
            value: cleanUrl,
            label: `${platformType.toUpperCase()} Profile`,
            sourceType: 'social_link',
            sourceUrl: pageUrl,
            evidenceSnippet: `Public channel discovered from page link: ${cleanUrl}`,
            confidence: 0.92,
            verificationStatus: 'verified_appropriate_source',
            discoveryDate: now
        });
    }
    // 5. Contact Form URLs
    for (const formUrl of rawContacts.contactFormUrls) {
        const clean = formUrl.trim();
        if (!clean || seenValues.has(clean))
            continue;
        seenValues.add(clean);
        result.push({
            id: `form-${Math.random().toString(36).substring(2, 9)}`,
            type: 'contact_form',
            value: clean,
            label: 'Inquiry / Contact Form',
            sourceType: 'form',
            sourceUrl: pageUrl,
            evidenceSnippet: `Dedicated inquiry channel: ${clean}`,
            confidence: 0.98,
            verificationStatus: 'verified_appropriate_source',
            discoveryDate: now
        });
    }
    // 6. Addresses
    for (const address of rawContacts.addresses) {
        const clean = address.trim();
        if (!clean || clean.length < 5 || seenValues.has(clean))
            continue;
        seenValues.add(clean);
        result.push({
            id: `addr-${Math.random().toString(36).substring(2, 9)}`,
            type: 'address',
            value: clean,
            label: 'Headquarters / Location',
            sourceType: 'text_pattern',
            sourceUrl: pageUrl,
            evidenceSnippet: clean,
            confidence: 0.80,
            verificationStatus: 'publicly_listed_unverified',
            discoveryDate: now
        });
    }
    return result;
}
function isValidEmail(email) {
    if (!email || email.length < 6 || email.length > 254)
        return false;
    if (!email.includes('@') || !email.includes('.'))
        return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
        return false;
    // Reject image or asset file extensions
    for (const ext of DISALLOWED_EMAIL_EXTENSIONS) {
        if (email.includes(ext))
            return false;
    }
    // Reject dummy domains
    const domainPart = email.split('@')[1];
    if (DISALLOWED_EMAIL_DOMAINS.includes(domainPart))
        return false;
    // Reject disallowed prefixes
    const localPart = email.split('@')[0];
    if (DISALLOWED_EMAIL_PREFIXES.includes(localPart))
        return false;
    return true;
}
function sanitizePhone(raw) {
    const digits = raw.replace(/[^\d+]/g, '');
    if (digits.length < 7 || digits.length > 17)
        return null;
    return raw.trim();
}
function normalizeSocialPlatform(platform, url) {
    const lower = (platform + ' ' + url).toLowerCase();
    if (lower.includes('linkedin'))
        return 'linkedin';
    if (lower.includes('twitter') || lower.includes('x.com'))
        return 'twitter';
    if (lower.includes('instagram'))
        return 'instagram';
    if (lower.includes('facebook'))
        return 'facebook';
    if (lower.includes('github'))
        return 'github';
    if (lower.includes('youtube'))
        return 'youtube';
    return 'linkedin';
}
function findSnippetForContact(contactVal, snippets) {
    const match = snippets.find(s => s.text.toLowerCase().includes(contactVal.toLowerCase()) || s.context.toLowerCase().includes(contactVal.toLowerCase()));
    return match ? `${match.context.trim()}` : undefined;
}
