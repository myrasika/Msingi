"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../services/prisma"));
const aiService_1 = require("../ai/aiService");
const router = (0, express_1.Router)();
// POST /api/explanations/generate
router.post('/generate', async (req, res, next) => {
    try {
        const { situationId, language = 'en' } = req.body;
        if (!situationId)
            return res.status(400).json({ success: false, error: 'situationId is required' });
        const situation = await prisma_1.default.situation.findUnique({
            where: { id: situationId },
            include: {
                legalSections: {
                    orderBy: { priority: 'asc' },
                    include: { legalSection: { include: { legalSource: true } } },
                },
            },
        });
        if (!situation)
            return res.status(404).json({ success: false, error: 'Situation not found' });
        const sections = situation.legalSections.map((s) => s.legalSection);
        const generated = await (0, aiService_1.simplifyLegalText)(sections, language, situation.title);
        // Store as AI_GENERATED — requires human review before PUBLISHED
        const explanation = await prisma_1.default.explanation.upsert({
            where: { situationId_language: { situationId, language: language } },
            update: { ...generated, reviewStatus: 'AI_GENERATED', generatedBy: process.env.OPENAI_MODEL ?? 'gpt-4o-mini' },
            create: {
                situationId,
                language: language,
                ...generated,
                reviewStatus: 'AI_GENERATED',
                generatedBy: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
            },
        });
        res.json({ success: true, data: explanation });
    }
    catch (e) {
        next(e);
    }
});
// POST /api/explanations/validate
router.post('/validate', async (req, res, next) => {
    try {
        const { explanationId } = req.body;
        if (!explanationId)
            return res.status(400).json({ success: false, error: 'explanationId is required' });
        const explanation = await prisma_1.default.explanation.findUnique({
            where: { id: explanationId },
            include: {
                situation: {
                    include: {
                        legalSections: { include: { legalSection: true } },
                    },
                },
            },
        });
        if (!explanation)
            return res.status(404).json({ success: false, error: 'Explanation not found' });
        const sections = explanation.situation.legalSections.map((s) => s.legalSection);
        const valid = await (0, aiService_1.validateExplanation)(explanation, sections);
        res.json({ success: true, data: { valid, explanationId } });
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
