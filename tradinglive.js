const yahooFinance = require('yahoo-finance2').default;

module.exports = function (io) {
  io.on('connection', (client) => {
    let updatedMarketPrice = [];
    setInterval(() => {
      const symbols = 'BTC-USD';

      async function yahoApi() {
        try {
          const quote = await yahooFinance.quote(symbols);

          if (updatedMarketPrice.length > 40) {
            console.log(updatedMarketPrice.length);
            updatedMarketPrice.shift();
          }
          updatedMarketPrice.push({
            name: new Date().getSeconds(),
            uv: quote.regularMarketPrice,
          });

          console.log(updatedMarketPrice);
          client.emit('symbol', updatedMarketPrice);
        } catch (error) {
          console.log(error.message);
        }
      }

      yahoApi();
    }, 25000);
  });
};
