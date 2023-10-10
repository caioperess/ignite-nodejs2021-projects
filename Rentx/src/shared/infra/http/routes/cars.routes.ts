import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

const carsRouter = Router();

carsRouter.get('/available', listAvailableCarsController.handle);

carsRouter.use(ensureAuthenticated);
carsRouter.post('/', ensureAdmin, createCarController.handle);

export { carsRouter };
