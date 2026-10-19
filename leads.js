"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storageService_js_1 = require("../services/storageService.js");
const router = (0, express_1.Router)();
// GET all leads with filtering
router.get('/', (req, res) => {
    const { industry, status, search } = req.query;
    const leads = storageService_js_1.storageService.getAll(industry, status, search);
    res.json({
        success: true,
        total: leads.length,
        leads
    });
});
// GET single lead
router.get('/:id', (req, res) => {
    const lead = storageService_js_1.storageService.getById(req.params.id);
    if (!lead) {
        return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.json({ success: true, lead });
});
// POST save lead
router.post('/', (req, res) => {
    const leadData = req.body;
    if (!leadData || !leadData.domain || !leadData.companyName) {
        return res.status(400).json({ success: false, error: 'Missing required lead fields' });
    }
    const saved = storageService_js_1.storageService.save(leadData);
    res.status(201).json({ success: true, lead: saved });
});
// PATCH update lead
router.patch('/:id', (req, res) => {
    const updated = storageService_js_1.storageService.update(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ success: false, error: 'Lead not found to update' });
    }
    res.json({ success: true, lead: updated });
});
// DELETE remove lead
router.delete('/:id', (req, res) => {
    const deleted = storageService_js_1.storageService.delete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ success: false, error: 'Lead not found to delete' });
    }
    res.json({ success: true, message: 'Lead deleted successfully' });
});
exports.default = router;
