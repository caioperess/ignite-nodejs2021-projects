import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/createSpecificationController';
import { ListSpecificationController } from '../modules/cars/useCases/listSpecification/listSpecificationController';

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRouter.get('/', listSpecificationController.handle);

specificationRouter.post('/', createSpecificationController.handle);

export { specificationRouter };
