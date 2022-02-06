const symbols = [
  '^NSEI',
  'MARUTI.NS',
  'AXISBANK.NS',
  'SBIN.NS',
  'INDUSINDBK.NS',
  'UPL.NS',
];
async function yahoApi() {
  const quote = await yahooFinance.quote(symbols);
  quote.map((element) =>
    // console.log(element.symbol, element.regularMarketPrice)

    Object.assign(updatedMarketPrice, {
      [element.symbol.slice(0, -3)]: element.regularMarketPrice,
    })
  );
  console.log(updatedMarketPrice);
}

yahoApi();

[
  'NIFTY 50',
  'MARUTI',
  'AXISBANK',
  'SBIN',
  'INDUSINDBK',
  'UPL',
  'COALINDIA',
  'BHARTIARTL',
  'TATACONSUM',
  'BPCL',
  'HEROMOTOCO',
  'TATAMOTORS',
  'POWERGRID',
  'BAJAJ-AUTO',
  'GRASIM',
  'KOTAKBANK',
  'NTPC',
  'HINDUNILVR',
  'HINDALCO',
  'ADANIPORTS',
  'JSWSTEEL',
  'DRREDDY',
  'EICHERMOT',
  'CIPLA',
  'ITC',
  'LT',
  'IOC',
  'SUNPHARMA',
  'BRITANNIA',
  'SHREECEM',
  'TATASTEEL',
  'SBILIFE',
  'NESTLEIND',
  'HDFCLIFE',
  'ICICIBANK',
  'BAJFINANCE',
  'HDFCBANK',
  'DIVISLAB',
  'HCLTECH',
  'ASIANPAINT',
  'TCS',
  'M&M',
  'HDFC',
  'RELIANCE',
  'ONGC',
  'INFY',
  'TECHM',
  'ULTRACEMCO',
  'TITAN',
  'BAJAJFINSV',
  'WIPRO',
];
