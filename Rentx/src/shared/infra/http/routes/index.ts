import { Router } from 'express';

import { authenticateRouter } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { rentalsRouter } from './rentals.routes';
import { specificationRouter } from './specifications.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/cars', carsRouter);
router.use('/specifications', specificationRouter);
router.use('/users', usersRouter);
router.use('/sessions', authenticateRouter);
router.use('/rentals', rentalsRouter);

export { router };
