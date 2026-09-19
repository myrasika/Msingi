"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../services/prisma"));
const router = (0, express_1.Router)();
// GET /api/legal-sources/:id
router.get('/:id', async (req, res, next) => {
    try {
        const source = await prisma_1.default.legalSource.findUnique({
            where: { id: req.params.id },
            include: { sections: true },
        });
        if (!source)
            return res.status(404).json({ success: false, error: 'Legal source not found' });
        res.json({ success: true, data: source });
    }
    catch (e) {
        next(e);
    }
});
// GET /api/legal-sources/:id/sections/:sectionId
router.get('/:id/sections/:sectionId', async (req, res, next) => {
    try {
        const section = await prisma_1.default.legalSection.findFirst({
            where: { id: req.params.sectionId, legalSourceId: req.params.id },
            include: { legalSource: true },
        });
        if (!section)
            return res.status(404).json({ success: false, error: 'Section not found' });
        res.json({ success: true, data: section });
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
