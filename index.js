const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const os = require("os-utils");
const yahooFinance = require("yahoo-finance2").default;
const app = express();

const httpServer = createServer(app);
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World! for socket IO");
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
  }, 1000);
});

app.listen(port, (req, res) => {
  console.log("Running the Port", port);
});
