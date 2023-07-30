import { Router } from 'express';

import { categorieRoutes } from './categories.routes';
import { specificationRoutes } from './specifications.routes';

const router = Router();

router.use('/categories', categorieRoutes);
router.use('/specifications', specificationRoutes);

export { router };
