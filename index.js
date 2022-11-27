const express = require('express');
const cors = require("cors");
const routerApi = require('./src/routes/index.js');

const { logErrors, boomErrorHandler, errorHandler } = require('./src/middleware/error_handler');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const whiteList = [
  'http://127.0.0.1:8080'
];

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No autorizado"));
    }
  }
}

app.use(cors(options));

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
