"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../services/prisma"));
const router = (0, express_1.Router)();
// GET /api/categories
router.get('/', async (_req, res, next) => {
    try {
        const categories = await prisma_1.default.category.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        });
        res.json({ success: true, data: categories });
    }
    catch (e) {
        next(e);
    }
});
// GET /api/categories/:slug
router.get('/:slug', async (req, res, next) => {
    try {
        const category = await prisma_1.default.category.findUnique({
            where: { slug: req.params.slug },
            include: {
                situations: {
                    where: { isActive: true },
                    orderBy: { title: 'asc' },
                },
            },
        });
        if (!category)
            return res.status(404).json({ success: false, error: 'Category not found' });
        res.json({ success: true, data: category });
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
