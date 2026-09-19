"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchService_1 = require("../services/searchService");
const router = (0, express_1.Router)();
// GET /api/search?q=
router.get('/', async (req, res, next) => {
    try {
        const q = String(req.query.q ?? '').trim();
        if (!q)
            return res.json({ success: true, data: { matched: null, alternatives: [], hasVerifiedInfo: false } });
        const result = await (0, searchService_1.searchSituations)(q);
        res.json({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
