import { Router } from 'express';
import prisma from '../services/prisma';

const router = Router();

// GET /api/legal-sources/:id
router.get('/:id', async (req, res, next) => {
  try {
    const source = await prisma.legalSource.findUnique({
      where: { id: req.params.id },
      include: { sections: true },
    });
    if (!source) return res.status(404).json({ success: false, error: 'Legal source not found' });
    res.json({ success: true, data: source });
  } catch (e) { next(e); }
});

// GET /api/legal-sources/:id/sections/:sectionId
router.get('/:id/sections/:sectionId', async (req, res, next) => {
  try {
    const section = await prisma.legalSection.findFirst({
      where: { id: req.params.sectionId, legalSourceId: req.params.id },
      include: { legalSource: true },
    });
    if (!section) return res.status(404).json({ success: false, error: 'Section not found' });
    res.json({ success: true, data: section });
  } catch (e) { next(e); }
});

export default router;
