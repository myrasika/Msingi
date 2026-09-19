import { Router } from 'express';
import prisma from '../services/prisma';
import { classifySituation } from '../ai/aiService';

const router = Router();

const situationInclude = {
  category: true,
  legalSections: {
    orderBy: { priority: 'asc' as const },
    include: {
      legalSection: {
        include: { legalSource: true },
      },
    },
  },
  actions: { orderBy: { stepNumber: 'asc' as const } },
  explanations: {
    where: { reviewStatus: 'PUBLISHED' as const },
  },
};

// POST /api/situations/classify
router.post('/classify', async (req, res, next) => {
  try {
    const { query } = req.body as { query?: string };
    if (!query?.trim()) return res.status(400).json({ success: false, error: 'query is required' });

    const result = await classifySituation(query.trim());
    res.json({ success: true, data: result });
  } catch (e) { next(e); }
});

// GET /api/situations/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const situation = await prisma.situation.findUnique({
      where: { slug: req.params.slug },
      include: situationInclude,
    });
    if (!situation) return res.status(404).json({ success: false, error: 'Situation not found' });
    res.json({ success: true, data: situation });
  } catch (e) { next(e); }
});

// GET /api/situations/:slug/legal-sources
router.get('/:slug/legal-sources', async (req, res, next) => {
  try {
    const situation = await prisma.situation.findUnique({
      where: { slug: req.params.slug },
      include: {
        legalSections: {
          orderBy: { priority: 'asc' as const },
          include: { legalSection: { include: { legalSource: true } } },
        },
      },
    });
    if (!situation) return res.status(404).json({ success: false, error: 'Situation not found' });
    res.json({ success: true, data: situation.legalSections });
  } catch (e) { next(e); }
});

export default router;
