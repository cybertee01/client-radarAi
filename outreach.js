"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const outreachGenerator_js_1 = require("../services/outreachGenerator.js");
const storageService_js_1 = require("../services/storageService.js");
const router = (0, express_1.Router)();
const outreachSchema = zod_1.z.object({
    leadId: zod_1.z.string().optional(),
    lead: zod_1.z.any().optional(),
    channel: zod_1.z.enum(['email', 'linkedin_connect', 'linkedin_inmail', 'cold_dm', 'audit_report']).default('email'),
    tone: zod_1.z.enum(['direct_value', 'consultative', 'casual', 'authoritative', 'quick_question']).default('direct_value'),
    userConfig: zod_1.z.object({
        senderName: zod_1.z.string().optional(),
        senderCompanyOrTitle: zod_1.z.string().optional()
    }).optional()
});
router.post('/', (req, res) => {
    try {
        const parsed = outreachSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                error: 'Invalid outreach request parameters',
                details: parsed.error.format()
            });
        }
        const { leadId, lead: providedLead, channel, tone, userConfig } = parsed.data;
        let targetLead = providedLead;
        if (!targetLead && leadId) {
            targetLead = storageService_js_1.storageService.getById(leadId);
        }
        if (!targetLead) {
            return res.status(404).json({
                success: false,
                error: 'Lead not found to generate outreach for'
            });
        }
        const draft = (0, outreachGenerator_js_1.generateOutreachDraft)(targetLead, channel, tone, userConfig);
        res.json({
            success: true,
            draft
        });
    }
    catch (error) {
        console.error('Error generating outreach draft:', error);
        res.status(500).json({
            success: false,
            error: error?.message || 'Failed to generate outreach'
        });
    }
});
exports.default = router;
