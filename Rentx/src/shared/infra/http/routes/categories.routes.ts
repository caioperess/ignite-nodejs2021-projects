import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/createCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/listCategoriesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categorieRouter = Router();
const upload = multer(uploadConfig.upload(''));

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categorieRouter.get('/', listCategoryController.handle);

categorieRouter.use(ensureAuthenticated);
categorieRouter.use(ensureAdmin);
categorieRouter.post('/', createCategoryController.handle);
categorieRouter.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categorieRouter };
