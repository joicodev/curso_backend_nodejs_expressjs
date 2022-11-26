const express = require('express');
const ProductsService = require('../services/productsService');

const router = express.Router();
const productService = new ProductsService();

router.get('/', (req, res) => {
  const productos = productService.find();
  res.status(201).json(productos)
});

// TODOS LOS ENDPOINT QUE SEAN ESPECÍFICOS DEBEN IR ANTES DE LOS DINÁMICOS
router.get('/filter', (req, res) => {
  res.send('Estoy filtrando...');
});


router.get('/:id', (req, res) => {
  const product = productService.findOne(req.params.id);
  if (product != null) {
    res.json(product)
    return;
  }


  res.status(404).json({
    message: "Not found!"
  })
});


router.post('/', (req, res) => {
  const body = req.body;
  const id = productService.crear(body);
  if (id != null) {
    res.json({
      message: "created",
      data: {id}
    });

    return;
  }

  res.status(406).json({
    message: "Error!"
  })
});

router.put('/:id', (req, res) => {
  const {
    id
  } = req.params;
  const body = req.body;
  res.json({
    message: "updated",
    data: body,
    id
  });
});

router.patch('/:id', (req, res) => {
  const {
    id
  } = req.params;
  const body = req.body;
  res.json({
    message: "updated",
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const {
    id
  } = req.params;
  res.json({
    id,
    message: "deleted",
  });
});

module.exports = router;
