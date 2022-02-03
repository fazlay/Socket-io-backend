const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const os = require("os-utils");
const yahooFinance = require("yahoo-finance2").default;

const app = express();
app.use(cors());

const httpServer = createServer();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World! for socket IO");
});

const io = new Server(httpServer, {
  transports: ["websocket", "polling"],
});

io.on("connection", (client) => {
  setInterval(() => {
    async function yahoApi() {
      const quote = await yahooFinance.quote("BTC-USD");
      const { regularMarketPrice } = quote;
      console.log(regularMarketPrice);
      client.emit("symbol", {
        name: "BTC-USD",
        value: regularMarketPrice,
      });
    }
    yahoApi();
  }, 1000);
});

// io.on("connection", (socket) => {
//   setInterval(() => {
//     os.cpuUsage((cpuPercent) => {
//       console.log(cpuPercent);
//       socket.emit("cpu", cpuPercent);
//     });
//     // async function yahoApi() {
//     //   const quote = await yahooFinance.quote("BTC-USD");
//     //   const { regularMarketPrice } = quote;
//     //   console.log(regularMarketPrice);
//     //   socket.emit("symbol", {
//     //     name: "BTC-USD",
//     //     value: regularMarketPrice,
//     //   });
//     // }
//     // yahoApi();
//   }, 1000);
// });

httpServer.listen(port, (req, res) => {
  console.log("Running the Port", port);
});

// httpServer.listen(3000);
