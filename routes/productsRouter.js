import { faker } from '@faker-js/faker';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const productos = [];
  const { size } = req.query;
  const limit = size || 100;
  for (let index = 0; index < limit; index++) {
    const commerce = faker.commerce;
    productos.push({
      id: index + 1,
      name: commerce.productName(),
      price: parseInt(commerce.price(100), 10),
      description: commerce.productDescription(),
      image: faker.image.image()
    });
  }

  res.json(productos)
});

// TODOS LOS ENDPOINT QUE SEAN ESPECÍFICOS DEBEN IR ANTES DE LOS DINÁMICOS
router.get('/filter', (req, res) => {
  res.send('Estoy filtrando...');
});

router.get('/:id', (req, res) => {
  res.json({
    id: req.params.id,
    name: "Pizza",
    price: 2500
  })
});


router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: "created",
    data: body
  });
});

export default router;