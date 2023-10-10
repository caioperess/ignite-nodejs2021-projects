import { Router } from 'express';

import { authenticateRouter } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categorieRouter } from './categories.routes';
import { specificationRouter } from './specifications.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/categories', categorieRouter);
router.use('/cars', carsRouter);
router.use('/specifications', specificationRouter);
router.use('/users', usersRouter);
router.use('/sessions', authenticateRouter);

export { router };
