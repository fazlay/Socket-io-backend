const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const tradinglive = require('./tradinglive');
// const yahooFinance = require("yahoo-finance2").default;

const app = express();
app.use(cors());

const httpServer = createServer();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World! for socket IO');
});

const io = new Server(httpServer, {
  transports: ['websocket', 'polling'],
});
require('./tradinglive')(io);

httpServer.listen(port, (req, res) => {
  console.log('Running the Port', port);
});

// httpServer.listen(3000);
