"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const aiService_js_1 = require("../services/aiService.js");
const storageService_js_1 = require("../services/storageService.js");
const router = (0, express_1.Router)();
const analyzeSchema = zod_1.z.object({
    payload: zod_1.z.object({
        url: zod_1.z.string(),
        domain: zod_1.z.string(),
        title: zod_1.z.string(),
        sourceType: zod_1.z.enum(['business_website', 'job_post', 'public_discussion', 'startup_page', 'manual_entry']).optional().default('business_website'),
        metaDescription: zod_1.z.string().optional(),
        metaKeywords: zod_1.z.string().optional(),
        openGraph: zod_1.z.record(zod_1.z.string()).optional(),
        headings: zod_1.z.object({
            h1: zod_1.z.array(zod_1.z.string()),
            h2: zod_1.z.array(zod_1.z.string()),
            h3: zod_1.z.array(zod_1.z.string())
        }),
        visibleTextSample: zod_1.z.string(),
        rawContacts: zod_1.z.object({
            emails: zod_1.z.array(zod_1.z.string()),
            phones: zod_1.z.array(zod_1.z.string()),
            whatsappLinks: zod_1.z.array(zod_1.z.string()).optional(),
            socialLinks: zod_1.z.array(zod_1.z.object({ platform: zod_1.z.string(), url: zod_1.z.string() })),
            contactFormUrls: zod_1.z.array(zod_1.z.string()),
            addresses: zod_1.z.array(zod_1.z.string())
        }),
        detectedTechClues: zod_1.z.array(zod_1.z.string()),
        snippetsWithEvidence: zod_1.z.array(zod_1.z.object({
            text: zod_1.z.string(),
            selector: zod_1.z.string().optional(),
            context: zod_1.z.string()
        })),
        publicationDate: zod_1.z.string().optional(),
        statedBudget: zod_1.z.string().optional(),
        jobTitle: zod_1.z.string().optional()
    }),
    userConfig: zod_1.z.object({
        myRole: zod_1.z.string().optional(),
        coreSkills: zod_1.z.array(zod_1.z.string()).optional(),
        learningSkills: zod_1.z.array(zod_1.z.string()).optional(),
        partnerSkills: zod_1.z.array(zod_1.z.string()).optional(),
        targetIndustryMode: zod_1.z.enum(['all', 'single', 'multiple']).optional(),
        selectedIndustries: zod_1.z.array(zod_1.z.any()).optional(),
        senderName: zod_1.z.string().optional(),
        senderCompanyOrTitle: zod_1.z.string().optional()
    }).optional(),
    apiKeyOverride: zod_1.z.object({
        provider: zod_1.z.string().optional(),
        key: zod_1.z.string().optional()
    }).optional()
});
router.post('/', async (req, res) => {
    try {
        const parsed = analyzeSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                error: 'Invalid request payload structure',
                details: parsed.error.format()
            });
        }
        const { payload, userConfig, apiKeyOverride } = parsed.data;
        const analysis = await (0, aiService_js_1.analyzePageWithAI)(payload, userConfig, apiKeyOverride);
        // Persist lead to storage
        storageService_js_1.storageService.save(analysis.lead);
        res.json(analysis);
    }
    catch (error) {
        console.error('Error during page analysis:', error);
        res.status(500).json({
            success: false,
            error: error?.message || 'Internal analysis engine error'
        });
    }
});
exports.default = router;
