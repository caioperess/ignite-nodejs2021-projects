import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/createRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/devolutionRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ListRentalsByUserController } from './../../../../modules/rentals/useCases/listRentalsByUser/listRentalsByUserController';

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

const rentalsRouter = Router();

rentalsRouter.use(ensureAuthenticated);
rentalsRouter.post('/', createRentalController.handle);
rentalsRouter.post('/devolution/:id', devolutionRentalController.handle);
rentalsRouter.get('/user', listRentalsByUserController.handle);

export { rentalsRouter };
