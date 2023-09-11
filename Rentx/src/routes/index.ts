import { Router } from 'express';

import { categorieRouter } from './categories.routes';
import { specificationRouter } from './specifications.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/categories', categorieRouter);
router.use('/specifications', specificationRouter);
router.use('/users', usersRouter);

export { router };
