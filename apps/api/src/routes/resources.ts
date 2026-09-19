import { Router } from 'express';
import prisma from '../services/prisma';

const router = Router();

// GET /api/resources
router.get('/', async (_req, res, next) => {
  try {
    const resources = await prisma.resource.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
    res.json({ success: true, data: resources });
  } catch (e) { next(e); }
});

export default router;
