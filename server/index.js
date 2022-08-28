import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';

import pollingRouter from "./controllers/polling";
import orderRouter from './controllers/orders';

const app = express();
const server = http.createServer(app);

// const io = socketIO(server, {
//   transports:['polling'],
//   cors:{
//     cors: {
//       origin: "http://localhost:3000"
//     }
//   }
// })

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use('/orders', orderRouter);
app.use('/poll', pollingRouter);

app.get('/', (req, res) => {
  res.send('Realtime api lol');
})

server.listen(5000, () => {
  console.log(`Server up and running on port ${5000}`);
});