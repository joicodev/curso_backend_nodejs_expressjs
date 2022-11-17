import express from 'express';
import routerApi from './routes/index.js';

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