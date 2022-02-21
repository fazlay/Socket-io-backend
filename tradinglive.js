const yahooFinance = require('yahoo-finance2').default;

module.exports = function (io) {
  io.on('connection', (client) => {
    let updatedMarketPrice = [];
    setInterval(() => {
      const symbols = 'BTC-USD';

      async function yahoApi() {
        const quote = await yahooFinance.quote(symbols);

        // updatedMarketPrice.push(quote.regularMarketPrice);

        console.log(quote.updatedMarketPrice);
        client.emit('symbol', quote);
      }

      yahoApi();
    }, 1000);
  });
};
