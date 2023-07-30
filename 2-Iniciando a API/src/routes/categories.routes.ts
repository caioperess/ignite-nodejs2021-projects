import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categorieRoutes = Router();
const upload = multer({
  dest: './tmp',
});

categorieRoutes.get('/', (req, res) => {
  return listCategoriesController.handle(req, res);
});

categorieRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categorieRoutes.post('/import', upload.single('file'), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { categorieRoutes };
