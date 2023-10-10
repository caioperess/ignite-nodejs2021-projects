import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/createSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/listSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRouter.get('/', listSpecificationController.handle);

specificationRouter.use(ensureAuthenticated);
specificationRouter.use(ensureAdmin);
specificationRouter.post('/', createSpecificationController.handle);

export { specificationRouter };
