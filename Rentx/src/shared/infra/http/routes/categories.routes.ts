import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/createCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/listCategoriesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const categoriesRouter = Router();
const upload = multer(uploadConfig);

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRouter.get('/', listCategoryController.handle);

categoriesRouter.use(ensureAuthenticated);
categoriesRouter.use(ensureAdmin);
categoriesRouter.post('/', createCategoryController.handle);
categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRouter };
