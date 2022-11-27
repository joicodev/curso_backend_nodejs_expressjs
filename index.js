const express = require('express');
const routerApi = require('./src/routes/index.js');

const { logErrors, boomErrorHandler, errorHandler } = require('./src/middleware/error_handler');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) =>{
  res.send('🚀Hello from my server express.js');
});

app.listen(port, () =>{
  console.log(`🌏🚀Server inicialized on port: ${port}`);
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
