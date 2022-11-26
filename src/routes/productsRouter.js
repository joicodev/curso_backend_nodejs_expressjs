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
async function getAll(req, res) {
  const products = await ProductsService.getAll();
  res.status(201).json({
    status: true,
    message: "Success",
    data: products
  })
}

async function getOne(req, res) {
  const { id } = req.params;
  const product = ProductsService.findOne(id);
  if (product != null) {
    res.json({
      status: true,
      data: product,
      message: "Success"
    })
  } else {
    res.status(404).json({
      id: id,
      status: false,
      message: "Not found"
    })
  }
}

async function createProduct(req, res) {
  const body = req.body;
  const id = ProductsService.create(body);
  try {
    res.json({
      id: id,
      status: true,
      message: "created",
    });
  } catch (error) {
    res.status(406).json({
      id: id,
      status: false,
      message: `Error: ${error.message}`,
    })
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const body = req.body;
  try {
    ProductsService.update(id, body);
    res.json({
      id: id,
      status: true,
      message: "updated",
    });
  } catch (error) {
    res.status(404).json({
      id: id,
      status: false,
      message: `Error: ${error.message}`,
    });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    ProductsService.delete(id);
    res.json({
      id: id,
      status: true,
      message: "deleted",
    });
  } catch (error) {
    res.status(404).json({
      id: id,
      status: false,
      message: `Error: ${error.message}`,
    });
  }
}

module.exports = router;
