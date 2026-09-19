import { Router } from 'express';
import { searchSituations } from '../services/searchService';

const router = Router();

// GET /api/search?q=
router.get('/', async (req, res, next) => {
  try {
    const q = String(req.query.q ?? '').trim();
    if (!q) return res.json({ success: true, data: { matched: null, alternatives: [], hasVerifiedInfo: false } });

    const result = await searchSituations(q);
    res.json({ success: true, data: result });
  } catch (e) { next(e); }
});

export default router;
