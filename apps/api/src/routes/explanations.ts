import { Router } from 'express';
import prisma from '../services/prisma';
import { classifySituation, simplifyLegalText, validateExplanation } from '../ai/aiService';

const router = Router();

// POST /api/explanations/generate
router.post('/generate', async (req, res, next) => {
  try {
    const { situationId, language = 'en' } = req.body as { situationId?: string; language?: string };
    if (!situationId) return res.status(400).json({ success: false, error: 'situationId is required' });

    const situation = await prisma.situation.findUnique({
      where: { id: situationId },
      include: {
        legalSections: {
          orderBy: { priority: 'asc' as const },
          include: { legalSection: { include: { legalSource: true } } },
        },
      },
    });
    if (!situation) return res.status(404).json({ success: false, error: 'Situation not found' });

    const sections = situation.legalSections.map((s: { legalSection: any }) => s.legalSection);
    const generated = await simplifyLegalText(sections, language as 'en' | 'sw', situation.title);

    // Store as AI_GENERATED — requires human review before PUBLISHED
    const explanation = await prisma.explanation.upsert({
      where: { situationId_language: { situationId, language: language as 'en' | 'sw' } },
      update: { ...generated, reviewStatus: 'AI_GENERATED', generatedBy: process.env.OPENAI_MODEL ?? 'gpt-4o-mini' },
      create: {
        situationId,
        language: language as 'en' | 'sw',
        ...generated,
        reviewStatus: 'AI_GENERATED',
        generatedBy: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      },
    });

    res.json({ success: true, data: explanation });
  } catch (e) { next(e); }
});

// POST /api/explanations/validate
router.post('/validate', async (req, res, next) => {
  try {
    const { explanationId } = req.body as { explanationId?: string };
    if (!explanationId) return res.status(400).json({ success: false, error: 'explanationId is required' });

    const explanation = await prisma.explanation.findUnique({
      where: { id: explanationId },
      include: {
        situation: {
          include: {
            legalSections: { include: { legalSection: true } },
          },
        },
      },
    });
    if (!explanation) return res.status(404).json({ success: false, error: 'Explanation not found' });

    const sections = explanation.situation.legalSections.map((s: { legalSection: any }) => s.legalSection);
    const valid = await validateExplanation(explanation, sections);

    res.json({ success: true, data: { valid, explanationId } });
  } catch (e) { next(e); }
});

export default router;
