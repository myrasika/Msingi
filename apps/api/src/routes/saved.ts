import { Router } from 'express';
import prisma from '../services/prisma';

const router = Router();

// GET /api/saved?deviceId=
router.get('/', async (req, res, next) => {
  try {
    const { deviceId } = req.query as { deviceId?: string };
    if (!deviceId) return res.status(400).json({ success: false, error: 'deviceId is required' });

    const saved = await prisma.savedItem.findMany({
      where: { deviceId },
      include: { situation: { include: { category: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: saved });
  } catch (e) { next(e); }
});

// POST /api/saved
router.post('/', async (req, res, next) => {
  try {
    const { deviceId, situationId } = req.body as { deviceId?: string; situationId?: string };
    if (!deviceId || !situationId) return res.status(400).json({ success: false, error: 'deviceId and situationId are required' });

    const item = await prisma.savedItem.upsert({
      where: { deviceId_situationId: { deviceId, situationId } },
      update: {},
      create: { deviceId, situationId },
    });
    res.json({ success: true, data: item });
  } catch (e) { next(e); }
});

// DELETE /api/saved
router.delete('/', async (req, res, next) => {
  try {
    const { deviceId, situationId } = req.body as { deviceId?: string; situationId?: string };
    if (!deviceId || !situationId) return res.status(400).json({ success: false, error: 'deviceId and situationId are required' });

    await prisma.savedItem.deleteMany({ where: { deviceId, situationId } });
    res.json({ success: true, data: null });
  } catch (e) { next(e); }
});

export default router;
