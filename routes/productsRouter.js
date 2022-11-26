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
  const productService = await ProductsService.getInstance();
  const products = await productService.getAll();
  res.status(201).json({
    status: true,
    message: "Success",
    data: products
  })
}

async function getOne(req, res) {
  const productService = await ProductsService.getInstance();
  const { id } = req.params;
  const product = productService.findOne(id);
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
  const productService = await ProductsService.getInstance();
  const body = req.body;
  const id = productService.crear(body);
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
  const productService = await ProductsService.getInstance();
  const { id } = req.params;
  const body = req.body;
  try {
    const response = productService.update(id, body);
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
  const productService = await ProductsService.getInstance();
  try {
    const { id } = req.params;
    const data = productService.delete(id);
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
