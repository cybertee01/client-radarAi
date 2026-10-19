"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const health_js_1 = __importDefault(require("./routes/health.js"));
const analyze_js_1 = __importDefault(require("./routes/analyze.js"));
const outreach_js_1 = __importDefault(require("./routes/outreach.js"));
const leads_js_1 = __importDefault(require("./routes/leads.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
// CORS configuration to allow Chrome extension and local web dashboards
app.use((0, cors_1.default)({
    origin: true, // Allow chrome-extension:// and local origins
    credentials: true
}));
app.use(express_1.default.json({ limit: '10mb' }));
// Mount routes
app.use('/api/health', health_js_1.default);
app.use('/api/analyze', analyze_js_1.default);
app.use('/api/generate-outreach', outreach_js_1.default);
app.use('/api/leads', leads_js_1.default);
// Root greeting
app.get('/', (req, res) => {
    res.json({
        name: 'ClientRadar AI Backend',
        version: '1.0.0',
        description: 'AI-Powered Sales Intelligence & Client Discovery Service',
        endpoints: {
            health: 'GET /api/health',
            analyze: 'POST /api/analyze',
            outreach: 'POST /api/generate-outreach',
            leads: 'GET, POST /api/leads'
        }
    });
});
// Fallback 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Endpoint not found' });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err);
    res.status(500).json({
        success: false,
        error: err?.message || 'Internal server error'
    });
});
app.listen(PORT, () => {
    console.log(`[ClientRadar AI Backend] Listening on port ${PORT}`);
    console.log(`[ClientRadar AI Backend] Ready to analyze tabs & generate outreach`);
});
exports.default = app;
