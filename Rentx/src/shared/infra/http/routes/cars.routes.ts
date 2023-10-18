import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/createCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/uploadCarImagesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadImages = multer(uploadConfig.upload('car_images'));

const carsRouter = Router();

carsRouter.get('/available', listAvailableCarsController.handle);

carsRouter.use(ensureAuthenticated);
carsRouter.post('/', ensureAdmin, createCarController.handle);
carsRouter.post(
  '/specifications/:id',
  ensureAdmin,
  createCarSpecificationController.handle,
);
carsRouter.post(
  '/images/:id',
  ensureAdmin,
  uploadImages.array('images'),
  uploadCarImagesController.handle,
);

export { carsRouter };
