"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../services/prisma"));
const router = (0, express_1.Router)();
// GET /api/saved?deviceId=
router.get('/', async (req, res, next) => {
    try {
        const { deviceId } = req.query;
        if (!deviceId)
            return res.status(400).json({ success: false, error: 'deviceId is required' });
        const saved = await prisma_1.default.savedItem.findMany({
            where: { deviceId },
            include: { situation: { include: { category: true } } },
            orderBy: { createdAt: 'desc' },
        });
        res.json({ success: true, data: saved });
    }
    catch (e) {
        next(e);
    }
});
// POST /api/saved
router.post('/', async (req, res, next) => {
    try {
        const { deviceId, situationId } = req.body;
        if (!deviceId || !situationId)
            return res.status(400).json({ success: false, error: 'deviceId and situationId are required' });
        const item = await prisma_1.default.savedItem.upsert({
            where: { deviceId_situationId: { deviceId, situationId } },
            update: {},
            create: { deviceId, situationId },
        });
        res.json({ success: true, data: item });
    }
    catch (e) {
        next(e);
    }
});
// DELETE /api/saved
router.delete('/', async (req, res, next) => {
    try {
        const { deviceId, situationId } = req.body;
        if (!deviceId || !situationId)
            return res.status(400).json({ success: false, error: 'deviceId and situationId are required' });
        await prisma_1.default.savedItem.deleteMany({ where: { deviceId, situationId } });
        res.json({ success: true, data: null });
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
