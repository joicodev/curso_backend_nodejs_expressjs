const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
  res.send('🚀Hello from my server express.js');
});

// PARAMETROS
app.get('/products/:id', (req, res) => {
  let response = {};
  const { id } = req.params;
  switch (id) {
    case "1":
      response = {
        id : id,
        name: "Lapiz",
        price: 1000
      };
    break;
  }

  res.json(response);
});

// PARAMETROS
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    productId,
    categoryId,
  });
});

// PARAMETROS POR QUERY
app.get('/users', (req, res) => {
  const {limit, offset} = req.query;
  if (limit && offset) {
    res.json({
      limit, offset
    });
  } else {
    res.send('No hay parámetros!');
  }
})

app.listen(port, () =>{
  console.log(`🌏🚀Server inicialized on port: ${port}`);
});
