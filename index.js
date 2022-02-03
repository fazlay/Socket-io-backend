const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const os = require("os-utils");
const yahooFinance = require("yahoo-finance2").default;

const app = express();
const port = process.env.PORT || 5001;
const httpServer = createServer(app);

app.listen(port, (req, res) => {
  console.log("Running the Port", port);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const io = new Server(httpServer, {
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  setInterval(() => {
    async function yahoApi() {
      const quote = await yahooFinance.quote("BTC-USD");
      const { regularMarketPrice } = quote;

      socket.emit("symbol", {
        name: "BTC-USD",
        value: regularMarketPrice,
      });

      console.log(regularMarketPrice);
    }
    yahoApi();

    // os.cpuUsage(function (cpuPercentage) {
    //   const d = new Date();
    //   let seconds = d.getSeconds();

    // });
  }, 1000);
});

httpServer.listen(3000);
console.log(port);
