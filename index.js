//const faker = require('@faker-js/faker');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
  res.send('🚀Hello from my server express.js');
});

app.listen(port, () =>{
  console.log(`🌏🚀Server inicialized on port: ${port}`);
});
