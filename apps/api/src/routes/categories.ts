import { Router } from 'express';
import prisma from '../services/prisma';

const router = Router();

// GET /api/categories
router.get('/', async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
    res.json({ success: true, data: categories });
  } catch (e) { next(e); }
});

// GET /api/categories/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        situations: {
          where: { isActive: true },
          orderBy: { title: 'asc' },
        },
      },
    });
    if (!category) return res.status(404).json({ success: false, error: 'Category not found' });
    res.json({ success: true, data: category });
  } catch (e) { next(e); }
});

export default router;
