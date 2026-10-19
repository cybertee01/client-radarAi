"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzePageWithAI = analyzePageWithAI;
const heuristicEngine_js_1 = require("./heuristicEngine.js");
const outreachGenerator_js_1 = require("./outreachGenerator.js");
async function analyzePageWithAI(payload, userConfig, apiKeyOverride) {
    const provider = apiKeyOverride?.provider || process.env.AI_PROVIDER || 'heuristic';
    const apiKey = apiKeyOverride?.key || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY;
    // If external provider is requested and key exists, try LLM analysis
    if (provider === 'openai' && apiKey) {
        try {
            const openAiResult = await callOpenAiAnalysis(payload, apiKey, userConfig);
            if (openAiResult)
                return openAiResult;
        }
        catch (err) {
            console.warn('OpenAI analysis failed, falling back to heuristic engine:', err);
        }
    }
    else if (provider === 'gemini' && apiKey) {
        try {
            const geminiResult = await callGeminiAnalysis(payload, apiKey, userConfig);
            if (geminiResult)
                return geminiResult;
        }
        catch (err) {
            console.warn('Gemini analysis failed, falling back to heuristic engine:', err);
        }
    }
    // Fast, deterministic, high-accuracy Heuristic Engine
    const lead = (0, heuristicEngine_js_1.runHeuristicAnalysis)(payload, userConfig);
    const recommendedOutreach = (0, outreachGenerator_js_1.generateOutreachDraft)(lead, 'email', 'direct_value', userConfig);
    return {
        success: true,
        lead,
        recommendedOutreach,
        rawConfidence: lead.industryConfidence,
        providerUsed: 'heuristic'
    };
}
async function callOpenAiAnalysis(payload, apiKey, userConfig) {
    const prompt = `Analyze this business webpage data for a B2B sales intelligence tool.
Domain: ${payload.domain}
Title: ${payload.title}
Meta: ${payload.metaDescription}
Headings: ${JSON.stringify(payload.headings)}
Sample text: ${payload.visibleTextSample.substring(0, 1500)}
Detected tech clues: ${JSON.stringify(payload.detectedTechClues)}

Return JSON adhering to standard Lead format with industry classification, leadScore (0-100), painPoints with evidence, services (canDeliver, couldLearn, partnerDelivery).`;
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' }
        })
    });
    if (!res.ok)
        return null;
    const data = (await res.json());
    const parsed = JSON.parse(data.choices[0].message.content);
    // Merge with our safe heuristics for contacts and fallback structures
    const baseLead = (0, heuristicEngine_js_1.runHeuristicAnalysis)(payload, userConfig);
    const lead = {
        ...baseLead,
        companyName: parsed.companyName || baseLead.companyName,
        industry: parsed.industry || baseLead.industry,
        leadScore: typeof parsed.leadScore === 'number' ? parsed.leadScore : baseLead.leadScore,
        painPoints: Array.isArray(parsed.painPoints) && parsed.painPoints.length > 0 ? parsed.painPoints : baseLead.painPoints
    };
    const draft = (0, outreachGenerator_js_1.generateOutreachDraft)(lead, 'email', 'direct_value', userConfig);
    return {
        success: true,
        lead,
        recommendedOutreach: draft,
        rawConfidence: 0.95,
        providerUsed: 'openai'
    };
}
async function callGeminiAnalysis(payload, apiKey, userConfig) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const prompt = `Analyze this webpage for sales intelligence:
Domain: ${payload.domain}
Title: ${payload.title}
Text: ${payload.visibleTextSample.substring(0, 1500)}
Return JSON with companyName, industry, leadScore (0-100), painPoints.`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
        })
    });
    if (!res.ok)
        return null;
    const data = (await res.json());
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text)
        return null;
    const parsed = JSON.parse(text);
    const baseLead = (0, heuristicEngine_js_1.runHeuristicAnalysis)(payload, userConfig);
    const lead = {
        ...baseLead,
        companyName: parsed.companyName || baseLead.companyName,
        industry: parsed.industry || baseLead.industry,
        leadScore: typeof parsed.leadScore === 'number' ? parsed.leadScore : baseLead.leadScore
    };
    const draft = (0, outreachGenerator_js_1.generateOutreachDraft)(lead, 'email', 'direct_value', userConfig);
    return {
        success: true,
        lead,
        recommendedOutreach: draft,
        rawConfidence: 0.92,
        providerUsed: 'gemini'
    };
}
