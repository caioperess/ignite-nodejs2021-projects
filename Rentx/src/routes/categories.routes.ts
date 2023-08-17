import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/listCategoriesController';

const categorieRoutes = Router();
const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categorieRoutes.get('/', listCategoryController.handle);

categorieRoutes.post('/', createCategoryController.handle);

categorieRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categorieRoutes };
