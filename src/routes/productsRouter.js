const express = require('express');
const ProductsService = require('../services/productsService');

const router = express.Router();

//* GET all products
router.get('/', getAll);

//* TODOS LOS ENDPOINT QUE SEAN ESPECÍFICOS DEBEN IR ANTES DE LOS DINÁMICOS
router.get('/filter', (req, res) => {
  res.send('Estoy filtrando...');
});

//* GET product by ID
router.get('/:id', getOne);

//! ADD new product
router.post('/', createProduct);

//* UPDATE
router.put('/:id', updateProduct);

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
    const product = ProductsService.findOne(id);
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
