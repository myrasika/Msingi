"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../services/prisma"));
const router = (0, express_1.Router)();
// GET /api/resources
router.get('/', async (_req, res, next) => {
    try {
        const resources = await prisma_1.default.resource.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        });
        res.json({ success: true, data: resources });
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
