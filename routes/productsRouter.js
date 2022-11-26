const express = require('express');
const ProductsService = require('../services/productsService');

const router = express.Router();
const productService = new ProductsService();

// GETTING ALL
router.get('/', (req, res) => {
  const products = productService.getAll();
  res.status(201).json({
    status: true,
    data: products,
    message: "Success"
  })
});

// TODOS LOS ENDPOINT QUE SEAN ESPECÍFICOS DEBEN IR ANTES DE LOS DINÁMICOS
router.get('/filter', (req, res) => {
  res.send('Estoy filtrando...');
});

// GETTING BY ID
router.get('/:id', (req, res) => {
  const product = productService.findOne(req.params.id);
  if (product != null) {
    res.json({
      status: true,
      data: product,
      message: "Success"
    })
  } else {
    res.status(404).json({
      status: false,
      id: req.params.id,
      message: "Not found"
    })
  }
});


router.post('/', (req, res) => {
  const body = req.body;
  const id = productService.crear(body);
  try {
    res.json({
      id: id
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
});


router.put('/:id', (req, res) => {
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
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const data = productService.update(id, body);
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
});

router.delete('/:id', (req, res) => {
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
});

module.exports = router;
