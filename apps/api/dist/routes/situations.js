"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../services/prisma"));
const aiService_1 = require("../ai/aiService");
const router = (0, express_1.Router)();
const situationInclude = {
    category: true,
    legalSections: {
        orderBy: { priority: 'asc' },
        include: {
            legalSection: {
                include: { legalSource: true },
            },
        },
    },
    actions: { orderBy: { stepNumber: 'asc' } },
    explanations: {
        where: { reviewStatus: 'PUBLISHED' },
    },
};
// POST /api/situations/classify
router.post('/classify', async (req, res, next) => {
    try {
        const { query } = req.body;
        if (!query?.trim())
            return res.status(400).json({ success: false, error: 'query is required' });
        const result = await (0, aiService_1.classifySituation)(query.trim());
        res.json({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
});
// GET /api/situations/:slug
router.get('/:slug', async (req, res, next) => {
    try {
        const situation = await prisma_1.default.situation.findUnique({
            where: { slug: req.params.slug },
            include: situationInclude,
        });
        if (!situation)
            return res.status(404).json({ success: false, error: 'Situation not found' });
        res.json({ success: true, data: situation });
    }
    catch (e) {
        next(e);
    }
});
// GET /api/situations/:slug/legal-sources
router.get('/:slug/legal-sources', async (req, res, next) => {
    try {
        const situation = await prisma_1.default.situation.findUnique({
            where: { slug: req.params.slug },
            include: {
                legalSections: {
                    orderBy: { priority: 'asc' },
                    include: { legalSection: { include: { legalSource: true } } },
                },
            },
        });
        if (!situation)
            return res.status(404).json({ success: false, error: 'Situation not found' });
        res.json({ success: true, data: situation.legalSections });
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
