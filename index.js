const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
  res.send('Hola mi server en express');
});

app.get('/products', (req, res) =>{
  res.json([
    {
      name: "Lapiz",
      price: 1000
    },
    {
      name: "Borrador",
      price: 2000
    }
  ]);
});

app.get('/products/:id', (req, res) => {
  let response = {};
  const { id } = req.params;
  switch (id) {
    case 1:
      response = {
        name: "Lapiz",
        price: 1000
      };
      break;
  }

  res.json(response);
});

app.listen(port, () =>{
  console.log("My port: " + port);
});
