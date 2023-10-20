import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/createRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createRentalController = new CreateRentalController();

const rentalsRouter = Router();

rentalsRouter.use(ensureAuthenticated);
rentalsRouter.post('/', createRentalController.handle);

export { rentalsRouter };
