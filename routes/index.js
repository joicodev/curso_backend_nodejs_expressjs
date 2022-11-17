import express from 'express';

import productsRouter from './productsRouter.js';
import usersRouter from './usersRouter.js';
import categoriesRouter from './categoriesRouter.js';

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

export default routerApi;