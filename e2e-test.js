"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// End-to-end integration test against live running backend
const http_1 = __importDefault(require("http"));
function makeRequest(method, path, body) {
    return new Promise((resolve, reject) => {
        const payload = body ? JSON.stringify(body) : undefined;
        const req = http_1.default.request({
            hostname: 'localhost',
            port: 3001,
            path,
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
            }
        }, (res) => {
            let raw = '';
            res.on('data', chunk => raw += chunk);
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode || 500, data: JSON.parse(raw) });
                }
                catch {
                    resolve({ statusCode: res.statusCode || 500, data: raw });
                }
            });
        });
        req.on('error', reject);
        if (payload)
            req.write(payload);
        req.end();
    });
}
async function runE2eTests() {
    console.log('🚀 Running Live E2E Integration Tests against http://localhost:3001...\n');
    // 1. Health Check
    console.log('1️⃣ Testing GET /api/health...');
    const health = await makeRequest('GET', '/api/health');
    if (health.statusCode === 200 && health.data.status === 'healthy') {
        console.log('   ✅ Health endpoint passed: v' + health.data.version);
    }
    else {
        throw new Error('Health check failed: ' + JSON.stringify(health));
    }
    // 2. Analyze Endpoint
    console.log('\n2️⃣ Testing POST /api/analyze...');
    const analyzePayload = {
        payload: {
            url: 'https://aurora-skincare.com/products/moisturizer',
            domain: 'aurora-skincare.com',
            title: 'Aurora Skincare - Clinical Barrier Repair Moisturizer',
            metaDescription: 'Hydrating ceramide barrier cream. Free shipping over $40. Cruelty free.',
            headings: {
                h1: ['Clinical Barrier Repair Moisturizer'],
                h2: ['Active Ingredients', 'Customer Results', 'Subscribe and Save 15%'],
                h3: ['Ceramides + Hyaluronic Acid']
            },
            visibleTextSample: 'Add to cart. Subscribe and save. Clean vegan skincare fragrance free.',
            rawContacts: {
                emails: ['partnerships@aurora-skincare.com', 'team@aurora-skincare.com'],
                phones: ['+1 (800) 555-0199'],
                socialLinks: [
                    { platform: 'instagram', url: 'https://instagram.com/auroraskincare' },
                    { platform: 'linkedin', url: 'https://linkedin.com/company/auroraskincare' }
                ],
                contactFormUrls: ['https://aurora-skincare.com/pages/contact'],
                addresses: ['Los Angeles, CA']
            },
            detectedTechClues: ['shopify', 'klaviyo', 'recharge', 'google-analytics'],
            snippetsWithEvidence: [
                { text: 'partnerships@aurora-skincare.com', context: 'Press & Wholesales: partnerships@aurora-skincare.com' }
            ]
        },
        userConfig: {
            myRole: 'Growth & CRO Consultant',
            senderName: 'Alex Mercer',
            senderCompanyOrTitle: 'Principal Growth Advisor'
        }
    };
    const analyzeRes = await makeRequest('POST', '/api/analyze', analyzePayload);
    if (analyzeRes.statusCode === 200 && analyzeRes.data.success) {
        const lead = analyzeRes.data.lead;
        console.log(`   ✅ Analysis succeeded!`);
        console.log(`      - Company: ${lead.companyName}`);
        console.log(`      - Industry: ${lead.industry} (Score: ${lead.leadScore}/100)`);
        console.log(`      - Deliverable Services: ${lead.services.canDeliver.length}`);
        console.log(`      - Upskill Opportunities: ${lead.services.couldLearn.length}`);
        console.log(`      - Partner Delivery: ${lead.services.partnerDelivery.length}`);
        console.log(`      - Verified Contacts: ${lead.contacts.length}`);
    }
    else {
        throw new Error('Analyze failed: ' + JSON.stringify(analyzeRes));
    }
    // 3. Generate Outreach Endpoint
    console.log('\n3️⃣ Testing POST /api/generate-outreach...');
    const outreachPayload = {
        lead: analyzeRes.data.lead,
        channel: 'linkedin_connect',
        tone: 'direct_value',
        userConfig: { senderName: 'Alex Mercer' }
    };
    const outreachRes = await makeRequest('POST', '/api/generate-outreach', outreachPayload);
    if (outreachRes.statusCode === 200 && outreachRes.data.success) {
        console.log('   ✅ Outreach generated successfully:');
        console.log(`      "${outreachRes.data.draft.body}"`);
    }
    else {
        throw new Error('Outreach generation failed: ' + JSON.stringify(outreachRes));
    }
    // 4. List Leads
    console.log('\n4️⃣ Testing GET /api/leads...');
    const leadsRes = await makeRequest('GET', '/api/leads');
    if (leadsRes.statusCode === 200 && leadsRes.data.total >= 1) {
        console.log(`   ✅ Lead listing passed: ${leadsRes.data.total} total leads in storage.`);
    }
    else {
        throw new Error('Leads listing failed: ' + JSON.stringify(leadsRes));
    }
    console.log('\n🎉 ALL LIVE E2E INTEGRATION TESTS PASSED WITH 100% SUCCESS!\n');
}
runE2eTests().catch(err => {
    console.error('❌ E2E Test Failure:', err);
    process.exit(1);
});
