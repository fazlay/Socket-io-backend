const yahooFinance = require('yahoo-finance2').default;

module.exports = function (io) {
  io.on('connection', (client) => {
    let updatedMarketPrice = {};
    setInterval(() => {
      const symbols = [
        '^NSEI',
        'MARUTI.NS',
        'AXISBANK.NS',
        'SBIN.NS',
        'INDUSINDBK.NS',
        'UPL.NS',
      ];

      async function yahoApi() {
        const quote = await yahooFinance.quote(symolsReal);
        quote.map((element) =>
          // console.log(element.symbol, element.regularMarketPrice)

          Object.assign(updatedMarketPrice, {
            [element.symbol.slice(0, -3)]: element.regularMarketPrice,
          })
        );
        console.log(updatedMarketPrice);
        client.emit('symbol', updatedMarketPrice);
      }

      yahoApi();
    }, 1000);
  });
};

// const express = require("express");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const app = express();

// // const yahooFinance = require("yahoo-finance2").default;

// const httpServer = createServer();

// // require("./tradinglive")();

// const design = () => {
//   const io = new Server(httpServer, {
//     transports: ["websocket", "polling"],
//   });

//   io.on("connection", (client) => {
//     console.log("this is mofule");
//     setInterval(() => {
//       const regularMarketPrices = tradinglive.habi();
//       console.log(regularMarketPrices);
//       client.emit("symbol", {
//         name: "BTC-USD",
//         value: regularMarketPrices,
//       });
//     }, 1000);
//   });
// };

// module.exports.design = design;
// // httpServer.listen(3000);

const io = new Server(httpServer, {
  transports: ['websocket', 'polling'],
});

io.on('connection', (client) => {
  setInterval(() => {
    client.emit('symbol', {
      name: 'BTC-USD',
      value: regularMarketPrices,
    });
  }, 1000);
});
