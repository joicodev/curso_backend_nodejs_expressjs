const express = require('express');
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middleware/validator_handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema
} = require('../schemas/productSchema');

const router = express.Router();

//* GET all products
router.get('/', getAll);

//* TODOS LOS ENDPOINT QUE SEAN ESPECÍFICOS DEBEN IR ANTES DE LOS DINÁMICOS
router.get('/filter', (req, res) => {
  res.send('Estoy filtrando...');
});


/*NOTA: Agregamos el middleware "validatorHandler" y le pasamos por parámetro el schema que
  queremos usar y la propiedad del request donde sacará los datos enviados por el cliente*/
//* GET product by ID
router.get('/:id', validatorHandler(getProductSchema, 'params'), getOne);

//! ADD new product
router.post('/', validatorHandler(createProductSchema, 'body'), createProduct);

//* UPDATE
router.put(
  '/:id', 
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  updateProduct
);

//* UPDATE partial product
router.patch('/:id', updateProduct);

//! DELETE product
router.delete('/:id', deleteProduct);

//* Internal Functions
async function getAll(req, res, next) {
  try {
    const products = await ProductsService.getAll();
    res.status(200).json({
      status: true,
      message: "Success",
      data: products
    })
  } catch (error) {
    next(error);
  }
}

async function getOne(req, res, next) {
  const {
    id
  } = req.params;
  try {
    const product = await ProductsService.getById(id);
    res.json({
      status: true,
      data: product,
      message: "Success"
    })
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  const body = req.body;
  const id = ProductsService.create(body);
  try {
    res.json({
      id: id,
      status: true,
      message: "created",
    });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  const {
    id
  } = req.params;
  const body = req.body;
  try {
    ProductsService.update(id, body);
    res.json({
      id: id,
      status: true,
      message: "updated",
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  const {
    id
  } = req.params;
  try {
    ProductsService.delete(id);
    res.json({
      id: id,
      status: true,
      message: "deleted",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = router;
