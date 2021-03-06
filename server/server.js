'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

let fetchInterval = 5000; // not a constant anymore, rewrited in camelCase
const PORT = process.env.PORT || 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];
let ifNegative;

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  ifNegative = random < 0 ? -1 : 1;
  return random.toFixed(precision);

}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {
  
  const quotes = tickers.map(ticker => ({
    ticker: ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: randomValue(-100, 200, 2), //changed 'min' to negative, to make statistics decline as well
    change_percent: ifNegative*randomValue(0, 1, 2), //combine same sign as 'change' property
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));
  socket.emit('ticker', quotes, fetchInterval);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const timer = setInterval(function () {
    getQuotes(socket);
  }, fetchInterval);

  socket.on('disconnect', function () {
    clearInterval(timer);
  });

  socket.on('change_interval', (interval) => { //change interval by socket emit from client
    fetchInterval = interval * 1000;
    clearInterval(timer); // remove current setInterval and restart trackTickers
    trackTickers(socket);
  })
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


socketServer.on('connection', (socket) => {
  console.log("Connected to Socket!!" + socket.id)
  socket.on('start', () => {
    trackTickers(socket);
  });
});






server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
