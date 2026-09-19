import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import categoriesRouter from './routes/categories';
import situationsRouter from './routes/situations';
import searchRouter from './routes/search';
import legalSourcesRouter from './routes/legalSources';
import explanationsRouter from './routes/explanations';
import resourcesRouter from './routes/resources';
import savedRouter from './routes/saved';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/api/categories', categoriesRouter);
app.use('/api/situations', situationsRouter);
app.use('/api/search', searchRouter);
app.use('/api/legal-sources', legalSourcesRouter);
app.use('/api/explanations', explanationsRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/saved', savedRouter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 Msingi API running on port ${PORT}`));

export default app;
