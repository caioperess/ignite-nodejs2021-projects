import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';
import { listSpecificationController } from '../modules/cars/useCases/listSpecification';

const specificationRoutes = Router();

specificationRoutes.get('/', (req, res) => {
  return listSpecificationController.handle(req, res);
});

specificationRoutes.post('/', (req, res) => {
  return createSpecificationController.handle(req, res);
});

export { specificationRoutes };
