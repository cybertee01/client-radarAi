"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({
        status: 'healthy',
        product: 'ClientRadar AI Backend',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        aiProvider: process.env.AI_PROVIDER || 'heuristic',
        storage: 'local-memory-with-supabase-support'
    });
});
exports.default = router;
